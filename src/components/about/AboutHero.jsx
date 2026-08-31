import { ArrowDown } from "lucide-react";

export default function AboutHero() {

   const scrollToourstory = () => {
  document.getElementById("ourstory")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}

      <img
        src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=2000&auto=format&fit=crop&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/70" />

      {/* Golden Blur */}

      <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[170px]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">

        <div>

          <span className="tracking-[5px] uppercase text-primary">

            ABOUT US

          </span>

          <h1 className="mt-6 text-7xl font-black leading-tight text-white">

            خلق فضاهایی

            <br />

            ماندگار

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-white/70">

            ما تنها سازنده کابینت نیستیم؛
            ما فضاهایی خلق می‌کنیم که سال‌ها
            کیفیت، زیبایی و آرامش را برای شما به ارمغان می‌آورند.

          </p>

          <button onClick={scrollToourstory} className="group mt-12 flex items-center gap-4 rounded-full border border-primary px-8 py-4 text-white duration-500 hover:bg-primary">

            بیشتر بخوانید

            <ArrowDown className="duration-500 group-hover:translate-y-1"/>

          </button>

        </div>

      </div>

    </section>
  );
}