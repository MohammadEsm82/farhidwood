// =====================================================
// تنظیمات PM2 — برای زنده نگه‌داشتن سرور روی VPS
// =====================================================
//
// نصب PM2 (یک‌بار، روی سرور):
//   npm install -g pm2
//
// اجرا:
//   cd server
//   pm2 start ecosystem.config.js
//
// همیشه فعال ماندن بعد از ریبوت سرور:
//   pm2 startup
//   pm2 save
//
// دستورات مفید:
//   pm2 status              -> وضعیت فعلی
//   pm2 logs farhidwood-api -> مشاهده لاگ‌های زنده
//   pm2 restart farhidwood-api
//   pm2 stop farhidwood-api

module.exports = {
  apps: [
    {
      name: "farhidwood-api",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
