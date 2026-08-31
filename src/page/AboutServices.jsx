import {
  Cuboid,
  Drill,
  Circle,
  TreePine,
  Ruler,
  Sparkles,
  DoorClosed,
  Wrench,
} from "lucide-react";

import ServiceCard from "../components/ServiceCard";

export default function AboutServices() {
  const services = [
    {
      title: "طراحی سه‌بعدی",
      icon: Cuboid,
    },
    {
      title: "CNC اختصاصی",
      icon: Drill,
    },
    {
      title: "سند و پرس",
      icon: Circle,
    },
    {
      title: "چوب طبیعی",
      icon: TreePine,
    },
    {
      title: "مهندسی",
      icon: Ruler,
    },
    {
      title: "رنگ پلی اورتان",
      icon: Sparkles,
    },
    {
      title: "درب ضد سرقت",
      icon: DoorClosed,
    },
    {
      title: "نصب و اجرا",
      icon: Wrench,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-secondary py-32">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[170px]" />

        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-4xl text-center">

          <h2 className="font-primary text-4xl font-extrabold text-white md:text-6xl">
            از طراحی تا اجرا،
            <span className="text-primary"> همه چیز </span>
            در مجموعه ما
          </h2>

          <p className="mx-auto mt-8 max-w-3xl leading-9 text-text-secondary">
            تمامی مراحل از طراحی سه‌بعدی، انتخاب متریال، تولید، برش CNC،
            رنگ‌آمیزی، مونتاژ و نصب توسط تیم متخصص مجموعه انجام می‌شود تا
            کیفیت، دقت و زیبایی در بالاترین سطح تضمین گردد.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

          {services.map((item, index) => (

            <ServiceCard
              key={index}
              title={item.title}
              Icon={item.icon}
            />

          ))}

        </div>

      </div>

    </section>
  );
}