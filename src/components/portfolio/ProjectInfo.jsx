import {
  CalendarDays,
  Clock3,
  Hammer,
  Layers3,
  MapPin,
  Ruler,
} from "lucide-react";

export default function ProjectInfo({ project }) {
  const info = [
    {
      icon: <CalendarDays size={22} />,
      title: "سال اجرا",
      value: project.year,
    },
    {
      icon: <MapPin size={22} />,
      title: "شهر",
      value: project.city,
    },
    {
      icon: <Ruler size={22} />,
      title: "متراژ",
      value: project.area,
    },
    {
      icon: <Layers3 size={22} />,
      title: "سبک",
      value: project.style,
    },
    {
      icon: <Hammer size={22} />,
      title: "متریال",
      value: project.materials.join(" / "),
    },
    {
      icon: <Clock3 size={22} />,
      title: "مدت اجرا",
      value: project.duration,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-secondary py-28">
      {/* Golden Glow */}
      <div className="absolute -left-52 top-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-white/[0.03] blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-8 text-7xl font-black text-white/5">
          01
        </div>

        <span className="uppercase tracking-[5px] text-primary">
          PROJECT DETAILS
        </span>

        <h2 className="mt-4 text-5xl font-bold text-white">
          {project.title}
        </h2>

        <div className="mt-6 h-[2px] w-28 bg-primary" />

        <p className="mt-8 max-w-3xl leading-9 text-white/70">
          {project.description}
        </p>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {info.map((item, index) => (
            <div
              key={index}
              className="
                group
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.02]
                p-8
                duration-500
                hover:-translate-y-2
                hover:border-primary
                hover:bg-white/[0.04]
                hover:shadow-[0_0_40px_rgba(181,147,87,.15)]
              "
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary duration-500 group-hover:scale-110">
                {item.icon}
              </div>

              <p className="text-sm uppercase tracking-[4px] text-white/40">
                {item.title}
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                {item.value}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}