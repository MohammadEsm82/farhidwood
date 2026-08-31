const process = [
  {
    number: "01",
    title: "مشاوره و بازدید",
    desc: "نیازهای پروژه، سلیقه کارفرما و ابعاد فضا بررسی می‌شود.",
  },
  {
    number: "02",
    title: "طراحی سه‌بعدی",
    desc: "طرح اولیه به صورت سه‌بعدی آماده و قبل از اجرا بررسی می‌شود.",
  },
  {
    number: "03",
    title: "انتخاب متریال",
    desc: "MDF، هایگلاس، پلی‌اورتان، چوب طبیعی و یراق‌آلات انتخاب می‌شوند.",
  },
  {
    number: "04",
    title: "ساخت در کارخانه",
    desc: "تمام قطعات توسط دستگاه‌های CNC و ماشین‌آلات دقیق تولید می‌شوند.",
  },
  {
    number: "05",
    title: "نصب و تحویل",
    desc: "تیم نصب پروژه را اجرا کرده و پس از کنترل کیفیت تحویل می‌دهد.",
  },
];

export default function ServiceProcess() {
  return (
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative z-10">
        <div className="text-center">
          <span className="text-sm uppercase tracking-[6px] text-primary">
            PROCESS
          </span>

          <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
            مراحل اجرای پروژه
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/50">
            از اولین جلسه مشاوره تا تحویل نهایی، تمام مراحل پروژه
            با برنامه‌ریزی و کنترل کیفیت انجام می‌شود.
          </p>
        </div>

        <div className="relative mt-20">

          <div className="space-y-6 ">
            {process.map((item) => (
              <div
                key={item.number}
                className="
                  group
                  relative
                  rounded-[32px]
                  border
                  border-white/10
                  bg-white/[0.025]
                  p-6
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-primary/50
                  hover:bg-white/[0.045]
                  lg:p-8
                "
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                 
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary md:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-3xl leading-8 text-white/50">
                      {item.desc}
                    </p>
                  </div>

                  <div className="block text-3xl font-black text-primary/[0.06] transition-all duration-500 group-hover:text-primary/[0.08] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none select-none">        
                    {item.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
