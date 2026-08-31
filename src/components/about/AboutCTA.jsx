import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-secondary py-36">

      {/* Golden Glow */}

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        <div
          className="
          rounded-[40px]
          border
          border-white/10
          bg-white/[0.03]
          p-14
          text-center
          backdrop-blur-xl
          "
        >

          <span className="tracking-[5px] uppercase text-primary">
            START YOUR PROJECT
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">

            آماده اجرای پروژه شما هستیم

          </h2>

          <p className="mx-auto mt-8 max-w-3xl leading-9 text-white/60">

            اگر برای منزل، ویلا، دفتر کار  خود به دنبال
            طراحی و اجرای حرفه‌ای هستید،
            همین امروز با ما تماس بگیرید.

          </p>

          <div className="mt-14 flex flex-wrap justify-center gap-6">

            <Link
              to="/contact"
              className="
              flex
              items-center
              gap-4
              rounded-full
              bg-primary
              px-10
              py-5
              font-semibold
              text-black
              duration-500
              hover:scale-105
              "
            >

              شروع پروژه

              <ArrowUpRight />

            </Link>

            <Link
              to="/portfolio"
              className="
              rounded-full
              border
              border-white/20
              px-10
              py-5
              text-white
              duration-500
              hover:border-primary
              hover:bg-primary
              hover:text-black
              "
            >

              مشاهده پروژه‌ها

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}