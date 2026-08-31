// =====================================================
// اطلاع‌رسانی پیام جدید از طریق ایتا (EitaaYar Bot API)
// =====================================================
//
// راه‌اندازی (یک‌بار):
// 1. به ربات @sender در ایتا پیام بده و از سایت eitaayar.ir
//    یک "برنامه" (bot) بساز و توکنش رو بگیر.
// 2. با اکانت ایتای خودت پیام "شروع" (/start) رو به ربات
//    ساخته‌شده بفرست تا اجازه‌ی دریافت پیام صادر بشه.
// 3. عدد chat_id خودت رو از پنل eitaayar.ir بردار.
// 4. این دو مقدار رو توی server/.env بذار:
//      EITAA_BOT_TOKEN=...
//      EITAA_CHAT_ID=...
//
// اگر این دو مقدار ست نشده باشن، این تابع بی‌سروصدا کاری
// نمی‌کنه (سایت خراب نمی‌شه، فقط اعلان ارسال نمی‌شه).

const sendEitaaNotification = async (text) => {
  const token = process.env.EITAA_BOT_TOKEN;
  const chatId = process.env.EITAA_CHAT_ID;

  if (!token || !chatId) {
    console.log(
      "ℹ️ EITAA_BOT_TOKEN یا EITAA_CHAT_ID تنظیم نشده — اعلان ایتا ارسال نشد."
    );
    return { success: false, skipped: true };
  }

  try {
    const response = await fetch(
      `https://eitaayar.ir/api/${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data?.ok === false) {
      console.error(
        "EITAA NOTIFICATION ERROR:",
        data
      );
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    // خطای ارسال اعلان هیچ‌وقت نباید کل درخواست کاربر
    // (مثلاً ثبت پیام تماس) را با شکست مواجه کند
    console.error(
      "EITAA NOTIFICATION ERROR:",
      error.message
    );
    return { success: false };
  }
};

module.exports = {
  sendEitaaNotification,
};
