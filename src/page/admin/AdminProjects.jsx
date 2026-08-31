import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  RefreshCw,
  FolderOpen,
  AlertCircle,
} from "lucide-react";

import AdminProjectCard from "../../components/admin/AdminProjectCard";

import { API_URL as BASE_API_URL } from "../../config/api";

const API_URL = `${BASE_API_URL}/projects`;

export default function AdminProjects() {
  // =========================
  // Projects
  // =========================

  const [projects, setProjects] = useState([]);

  // =========================
  // States
  // =========================

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Filters
  // =========================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");

  // =========================
  // Get Projects
  // =========================

  const fetchProjects = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("خطا در دریافت پروژه‌ها");
      }

      const data = await response.json();

      setProjects(data.projects || []);
    } catch (error) {
      console.error("ADMIN PROJECTS ERROR:", error);

      setError(
        "دریافت پروژه‌ها با مشکل مواجه شد. اتصال سرور را بررسی کنید."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================
  // Initial Load
  // =========================

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================
  // Categories
  // =========================

 const categories = useMemo(() => {
  const uniqueCategories = projects
    .map((project) => project.category)
    .filter(Boolean)
    .filter((item) => item !== "همه");

  return ["همه", ...new Set(uniqueCategories)];
}, [projects]);
  // =========================
  // Filter Projects
  // =========================

  const filteredProjects = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return projects.filter((project) => {
      const categoryMatch =
        category === "همه" ||
        project.category === category;

      const searchMatch =
        !searchValue ||
        project.title?.toLowerCase().includes(searchValue) ||
        project.city?.toLowerCase().includes(searchValue) ||
        project.slug?.toLowerCase().includes(searchValue);

      return categoryMatch && searchMatch;
    });
  }, [projects, search, category]);

  // =========================
  // Delete Project
  // =========================

  const handleDelete = async (projectId) => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/${projectId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "حذف پروژه انجام نشد"
        );
      }

      // حذف پروژه از UI بدون reload
      setProjects((currentProjects) =>
        currentProjects.filter(
          (project) =>
            project._id !== projectId &&
            project.id !== projectId
        )
      );
    } catch (error) {
      console.error("DELETE PROJECT ERROR:", error);

      setError(
        error.message || "حذف پروژه با مشکل مواجه شد."
      );
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="
          flex
          min-h-[500px]
          items-center
          justify-center
          px-6
        "
      >
        <div className="flex flex-col items-center gap-5">
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

          <p className="text-sm text-white/50">
            در حال دریافت پروژه‌ها...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="
        w-full
        px-4
        py-6
        sm:px-6
        lg:px-8
        xl:px-10
      "
    >
      {/* =========================
          Header
      ========================== */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            "
          >
            مدیریت پروژه‌ها
          </h1>

          <p className="mt-2 text-sm text-white/50">
            پروژه‌های سایت را مدیریت، ویرایش یا حذف کنید.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Refresh */}

          <button
            type="button"
            onClick={() => fetchProjects(true)}
            disabled={refreshing}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-sm
              text-white/70
              transition
              hover:border-primary/30
              hover:bg-primary/10
              hover:text-primary
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />

            <span>بروزرسانی</span>
          </button>

          {/* Add Project */}

          <Link
            to="/admin/projects/new"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              transition
              hover:brightness-110
            "
          >
            <Plus size={18} />

            <span>افزودن پروژه</span>
          </Link>
        </div>
      </div>

      {/* =========================
          Error
      ========================== */}

      {error && (
        <div
          className="
            mb-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/5
            p-4
            text-red-400
          "
        >
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">
            <p className="text-sm">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchProjects()}
              className="
                mt-2
                text-xs
                underline
                underline-offset-4
                hover:text-red-300
              "
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      )}

      {/* =========================
          Search + Filter
      ========================== */}

      <div
        className="
          mb-8
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          p-4
          sm:p-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
          "
        >
          {/* Search */}

          <div className="relative w-full lg:max-w-md">
            <Search
              size={19}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-white/30
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="جستجوی پروژه، شهر یا slug..."
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                py-3
                pr-12
                pl-4
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-white/25
                focus:border-primary/50
              "
            />
          </div>

          {/* Categories */}

          <div
            className="
              flex
              flex-1
              gap-2
              overflow-x-auto
              pb-1
            "
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  transition
                  ${
                    category === item
                      ? "border-primary bg-primary text-black"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-primary/40 hover:text-primary"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================
          Result Info
      ========================== */}

      <div
        className="
          mb-5
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
        "
      >
        <div className="flex items-center gap-3">
          <FolderOpen
            size={20}
            className="text-primary"
          />

          <p className="text-sm text-white/60">
            {filteredProjects.length} پروژه نمایش داده می‌شود
          </p>
        </div>

        {(search || category !== "همه") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("همه");
            }}
            className="
              text-xs
              text-white/40
              transition
              hover:text-primary
            "
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {/* =========================
          Empty State
      ========================== */}

      {filteredProjects.length === 0 ? (
        <div
          className="
            flex
            min-h-[350px]
            flex-col
            items-center
            justify-center
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.03]
            px-6
            text-center
          "
        >
          <FolderOpen
            size={48}
            className="mb-5 text-white/20"
          />

          <h2 className="text-xl font-bold text-white">
            پروژه‌ای پیدا نشد
          </h2>

          <p className="mt-3 max-w-md text-sm leading-7 text-white/40">
            {projects.length === 0
              ? "هنوز هیچ پروژه‌ای در دیتابیس ثبت نشده است."
              : "با تغییر عبارت جستجو یا فیلتر دسته‌بندی دوباره تلاش کنید."}
          </p>

          {projects.length === 0 && (
            <Link
              to="/admin/projects/new"
              className="
                mt-6
                flex
                items-center
                gap-2
                rounded-xl
                bg-primary
                px-5
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:brightness-110
              "
            >
              <Plus size={18} />
              افزودن اولین پروژه
            </Link>
          )}
        </div>
      ) : (
        /* =========================
           Projects Grid
        ========================== */

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
          "
        >
          {filteredProjects.map((project) => (
            <AdminProjectCard
              key={project._id || project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}