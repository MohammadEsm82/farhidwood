const sendOtpSms = async (phone, code) => {
  console.log("📍 sendOtpSms CALLED, SHOW_OTP_IN_CONSOLE =", JSON.stringify(process.env.SHOW_OTP_IN_CONSOLE));
  console.log("📍 sendOtpSms CALLED, SHOW_OTP_IN_CONSOLE =", JSON.stringify(process.env.SHOW_OTP_IN_CONSOLE));   // ← این خط جدیده

  /*
  /*
   * تا زمانی که Template SMS.ir تأیید نشده،
   * می‌تونی با SHOW_OTP_IN_CONSOLE=true توی .env
   * کد OTP رو مستقیم توی ترمینال ببینی.
   *
   * توجه: عمداً به NODE_ENV وابسته نیست — چون NODE_ENV
   * می‌تونه از قبل توسط سیستم/ترمینال ست شده باشه و
   * مقدار .env رو نادیده بگیره. این پرچم صریح و مستقله.
   */

  if (process.env.SHOW_OTP_IN_CONSOLE === "true") {
    console.log("=================================");
    console.log("📱 OTP DEVELOPMENT MODE");
    console.log("Phone:", phone);
    console.log("OTP:", code);
    console.log("=================================");
  }

  /*
   * بعد از تأیید Template در SMS.ir،
   * ارسال واقعی را اینجا فعال می‌کنیم.
   */

  return {
    success: true,
    development: true,
  };
};

module.exports = {
  sendOtpSms,
};