import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { API_URL } from "../../config/api";

export default function ProjectsPreview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);

        if (!response.ok) {
          throw new Error("خطا در دریافت پروژه‌ها");
        }

        const data = await response.json();

        if (mounted) {
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error("PROJECTS PREVIEW FETCH ERROR:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  if (!loading && projects.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden">
      {/* Golden Glow */}
      <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-primary/10 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="text-sm uppercase tracking-[5px] text-primary">
              PORTFOLIO
            </span>

            <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
              برخی از پروژه‌های منتخب
            </h2>

            <p className="mt-5 max-w-2xl leading-8 text-white/50">
              بخشی از پروژه‌هایی که با طراحی اختصاصی و اجرای دقیق
              توسط مجموعه ما انجام شده‌اند.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="
              group
              inline-flex
              shrink-0
              items-center
              gap-3
              rounded-full
              border
              border-primary
              px-7
              py-4
              text-white
              transition-all
              duration-300
              hover:bg-primary
              hover:text-black
            "
          >
            مشاهده همه پروژه‌ها

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {loading
            ? [1, 2, 3].map((placeholder) => (
                <div
                  key={placeholder}
                  className="h-[500px] animate-pulse rounded-[32px] bg-white/5"
                />
              ))
            : projects.slice(0, 3).map((project, index) => (
            <Link
              key={project.slug}
              to={`/portfolio/${project.slug}`}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-black
              "
            >
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src={project.hero}
                  alt={project.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute left-6 top-6 text-6xl font-black text-white/10">
                  0{index + 1}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span className="text-xs uppercase tracking-[4px] text-primary">
                    {project.category || project.style}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {project.title}
                  </h3>

                  <div className="mt-5 flex items-center gap-3 text-sm text-white/50">
                    <span>
                      {project.city || "اصفهان"}
                    </span>

                    <span>•</span>

                    <span>
                      {project.area || "پروژه سفارشی"}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-3 text-white">
                    <span className="text-sm">
                      مشاهده پروژه
                    </span>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                        transition-all
                        duration-500
                        group-hover:rotate-45
                        group-hover:bg-primary
                        group-hover:text-black
                      "
                    >
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

