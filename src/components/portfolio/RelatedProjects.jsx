import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function RelatedProjects({ projects }) {
  if (!projects || projects.length === 0) {
  return null;
  }
    return (
        <section className="relative overflow-hidden bg-secondary py-28">

            {/* Golden Glow */}

            <div
                className="
                absolute
                right-0
                top-0
                h-[400px]
                w-[400px]
                rounded-full
                bg-primary/10
                blur-[170px]
                "
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6">

                <span
                    className="
                    uppercase
                    tracking-[5px]
                    text-primary
                    "
                >
                    More Projects
                </span>

                <h2
                    className="
                    mt-4
                    text-5xl
                    font-bold
                    text-white
                    "
                >
                    پروژه‌های مشابه
                </h2>

                <div
                    className="
                    mt-20
                    grid
                    gap-8
                    md:grid-cols-2
                    xl:grid-cols-3
                    "
                >
                  

                    {projects.map((project) => (

                        <Link
                            key={project.slug}
                            to={`/portfolio/${project.slug}`}
                            className="
                            group
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-white/10
                            bg-white/[0.02]
                            duration-500
                            hover:-translate-y-2
                            hover:border-primary
                            hover:shadow-[0_0_40px_rgba(181,147,87,.15)]
                            "
                        >

                            <div className="overflow-hidden">

                                <img
                                    src={project.hero}
                                    alt={project.title}
                                    className="
                                    h-80
                                    w-full
                                    object-cover
                                    duration-700
                                    group-hover:scale-110
                                    "
                                />

                            </div>

                            <div className="p-8">

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

                                <h3
                                    className="
                                    mt-4
                                    text-3xl
                                    font-bold
                                    text-white
                                    "
                                >
                                    {project.title}
                                </h3>

                                <p
                                    className="
                                    mt-4
                                    text-white/60
                                    "
                                >
                                    {project.city}
                                </p>

                                <div
                                    className="
                                    mt-8
                                    flex
                                    items-center
                                    gap-3
                                    text-primary
                                    duration-300
                                    group-hover:translate-x-2
                                    "
                                >

                                    مشاهده پروژه

                                    <ArrowRight size={20} />

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}