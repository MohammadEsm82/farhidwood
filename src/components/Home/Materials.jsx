import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Layers,
  Sparkles,
  TreePine,
  PanelsTopLeft,
  Palette,
  Grid2X2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const materials = [
  {
    id: 1,
    title: "چوب طبیعی",
    description:
      "انواع چوب طبیعی برای خلق فضاهایی گرم، اصیل و ماندگار.",
    icon: TreePine,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 2,
    title: "MDF",
    description:
      "تنوع گسترده در رنگ، ضخامت و طرح برای اجرای پروژه‌های مدرن.",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 3,
    title: "پلی‌اورتان",
    description:
      "سطوح رنگ‌شده با کیفیت بالا، دوام عالی و امکان اجرای رنگ سفارشی.",
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 4,
    title: "هایگلاس",
    description:
      "سطوح براق و مدرن برای طراحی آشپزخانه و فضاهای لوکس.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 5,
    title: "روکش و پنل",
    description:
      "روکش‌های چوبی و پنل‌های دکوراتیو برای طراحی خاص و سفارشی.",
    icon: PanelsTopLeft,
    image:
      "https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 6,
    title: "متریال دکوراتیو",
    description:
      "ترکیب متریال‌های مدرن و خاص برای خلق جزئیات متفاوت.",
    icon: Grid2X2,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: 7,
    title: "اجرای سفارشی",
    description:
      "اگر متریال خاصی مدنظر دارید، آن را متناسب با پروژه شما اجرا می‌کنیم.",
    icon: Box,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Materials() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCards = 4;

  const nextSlide = () => {
    setStartIndex((prev) =>
      prev >= materials.length - visibleCards ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev <= 0 ? materials.length - visibleCards : prev - 1
    );
  };

  const visibleMaterials = materials.slice(
    startIndex,
    startIndex + visibleCards
  );

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-secondary py-24 md:py-32"
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute left-[-200px] top-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[180px]" />

      <div className="pointer-events-none absolute right-[-200px] top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* =========================
            Header
        ========================= */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium tracking-[4px] text-primary">
            MATERIALS
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
            متریال، محدودیت ما نیست
          </h2>

          <p className="mx-auto mt-7 max-w-2xl leading-9 text-white/50">
            از چوب طبیعی و MDF گرفته تا پلی‌اورتان، هایگلاس و
            متریال‌های سفارشی؛ متناسب با سبک، بودجه و نیاز پروژه شما
            بهترین انتخاب را اجرا می‌کنیم.
          </p>
        </div>

        {/* =========================
            Features
        ========================= */}

  <div className="flex w-full flex-col items-center justify-center md:flex-row">
  
  <Feature
    icon={<Sparkles size={20} />}
    title="کیفیت تضمین‌شده"
  />

  {/* Divider */}
  <div
    className="
      h-px
      w-24
      bg-gradient-to-r
      from-transparent
      via-primary/40
      to-transparent

      md:h-12
      md:w-px
      md:bg-gradient-to-b
    "
  />

  <Feature
    icon={<Layers size={20} />}
    title="تنوع نامحدود"
  />

  {/* Divider */}
  <div
    className="
      h-px
      w-24
      bg-gradient-to-r
      from-transparent
      via-primary/40
      to-transparent

      md:h-12
      md:w-px
      md:bg-gradient-to-b
    "
  />

  <Feature
    icon={<Palette size={20} />}
    title="متناسب با سلیقه شما"
  />

</div>

        {/* =========================
            Materials Slider
        ========================= */}

        <div className="relative mt-16">
          {/* Desktop */}

          <div className="hidden grid-cols-4 gap-5 lg:grid">
            {visibleMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
              />
            ))}
          </div>

          {/* Tablet */}

          <div className="hidden grid-cols-2 gap-5 md:grid lg:hidden">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
              />
            ))}
          </div>

          {/* Mobile */}

          <div className="flex gap-5 overflow-x-auto pb-5 md:hidden">
            {materials.map((material) => (
              <div
                key={material.id}
                className="min-w-[280px]"
              >
                <MaterialCard material={material} />
              </div>
            ))}
          </div>

          {/* Navigation Desktop */}

          <button
            type="button"
            onClick={prevSlide}
            className="
              absolute
              -right-5
              top-1/2
              z-10
              hidden
              h-14
              w-14
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-primary/30
              bg-secondary/90
              text-primary
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-110
              hover:bg-primary
              hover:text-black
              lg:flex
            "
          >
            <ChevronRight size={24} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="
              absolute
              -left-5
              top-1/2
              z-10
              hidden
              h-14
              w-14
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-primary/30
              bg-secondary/90
              text-primary
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-110
              hover:bg-primary
              hover:text-black
              lg:flex
            "
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* =========================
            CTA
        ========================= */}

        <div className="mt-20 text-center">
          <p className="text-white/50">
            متریال خاصی مدنظر دارید؟
          </p>

          <a
            href="/contact"
            className="
              group
              mt-6
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-primary/50
              bg-primary/5
              px-8
              py-4
              font-bold
              text-primary
              transition-all
              duration-300
              hover:bg-primary
              hover:text-black
              hover:shadow-[0_15px_50px_rgba(201,168,106,0.15)]
            "
          >
            مشاوره برای انتخاب متریال

            <ArrowLeft
              size={19}
              className="transition-transform duration-300 group-hover:-translate-x-2"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   Material Card
========================================= */

function MaterialCard({ material }) {
  const Icon = material.icon;

  return (
    <article
      className="
        group
        relative
        h-[470px]
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.03]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-primary/40
        hover:shadow-[0_20px_70px_rgba(0,0,0,0.35)]
      "
    >
      {/* Image */}

      <img
        src={material.image}
        alt={material.title}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />

      {/* Gold Glow */}

      <div className="absolute inset-0 bg-primary/0 transition duration-500 group-hover:bg-primary/[0.04]" />

      {/* Content */}

      <div className="absolute bottom-0 right-0 left-0 p-7">
        {/* Icon */}

        <div
          className="
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-primary/30
            bg-black/50
            text-primary
            backdrop-blur-xl
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:bg-primary
            group-hover:text-black
          "
        >
          <Icon size={23} />
        </div>

        <h3 className="text-xl font-bold text-white">
          {material.title}
        </h3>

        <p className="mt-3 leading-7 text-sm text-white/50">
          {material.description}
        </p>

        {/* Hover Line */}

        <div className="mt-5 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      </div>
    </article>
  );
}

/* =========================================
   Feature
========================================= */

function Feature({ icon, title }) {
  return (
    <div className="flex items-center justify-center gap-4 px-6 py-7">
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-primary/20
          bg-primary/5
          text-primary
        "
      >
        {icon}
      </div>

      <span className="font-medium text-white/80">
        {title}
      </span>
    </div>
  );
}