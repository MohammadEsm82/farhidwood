import {
  ShieldCheck,
  Ruler,
  Hammer,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "کیفیت تضمین شده",
    desc: "استفاده از بهترین متریال و اجرای دقیق تمام جزئیات.",
  },

  {
    icon: Ruler,
    title: "طراحی اختصاصی",
    desc: "هر پروژه متناسب با فضای شما طراحی و اجرا می‌شود.",
  },

  {
    icon: Hammer,
    title: "اجرای حرفه‌ای",
    desc: "تمام مراحل توسط تیم متخصص و با دستگاه‌های CNC انجام می‌شود.",
  },

  {
    icon: Sparkles,
    title: "جزئیات لوکس",
    desc: "تمرکز ما روی کیفیت نهایی و زیبایی ماندگار پروژه است.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-secondary py-32">

      {/* Glow */}

      <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[170px]" />

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="tracking-[5px] uppercase text-primary">
            WHY US
          </span>

          <h2 className="mt-5 text-5xl font-black text-white">
            چرا ما را انتخاب می‌کنند؟
          </h2>

          <p className="mx-auto mt-8 max-w-3xl leading-9 text-white/60">
            ترکیب طراحی، کیفیت ساخت و اجرای دقیق باعث شده پروژه‌های ما
            علاوه بر زیبایی، سال‌ها ماندگار باشند.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="
                group
                rounded-[30px]
                border-2
                border-white/10
                bg-white/[0.06]
                p-10
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-primary
                "
              >

                <div
                  className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                  transition-all
                  duration-500
                  group-hover:bg-primary
                  group-hover:text-black
                  "
                >
                  <Icon size={34}/>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-5 leading-8 text-white/60">
                  {item.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}