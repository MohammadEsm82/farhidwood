import {
  Home,
  DoorOpen,
  Sofa,
  SquareStack,
  Tv,
  Hammer,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "کابینت آشپزخانه",
    desc: "طراحی و اجرای کابینت مدرن، کلاسیک و نئوکلاسیک.",
  },
  {
    icon: DoorOpen,
    title: "کمد دیواری",
    desc: "اجرای کمدهای سفارشی با طراحی اختصاصی.",
  },
  {
    icon: Tv,
    title: "تی وی وال",
    desc: "طراحی دیوار تلویزیون با متریال لوکس.",
  },
  {
    icon: SquareStack,
    title: "درب‌های CNC",
    desc: "درب‌های سفارشی با برش CNC و رنگ پلی‌اورتان.",
  },
  {
    icon: Sofa,
    title: "دکوراسیون داخلی",
    desc: "طراحی کامل فضاهای مسکونی و اداری.",
  },
  {
    icon: Hammer,
    title: "اجرای پروژه",
    desc: "اندازه‌گیری، ساخت و نصب توسط تیم متخصص.",
  },
];

export default function ServicesGrid() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="text-center">
        <span className="text-sm uppercase tracking-[5px] text-primary">
          WHAT WE DO
        </span>

        <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
          خدمات ما
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/50">
          از طراحی و تولید تا نصب و اجرای نهایی، تمام مراحل پروژه با دقت
          و هماهنگی انجام می‌شود.
        </p>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Link
              key={service.title}
              to="/contact"
              className="
                group
                relative
                overflow-hidden
                rounded-[34px]
                border
                border-white/10
                bg-white/[0.03]
                p-8
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-primary/60
                hover:bg-white/[0.05]
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    transition-all
                    duration-500
                    group-hover:bg-primary
                    group-hover:text-black
                  "
                >
                  <Icon size={30} />
                </div>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/40
                    transition-all
                    duration-500
                    group-hover:rotate-45
                    group-hover:border-primary
                    group-hover:text-primary
                  "
                >
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <h3 className="mt-8 text-2xl font-bold text-white">
                {service.title}
              </h3>

              <p className="mt-4 leading-8 text-white/55">
                {service.desc}
              </p>

              <div className="mt-8 text-sm font-medium text-primary">
                درخواست مشاوره →
              </div>

              <div
                className="
                  absolute
                  -bottom-20
                  -right-20
                  h-40
                  w-40
                  rounded-full
                  bg-primary/10
                  blur-[70px]
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

