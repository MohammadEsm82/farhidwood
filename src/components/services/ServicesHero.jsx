import { ArrowDown } from "lucide-react";

export default function ServicesHero() {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative  flex min-h-[90vh] items-center overflow-hidden bg-secondary">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=2200&auto=format&fit=crop&q=80"
        alt="طراحی و اجرای دکوراسیون داخلی"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Golden Glow */}
      <div className="absolute left-10 top-24 h-[450px] w-[450px] rounded-full bg-primary/20 blur-[170px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 py-32">
        <div className="max-w-3xl">
          <span className="text-sm uppercase tracking-[6px] text-primary">
            SERVICES
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            خدمات تخصصی
            <br />
            <span className="text-primary">طراحی و اجرا</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            از طراحی تا اجرای کامل پروژه، در تمام مراحل کنار شما هستیم تا
            فضایی لوکس، کاربردی و ماندگار خلق کنیم.
          </p>

          <button
            type="button"
            onClick={scrollToServices}
            className="
              group
              mt-10
              inline-flex
              items-center
              gap-4
              rounded-full
              border-2
              border-primary
              px-8
              py-4
              text-white
              transition-all
              duration-500
              hover:bg-primary
              hover:text-black
            "
          >
            مشاهده خدمات

            <ArrowDown
              size={20}
              className="transition-transform duration-500 group-hover:translate-y-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
