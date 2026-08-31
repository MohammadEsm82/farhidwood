import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { API_URL } from "../../config/api";

export default function ProtectedRoute() {
  const location = useLocation();

  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

        if (cancelled) return;

        if (response.ok) {
          const data = await response.json();

          if (data.success && data.admin) {
            setStatus("authenticated");
            return;
          }
        }

        localStorage.removeItem("adminToken");
        setStatus("unauthenticated");
      } catch (error) {
        console.error("PROTECTED ROUTE ERROR:", error);

        if (!cancelled) {
          setStatus("unauthenticated");
        }
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#090909] text-white"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-primary" />
          <p className="text-sm text-white/40">
            در حال بررسی نشست مدیریت...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
