import { ArrowDown } from "lucide-react";

export default function PortfolioHero() {

  const scrollToPortfolio = () => {
  document.getElementById("portfolio")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <section className="relative h-screen overflow-hidden mb-32">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=2200&auto=format&fit=crop&q=80"
        alt="Portfolio Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Golden Glow */}
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[180px]" />
      <div className="absolute -right-32 bottom-0 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[180px]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div>
          <span className="tracking-[6px] uppercase text-primary">
            OUR PORTFOLIO
          </span>

          <h1 className="mt-6 max-w-4xl text-6xl font-black leading-tight text-white lg:text-8xl">
            پروژه‌هایی که
            <br />
            کیفیت ما را
            <br />
            روایت می‌کنند.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-white/70">
            مجموعه‌ای از پروژه‌های اجرا شده در زمینه طراحی داخلی، کابینت،
            درب‌های سفارشی، MDF، چوب طبیعی و اجرای کامل دکوراسیون.
          </p>

          <button onClick={scrollToPortfolio} className="group mt-12 flex items-center gap-4 rounded-full border border-primary px-8 py-4 text-white duration-500 hover:bg-primary">
            مشاهده پروژه‌ها

            <ArrowDown className="duration-500 group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        Scroll
      </div>
    </section>
  );
}