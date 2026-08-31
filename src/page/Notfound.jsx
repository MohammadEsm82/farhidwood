import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="not-found">
      <h1>۴۰۴</h1>
      <h2>صفحه‌ای که دنبالش هستی پیدا نشد!</h2>
      <p>شاید آدرس رو اشتباه وارد کردی یا صفحه حذف شده.</p>
      <Link to="/">برگشت به صفحه اصلی</Link>
    </div>
  );
}