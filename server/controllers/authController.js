const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const Otp = require("../models/Otp");
const { sendOtpSms } = require("../services/smsService");

// =====================================================
// HELPERS
// =====================================================

const normalizePhone = (phone) => {
  if (!phone) return "";

  let value = phone
    .toString()
    .trim()
    .replace(/\s/g, "")
    .replace(/-/g, "");

  if (value.startsWith("+98")) {
    value = "0" + value.slice(3);
  }

  if (value.startsWith("98")) {
    value = "0" + value.slice(2);
  }

  if (value.startsWith("9")) {
    value = "0" + value;
  }

  return value;
};

const generateOtp = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

const createToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id.toString(),
      phone: admin.phone,
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "12h",
    }
  );
};

const cookieOptions = {
  httpOnly: true,
  secure:
    process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  // بدون maxAge = کوکی نشست (Session Cookie) است:
  // با بسته شدن مرورگر پاک می‌شود و دفعه بعد
  // دوباره باید شماره و کد OTP وارد شود.
};

// =====================================================
// SEND OTP
// POST /api/auth/send-otp
// =====================================================

const sendOtp = async (req, res) => {
  try {
    console.log("📍 sendOtp CALLED, phone:", req.body.phone);
    console.log("📍 sendOtp CALLED, phone:", req.body.phone); 
    const phone = normalizePhone(
      req.body.phone
    );

    if (!/^09\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "شماره موبایل معتبر وارد کنید.",
      });
    }

    // به‌جای یک شماره ثابت در .env، لیست ادمین‌ها از دیتابیس خوانده می‌شود
    const admin = await Admin.findOne({
      phone,
    });

    if (!admin) {
      return res.status(403).json({
        success: false,
        message:
          "این شماره اجازه ورود به پنل مدیریت را ندارد.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "حساب مدیریت غیرفعال است.",
      });
    }

    const recentOtp =
      await Otp.findOne({
        phone,
        used: false,
      }).sort({
        createdAt: -1,
      });

    if (recentOtp?.lastSentAt) {
      const seconds =
        (Date.now() -
          recentOtp.lastSentAt.getTime()) /
        1000;

      if (seconds < 60) {
        const remaining = Math.ceil(
          60 - seconds
        );

        return res.status(429).json({
          success: false,
          message: `لطفاً ${remaining} ثانیه دیگر دوباره درخواست دهید.`,
          retryAfter: remaining,
        });
      }
    }

    await Otp.deleteMany({
      phone,
      used: false,
    });

    const code = generateOtp();

    const codeHash =
      await bcrypt.hash(code, 10);

    await Otp.create({
      phone,
      codeHash,
      expiresAt: new Date(
        Date.now() + 2 * 60 * 1000
      ),
      attempts: 0,
      used: false,
      lastSentAt: new Date(),
    });

    await sendOtpSms(
      phone,
      code
    );

    return res.status(200).json({
      success: true,
      message:
        "کد ورود ارسال شد.",
      expiresIn: 120,
    });
  } catch (error) {
    console.error(
      "SEND OTP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "ارسال کد ورود با خطا مواجه شد.",
    });
  }
};

// =====================================================
// VERIFY OTP
// POST /api/auth/verify-otp
// =====================================================

const verifyOtp = async (req, res) => {
  try {
    const phone = normalizePhone(
      req.body.phone
    );

    const code =
      req.body.code
        ?.toString()
        .trim();

    if (
      !/^09\d{9}$/.test(phone) ||
      !/^\d{6}$/.test(code || "")
    ) {
      return res.status(400).json({
        success: false,
        message:
          "شماره موبایل و کد ورود معتبر الزامی هستند.",
      });
    }

    const admin = await Admin.findOne({
      phone,
    });

    if (!admin || !admin.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "دسترسی غیرمجاز.",
      });
    }

    const otp =
      await Otp.findOne({
        phone,
        used: false,
      }).sort({
        createdAt: -1,
      });

    if (!otp) {
      return res.status(400).json({
        success: false,
        message:
          "کد ورود پیدا نشد یا منقضی شده است.",
      });
    }

    if (
      otp.expiresAt.getTime() <
      Date.now()
    ) {
      otp.used = true;
      await otp.save();

      return res.status(400).json({
        success: false,
        message:
          "کد ورود منقضی شده است.",
      });
    }

    if (otp.attempts >= 5) {
      otp.used = true;
      await otp.save();

      return res.status(429).json({
        success: false,
        message:
          "تعداد تلاش‌های مجاز تمام شده است. لطفاً کد جدید دریافت کنید.",
      });
    }

    const isValid =
      await bcrypt.compare(
        code,
        otp.codeHash
      );

    if (!isValid) {
      otp.attempts += 1;
      await otp.save();

      return res.status(400).json({
        success: false,
        message:
          "کد ورود اشتباه است.",
        remainingAttempts:
          5 - otp.attempts,
      });
    }

    otp.used = true;
    await otp.save();

    admin.lastLoginAt =
      new Date();

    await admin.save();

    const token =
      createToken(admin);

    res.cookie(
      "adminToken",
      token,
      cookieOptions
    );

    return res.status(200).json({
      success: true,
      message:
        "ورود با موفقیت انجام شد.",
      admin: {
        id: admin._id,
        phone: admin.phone,
        role: "admin",
      },
    });
  } catch (error) {
    console.error(
      "VERIFY OTP ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "تأیید کد ورود با خطا مواجه شد.",
    });
  }
};

// =====================================================
// ME
// GET /api/auth/me
// =====================================================

const getMe = async (
  req,
  res
) => {
  try {
    const admin =
      await Admin.findById(
        req.admin.id
      ).select("-__v");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message:
          "ادمین پیدا نشد.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "حساب مدیریت غیرفعال است.",
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        phone: admin.phone,
        role: "admin",
        isActive:
          admin.isActive,
        lastLoginAt:
          admin.lastLoginAt,
      },
    });
  } catch (error) {
    console.error(
      "GET ME ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "دریافت اطلاعات ادمین انجام نشد.",
    });
  }
};

// =====================================================
// LOGOUT
// POST /api/auth/logout
// =====================================================

const logout = async (
  req,
  res
) => {
  res.clearCookie(
    "adminToken",
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",
    }
  );

  return res.status(200).json({
    success: true,
    message:
      "با موفقیت خارج شدید.",
  });
};

module.exports = {
  sendOtp,
  verifyOtp,
  getMe,
  logout,
};