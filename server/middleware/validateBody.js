// =====================================================
// Validation Middleware (با Zod)
// =====================================================
// یک اسکیمای Zod می‌گیرد و قبل از رسیدن درخواست به
// کنترلر، فیلدهای req.body را چک می‌کند. اگر نامعتبر
// بود، با پیام فارسی واضح خطا برمی‌گرداند.

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError =
        result.error.issues[0];

      return res.status(400).json({
        success: false,
        message:
          firstError?.message ||
          "اطلاعات ارسالی نامعتبر است.",
      });
    }

    // مقادیر پاک‌سازی‌شده (trim شده و...) را جایگزین می‌کنیم
    req.body = result.data;
    next();
  };
};

module.exports = validateBody;
