import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // نکته: نیازی به چک مجدد نشست ادمین اینجا نیست.
  // این کامپوننت همیشه داخل <ProtectedRoute /> رندر می‌شود
  // (به App.jsx نگاه کن) که قبلاً /auth/me را چک کرده است.

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-[#090909]
        text-white
      "
    >
      <AdminSidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <main className="lg:mr-[280px]">
        <div className="border-b border-white/10 bg-[#0b0b0b] p-4 lg:hidden">
          <button
            type="button"
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              rounded-xl
              border
              border-white/10
              px-4
              py-2
              text-sm
              text-white/70
            "
          >
            منوی مدیریت
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}