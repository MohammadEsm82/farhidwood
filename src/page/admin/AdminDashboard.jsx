import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  FolderKanban,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

import AdminStats from "../../components/admin/AdminStats";
import { API_URL } from "../../config/api";

export default function AdminDashboard() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/projects`
      );

      if (!response.ok) {
        throw new Error(
          "دریافت پروژه‌ها انجام نشد."
        );
      }

      const data = await response.json();

      setProjects(data.projects || []);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "خطا در دریافت اطلاعات."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section
      dir="rtl"
      className="
        min-h-screen
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-10
        lg:py-10
      "
    >

      <div className="mx-auto max-w-7xl">

        {/* =========================
            Header
        ========================= */}
        <div
          className="
            mb-8
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <p className="text-xs tracking-[3px] text-primary">
              DASHBOARD
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              داشبورد مدیریت
            </h2>

            <p className="mt-2 text-sm text-white/40">
              مدیریت پروژه‌ها و محتوای سایت FARHIDWOOD
            </p>

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={fetchProjects}
              disabled={loading}
              className="
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                px-4
                py-3
                text-white/60
                transition
                hover:border-primary
                hover:text-primary
                disabled:opacity-40
              "
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
            </button>

            <Link
              to="/admin/projects/new"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-primary
                px-5
                py-3
                font-bold
                text-black
                transition
                hover:-translate-y-1
              "
            >
              <Plus size={19} />

              پروژه جدید
            </Link>

          </div>

        </div>

        {/* =========================
            Error
        ========================= */}
        {error && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/5
              px-5
              py-4
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* =========================
            Stats
        ========================= */}
        <AdminStats projects={projects} />

        {/* =========================
            Quick Actions
        ========================= */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <Link
            to="/admin/projects"
            className="
              group
              rounded-[26px]
              border
              border-white/10
              bg-white/[0.03]
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:border-primary/30
            "
          >

            <div className="flex items-center justify-between">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  text-primary
                "
              >
                <FolderKanban size={27} />
              </div>

              <ArrowLeft
                size={20}
                className="
                  text-white/20
                  transition
                  group-hover:-translate-x-2
                  group-hover:text-primary
                "
              />

            </div>

            <h3 className="mt-6 text-xl font-bold">
              مدیریت پروژه‌ها
            </h3>

            <p className="mt-2 text-sm text-white/40">
              مشاهده، ویرایش و حذف پروژه‌های سایت
            </p>

          </Link>

          <Link
            to="/admin/projects/new"
            className="
              group
              rounded-[26px]
              border
              border-primary/20
              bg-primary/[0.04]
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:border-primary/50
            "
          >

            <div className="flex items-center justify-between">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary
                  text-black
                "
              >
                <Plus size={27} />
              </div>

              <ArrowLeft
                size={20}
                className="
                  text-primary/40
                  transition
                  group-hover:-translate-x-2
                  group-hover:text-primary
                "
              />

            </div>

            <h3 className="mt-6 text-xl font-bold">
              افزودن پروژه جدید
            </h3>

            <p className="mt-2 text-sm text-white/40">
              ایجاد پروژه با تصویر Hero، گالری و ویدیو
            </p>

          </Link>

        </div>

      </div>

    </section>
  );
}