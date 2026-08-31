// =====================================================
// مدیریت ادمین‌ها از خط فرمان
// =====================================================
// این اسکریپت مستقیم روی سرورت (یا لوکال) اجرا می‌شود و
// نیازی به هیچ رابط کاربری یا API عمومی ندارد — امن‌تر از
// اینکه یک آدرس API برای «اضافه کردن ادمین» باز بگذاریم.
//
// استفاده:
//   node manageAdmins.js list
//   node manageAdmins.js add 09121234567
//   node manageAdmins.js deactivate 09121234567
//   node manageAdmins.js activate 09121234567

require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

const normalizePhone = (phone) => {
  if (!phone) return "";

  return phone
    .toString()
    .trim()
    .replace(/^\+98/, "0")
    .replace(/^0098/, "0")
    .replace(/^98/, "0");
};

const run = async () => {
  const [, , command, rawPhone] = process.argv;

  if (!command) {
    console.log(
      "استفاده: node manageAdmins.js [list|add|activate|deactivate] [شماره]"
    );
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  if (command === "list") {
    const admins = await Admin.find().sort({
      createdAt: 1,
    });

    if (admins.length === 0) {
      console.log("هیچ ادمینی ثبت نشده است.");
    } else {
      console.log("لیست ادمین‌ها:");
      admins.forEach((admin) => {
        console.log(
          `- ${admin.phone}  |  ${
            admin.isActive ? "فعال ✅" : "غیرفعال ❌"
          }  |  آخرین ورود: ${
            admin.lastLoginAt
              ? admin.lastLoginAt.toLocaleString("fa-IR")
              : "هنوز وارد نشده"
          }`
        );
      });
    }

    await mongoose.disconnect();
    process.exit(0);
  }

  const phone = normalizePhone(rawPhone);

  if (!/^09\d{9}$/.test(phone)) {
    console.log(
      "❌ شماره موبایل معتبر نیست. فرمت صحیح: 09121234567"
    );
    await mongoose.disconnect();
    process.exit(1);
  }

  if (command === "add") {
    const existing = await Admin.findOne({ phone });

    if (existing) {
      console.log(
        "⚠️ این شماره از قبل به‌عنوان ادمین ثبت شده است."
      );
    } else {
      await Admin.create({ phone, isActive: true });
      console.log(
        `✅ ${phone} با موفقیت به‌عنوان ادمین اضافه شد.`
      );
    }
  } else if (command === "deactivate") {
    const admin = await Admin.findOneAndUpdate(
      { phone },
      { isActive: false }
    );

    console.log(
      admin
        ? `✅ دسترسی ${phone} غیرفعال شد.`
        : "❌ این شماره پیدا نشد."
    );
  } else if (command === "activate") {
    const admin = await Admin.findOneAndUpdate(
      { phone },
      { isActive: true }
    );

    console.log(
      admin
        ? `✅ دسترسی ${phone} فعال شد.`
        : "❌ این شماره پیدا نشد."
    );
  } else {
    console.log(
      "دستور نامعتبر. از list, add, activate یا deactivate استفاده کن."
    );
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((error) => {
  console.error("خطا:", error.message);
  process.exit(1);
});
