import PortfolioCard from "./PortfolioCard";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioGrid({ projects = [] }) {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(
        ".portfolio-card",
        container.current
      );

      if (!cards.length) return;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",

          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    {
      scope: container,
      dependencies: [projects],
    }
  );

  const getLayout = (layout) => {
    switch (layout) {
      case "large":
        return "md:col-span-2 md:row-span-2";

      case "wide":
        return "md:col-span-2";

      case "tall":
        return "md:row-span-2";

      default:
        return "";
    }
  };

  if (!projects.length) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

          <h2 className="text-4xl font-bold text-white">
            پروژه‌ای پیدا نشد
          </h2>

          <p className="mt-5 text-white/50">
            عبارت جستجو یا فیلتر را تغییر دهید.
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">

      <div
        ref={container}
        className="
          grid
          auto-rows-[280px]
          gap-8
          md:grid-cols-4
        "
      >
        {projects.map((project) => (
          <div
            key={project._id || project.id || project.slug}
            className={`
              ${getLayout(project.layout)}
              portfolio-card
            `}
          >
            <PortfolioCard project={project} />
          </div>
        ))}
      </div>

    </section>
  );
}
