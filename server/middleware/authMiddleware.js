const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  try {
    const token =
      req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "دسترسی غیرمجاز. ابتدا وارد حساب مدیریت شوید.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      !decoded ||
      decoded.role !== "admin" ||
      !decoded.id
    ) {
      return res.status(401).json({
        success: false,
        message: "نشست مدیریت معتبر نیست.",
      });
    }

    req.admin = {
      id: decoded.id,
      phone: decoded.phone,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error(
      "AUTH MIDDLEWARE ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message:
        "نشست مدیریت منقضی یا نامعتبر است.",
    });
  }
};

module.exports = protectAdmin;