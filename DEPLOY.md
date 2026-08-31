# راهنمای دیپلوی روی سرور مجازی ایرانی (VPS)

این فایل چک‌لیست کامل دیپلویه — وقتی سرور رو گرفتی، از بالا به پایین دنبالش کن.

## ۱. آماده‌سازی سرور (یک‌بار)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git

# نصب Node.js (نسخه ۲۰ یا بالاتر)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# نصب MongoDB روی خود سرور (به‌جای Atlas)
# (دستور نصب دقیق بسته به توزیع لینوکس سرورت فرق می‌کنه؛
#  مستندات رسمی MongoDB رو برای توزیع خودت چک کن)

# نصب PM2 برای نگه‌داری زنده‌ی پروسه
sudo npm install -g pm2
```

⚠️ **نکته‌ی امنیتی مهم:** بعد از نصب MongoDB، مطمئن شو فقط روی
`127.0.0.1` (localhost) گوش می‌ده، نه روی IP عمومی سرور — یعنی
`bindIp` توی فایل `/etc/mongod.conf` باید `127.0.0.1` باشه. در غیر
این صورت هرکسی از اینترنت می‌تونه مستقیم به دیتابیست وصل بشه.

## ۲. آپلود کد

کد رو (همین پوشه) روی سرور بذار — یا با `git clone` (اگه ریپازیتوری
گیت داری) یا با `scp`/`rsync`.

## ۳. تنظیم بک‌اند

```bash
cd server
npm install
cp .env.example .env
nano .env   # همه مقادیر واقعی رو پر کن (پایین توضیح داده شده)
```

مقادیر مهم توی `.env`:
- `MONGO_URI=mongodb://127.0.0.1:27017/farhidwood`
- `CLIENT_URL=https://yourdomain.com,https://www.yourdomain.com`
- `NODE_ENV=development` (فعلاً development بذار، تا مرحله ۶)
- `SHOW_OTP_IN_CONSOLE=true` (فعلاً، برای تست اولیه)
- `JWT_SECRET=` یه مقدار تصادفی جدید بساز:
  `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

بعد، خودت رو به‌عنوان ادمین اضافه کن:
```bash
npm run admin add 09xxxxxxxxx
```

سرور رو با PM2 بالا بیار:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # دستوری که نشون می‌ده رو اجرا کن تا بعد از ریبوت هم بالا بیاد
```

## ۴. ساخت فرانت‌اند

```bash
cd ..
npm install
cp .env.example .env
nano .env   # VITE_API_URL=https://yourdomain.com/api
npm run build
```

خروجی توی پوشه‌ی `dist` ساخته می‌شه.

## ۵. تنظیم Nginx

فایل `nginx.conf.example` (توی همین پوشه) رو ببین — توش دقیق توضیح
دادم چیکار کنی. خلاصه: کپی به `/etc/nginx/sites-available/`، دامنه و
مسیر `dist` رو با مقادیر واقعی جایگزین کن، فعالش کن.

## ۶. فعال کردن HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**فقط بعد از اینکه HTTPS با موفقیت فعال شد**، برو `server/.env` و:
- `NODE_ENV=production` کن
- `SHOW_OTP_IN_CONSOLE=false` کن (دیگه لازم نیست، پیامک واقعی جایگزینش می‌شه)
- `pm2 restart farhidwood-api`

⚠️ اگه `NODE_ENV=production` رو قبل از فعال شدن HTTPS بذاری، کوکی
لاگین ادمین اصلاً ذخیره نمی‌شه (چون `secure: true` نیاز به HTTPS داره)
و پنل ادمین همیشه توی صفحه‌ی لاگین گیر می‌کنه.

## ۷. تست نهایی

- سایت رو با دامنه واقعی باز کن، همه صفحات رو چک کن
- وارد `/admin` بشو، لاگین با OTP رو تست کن
- ساخت/ویرایش/حذف پروژه رو تست کن
- فرم تماس رو تست کن، هم توی پنل هم توی ایتا پیام رو ببین

## ۸. پشتیبان‌گیری (بعداً باهم راه‌اندازی می‌کنیم)

یک اسکریپت cron ساده برای `mongodump` روزانه + فشرده‌سازی پوشه‌ی
`uploads` — این بخش رو وقتی سرور آماده شد و مراحل بالا جواب داد،
باهم می‌سازیم.
