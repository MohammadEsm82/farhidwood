// =====================================================
// Rate Limiter ساده (بدون نیاز به پکیج جدید)
// جلوگیری از اسپم/سواستفاده از مسیرهای عمومی مثل فرم تماس
// =====================================================

const hits = new Map();

// هر چند وقت یک‌بار رکوردهای قدیمی را پاک می‌کنیم تا حافظه پر نشود
setInterval(() => {
  const now = Date.now();

  for (const [key, entry] of hits.entries()) {
    if (now - entry.windowStart > 60 * 60 * 1000) {
      hits.delete(key);
    }
  }
}, 15 * 60 * 1000).unref();

/**
 * @param {number} max - حداکثر تعداد درخواست مجاز در بازه زمانی
 * @param {number} windowMs - بازه زمانی به میلی‌ثانیه
 */
const rateLimit = (max, windowMs) => {
  return (req, res, next) => {
    const key = `${req.ip}:${req.baseUrl}${req.path}`;
    const now = Date.now();

    const entry = hits.get(key);

    if (!entry || now - entry.windowStart > windowMs) {
      hits.set(key, { count: 1, windowStart: now });
      return next();
    }

    if (entry.count >= max) {
      const retryAfter = Math.ceil(
        (windowMs - (now - entry.windowStart)) / 1000
      );

      res.setHeader("Retry-After", retryAfter);

      return res.status(429).json({
        success: false,
        message:
          "تعداد درخواست‌های شما بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.",
        retryAfter,
      });
    }

    entry.count += 1;
    return next();
  };
};

module.exports = rateLimit;
