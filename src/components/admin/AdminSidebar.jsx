import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Plus,
  ArrowRight,
  X,
} from "lucide-react";

import { API_URL } from "../../config/api";

export default function AdminSidebar({ open, onClose }) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(
          `${API_URL}/messages/unread-count`,
          { credentials: "include" }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (mounted) {
          setUnreadCount(data.count || 0);
        }
      } catch (error) {
        console.error("UNREAD COUNT FETCH ERROR:", error);
      }
    };

    fetchUnreadCount();

    // هر ۳۰ ثانیه یک‌بار به‌روزرسانی می‌شود
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    {
      title: "داشبورد",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      title: "پروژه‌ها",
      path: "/admin/projects",
      icon: FolderKanban,
    },
    {
      title: "پیام‌ها",
      path: "/admin/messages",
      icon: MessageSquare,
      badge: unreadCount,
    },
  ];

  return (
    <>
      {/* =========================
          Mobile Overlay
      ========================= */}

      {open && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-black/70
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =========================
          Sidebar
      ========================= */}

      <aside
        className={`
          fixed
          right-0
          top-0
          z-50
          h-screen
          w-[280px]
          border-l
          border-white/10
          bg-[#0d0d0d]
          transition-transform
          duration-300
          lg:translate-x-0

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">

          {/* =========================
              Logo
          ========================= */}

          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between">

              <Link
                to="/admin"
                onClick={onClose}
                className="block"
              >
                <h1 className="text-2xl font-black tracking-wide">
                  FARHID
                  <span className="text-primary">
                    WOOD
                  </span>
                </h1>

                <p className="mt-2 text-xs text-white/40">
                  پنل مدیریت
                </p>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-xl
                  border
                  border-white/10
                  p-2
                  text-white/50
                  transition
                  hover:border-primary
                  hover:text-primary
                  lg:hidden
                "
              >
                <X size={20} />
              </button>

            </div>
          </div>

          {/* =========================
              Navigation
          ========================= */}

          <nav className="flex-1 space-y-2 p-5">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-5
                    py-4
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-primary/10
                          text-primary
                          shadow-[inset_0_0_30px_rgba(200,169,106,0.04)]
                        `
                        : `
                          text-white/50
                          hover:bg-white/5
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Icon size={21} />

                  <span className="font-medium">
                    {item.title}
                  </span>

                  {!!item.badge && (
                    <span
                      className="
                        mr-auto
                        flex
                        h-6
                        min-w-[24px]
                        items-center
                        justify-center
                        rounded-full
                        bg-primary
                        px-1.5
                        text-xs
                        font-bold
                        text-black
                      "
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            {/* =========================
                Add Project
            ========================= */}

            <Link
              to="/admin/projects/new"
              onClick={onClose}
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-primary
                px-5
                py-4
                font-bold
                text-black
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_15px_40px_rgba(200,169,106,0.2)]
              "
            >
              <Plus size={20} />

              <span>
                پروژه جدید
              </span>
            </Link>

          </nav>

          {/* =========================
              Bottom
          ========================= */}

          <div className="border-t border-white/10 p-5">

            <Link
              to="/"
              onClick={onClose}
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-white/10
                px-4
                py-3
                text-sm
                text-white/50
                transition
                hover:border-primary
                hover:text-primary
              "
            >
              <ArrowRight size={18} />

              مشاهده سایت
            </Link>

          </div>
        </div>
      </aside>
    </>
  );
}