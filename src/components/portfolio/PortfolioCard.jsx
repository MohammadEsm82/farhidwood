import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { API_URL } from "../../config/api";

// اگر API_URL چیزی مثل http://localhost:5000/api باشد،
// این خط فقط قسمت origin (http://localhost:5000) را نگه می‌دارد
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export default function PortfolioCard({ project }) {
  const card = useRef(null);

  useGSAP(() => {
    if (!card.current) return;

    gsap.fromTo(
      card.current,
      {
        opacity: 0,
        y: 120,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      }
    );
  }, []);

  // اگر پروژه وجود نداشت
  if (!project) return null;

  const imageUrl = project.hero?.startsWith("http")
  ? project.hero
  : `${API_ORIGIN}${project.hero}`;

  return (
    <Link
      ref={card}
      to={`/portfolio/${project.slug}`}
      className="
        group
        relative
        block
        h-full
        min-h-[280px]
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        transition-all
        duration-500
        hover:-translate-y-3
        hover:border-primary/40
        hover:shadow-[0_40px_100px_rgba(0,0,0,.45)]
      "
    >
      {/* ================= IMAGE ================= */}

      <img
       src={imageUrl}
       
        alt={project.title}
        loading="lazy"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1200ms]
          ease-out
          will-change-transform
          group-hover:scale-[1.18]
        "
      />

      {/* ================= DARK OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/30
          to-transparent
          transition-all
          duration-700
          group-hover:via-black/10
        "
      />

      {/* ================= GOLDEN OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-primary/0
          transition-all
          duration-700
          group-hover:bg-primary/10
        "
      />

      {/* ================= GLOW ================= */}

      <div
        className="
          absolute
          -bottom-24
          left-1/2
          h-48
          w-48
          -translate-x-1/2
          rounded-full
          bg-primary/20
          blur-[80px]
          opacity-0
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      />

   

      {/* ================= CONTENT ================= */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-10
          p-8
          sm:p-9
          
        "
      >
        {/* Style */}

        <span
          className="
            text-sm
            uppercase
            tracking-[4px]
            text-primary
          "
        >
          {project.style}
        </span>

        {/* Category */}

        <div
          className="
            mt-3
            inline-flex
            rounded-full
            border
            border-primary/20
            bg-primary/10
            px-4
            py-2
            text-xs
            text-primary
            backdrop-blur-md
            mx-2
          "
        >
          {project.category}
        </div>

        {/* Title */}

        <h3
          className="
            mt-3
            text-2xl
            font-bold
            text-white
            transition-transform
            duration-500
            sm:text-3xl
            group-hover:-translate-y-2
          "
        >
          {project.title}
        </h3>

        {/* Line */}

        <div
          className="
            mt-4
            h-[2px]
            w-0
            bg-primary
            transition-all
            duration-500
            group-hover:w-24
          "
        />

        {/* Meta */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-3
            text-sm
            text-white/60
          "
        >
          <span>{project.city}</span>

          <span className="text-primary/60">•</span>

          <span>{project.area}</span>

          {project.year && (
            <>
              <span className="text-primary/60">•</span>
              <span>{project.year}</span>
            </>
          )}
        </div>

        {/* CTA */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-white/60
              transition-colors
              duration-300
              group-hover:text-white
            "
          >
            مشاهده پروژه
          </span>

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-xl
              transition-all
              duration-500
              group-hover:rotate-45
              group-hover:border-primary
              group-hover:bg-primary
              group-hover:text-black
            "
          >
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
