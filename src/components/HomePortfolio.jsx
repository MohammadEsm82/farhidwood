import { useEffect, useState } from "react";
import PortfolioCard from "./portfolio/PortfolioCard";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

export default function HomePortfolio() {

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
                console.error("HOME PORTFOLIO FETCH ERROR:", error);
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

    // اگر هنوز پروژه‌ای ثبت نشده، این بخش را اصلاً نشان نده
    if (!loading && projects.length === 0) {
        return null;
    }

    return (

        <section className="bg-secondary py-28">

            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-16 flex items-end justify-between">

                    <div>

                        <span className="tracking-[5px] uppercase text-primary">

                            Portfolio

                        </span>

                        <h2 className="mt-4 text-5xl font-bold text-white">

                            پروژه‌های منتخب

                        </h2>

                    </div>

                    <Link
                        to="/portfolio"
                        className="
                        rounded-full
                        border
                        border-primary
                        px-7
                        py-3
                        text-white
                        duration-300
                        hover:bg-primary
                        hover:text-black
                        "
                    >

                        مشاهده همه پروژه‌ها

                    </Link>

                </div>

                {loading ? (
                    <div className="grid gap-8 md:grid-cols-3">
                        {[1, 2, 3].map((placeholder) => (
                            <div
                                key={placeholder}
                                className="h-72 animate-pulse rounded-2xl bg-white/5"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">

                        {projects.slice(0, 3).map(project => (

                            <PortfolioCard
                                key={project._id}
                                project={project}
                            />

                        ))}

                    </div>
                )}

            </div>

        </section>

    )

}
