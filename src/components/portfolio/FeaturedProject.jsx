import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedProject({ project }) {
  if (!project) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative h-[720px] overflow-hidden rounded-[40px]">
        <img
          src={project.hero}
          alt={project.title}
          className="
            h-full
            w-full
            object-cover
            duration-[2500ms]
            hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/30
            to-transparent
          "
        />

        <div className="absolute bottom-0 left-0 right-0 p-14">
          <span className="tracking-[6px] uppercase text-primary">
            Featured Project
          </span>

          <h2 className="mt-5 max-w-2xl text-6xl font-bold text-white">
            {project.title}
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-white/70">
            {project.description}
          </p>

          <Link
            to={`/portfolio/${project.slug}`}
            className="
              mt-10
              inline-flex
              items-center
              gap-4
              rounded-full
              border
              border-primary
              px-8
              py-4
              text-white
              transition-all
              duration-300
              hover:bg-primary
              hover:text-black
            "
          >
            مشاهده پروژه

            <ArrowUpRight size={22} />
          </Link>
        </div>
      </div>
    </section>
  );
}