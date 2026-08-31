import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-secondary py-32">

      <div
        className="
        relative
        mx-auto
        max-w-7xl
        overflow-hidden
        rounded-[40px]
        border
        border-primary/20
        bg-gradient-to-br
        from-[#191919]
        via-[#121212]
        to-[#0d0d0d]
        px-10
        py-24
        lg:px-24
        "
      >

        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-primary/20 blur-[150px]" />

        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-[150px]" />

        <div className="relative z-10 text-center">

          <span className="tracking-[6px] uppercase text-primary">

            Contact Us

          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">

            آماده اجرای پروژه شما هستیم

          </h2>

          <p className="mx-auto mt-8 max-w-3xl leading-9 text-white/60">

            اگر برای طراحی، ساخت یا اجرای پروژه خود به دنبال یک تیم
            حرفه‌ای هستید، همین امروز با ما تماس بگیرید تا مشاوره رایگان
            دریافت کنید.

          </p>

          <Link
            to="/contact"
            className="
            mt-12
            inline-flex
            items-center
            gap-4
            rounded-full
            bg-primary
            px-10
            py-5
            text-lg
            font-bold
            text-black
            duration-300
            hover:scale-105
            "
          >

            شروع همکاری

            <ArrowUpRight size={22} />

          </Link>

        </div>

      </div>

    </section>
  );
}