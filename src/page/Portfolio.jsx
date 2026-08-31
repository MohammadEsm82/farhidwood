import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioFilter from "../components/portfolio/PortfolioFilter";
import FeaturedProject from "../components/portfolio/FeaturedProject";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioPagination from "../components/portfolio/PortfolioPagination";

import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config/api";

export default function Portfolio() {
  // =========================
  // Projects
  // =========================

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Filters
  // =========================

  const [selected, setSelected] = useState("همه");
  const [search, setSearch] = useState("");

  // =========================
  // Get Projects From API
  // =========================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/projects`
        );

        if (!response.ok) {
          throw new Error("خطا در دریافت پروژه‌ها");
        }

        const data = await response.json();

        setProjects(data.projects || []);
      } catch (error) {
        console.error("Portfolio API Error:", error);

        setError("دریافت پروژه‌ها با مشکل مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // =========================
  // Filter Projects
  // =========================

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch =
        selected === "همه" ||
        project.category === selected;

      const searchText = search.trim().toLowerCase();

      const searchMatch =
        !searchText ||
        project.title.toLowerCase().includes(searchText) ||
        project.category.toLowerCase().includes(searchText) ||
        project.city.toLowerCase().includes(searchText);

      return categoryMatch && searchMatch;
    });
  }, [projects, selected, search]);

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <>
        <PortfolioHero />

        <section className="flex min-h-[400px] items-center justify-center">
          <div
            className="
              h-12
              w-12
              animate-spin
              rounded-full
              border-2
              border-primary
              border-t-transparent
            "
          />
        </section>
      </>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <>
        <PortfolioHero />

        <section className="flex min-h-[400px] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-xl text-red-400">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="
                mt-6
                rounded-full
                border
                border-primary
                px-7
                py-3
                text-white
                transition
                duration-300
                hover:bg-primary
                hover:text-black
              "
            >
              تلاش مجدد
            </button>
          </div>
        </section>
      </>
    );
  }

  // =========================
  // Page
  // =========================

  return (
    <>
      {/* Hero */}

      <PortfolioHero />

      {/* Featured Project */}

      {projects.length > 0 && (
        <FeaturedProject project={projects[0]} />
      )}

      {/* Filter */}

      <PortfolioFilter
        selected={selected}
        setSelected={setSelected}
      />

      {/* Search */}

      <div
        className="
          mx-auto
          mt-10
          mb-14
          flex
          max-w-7xl
          flex-col
          gap-6
          px-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <input
          type="text"
          placeholder="جستجوی پروژه..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-full
            border
            border-white/10
            bg-white/5
            px-7
            py-4
            text-white
            outline-none
            transition
            duration-300
            placeholder:text-white/30
            focus:border-primary
            lg:max-w-md
          "
        />

        <p className="text-white/60">
          {filteredProjects.length} پروژه پیدا شد
        </p>
      </div>

      {/* Projects */}

      {filteredProjects.length > 0 ? (
        <PortfolioGrid projects={filteredProjects} />
      ) : (
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div
            className="
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              px-6
              py-20
              text-center
            "
          >
            <p className="text-xl text-white/50">
              پروژه‌ای با این مشخصات پیدا نشد.
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}

      <PortfolioPagination />
    </>
  );
}