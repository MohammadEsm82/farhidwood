import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// =========================
// Public Pages
// =========================

import { NotFound } from "./page/Notfound";
import NavFooter from "./page/Navfooter";
import HomePage from "./page/HomePage";
import ShowRoom from "./page/Showroom";
import Portfolio from "./page/Portfolio";
import Project from "./page/projects";
import About from "./page/About";
import Services from "./page/Services";
import Contact from "./page/Contact";

// =========================
// Common Components
// =========================

import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/common/LoadingScreen";
import ScrollProgress from "./components/common/ScrollProgress";
import PageTransition from "./components/common/PageTransition";

// =========================
// Admin
// =========================

import AdminDashboard from "./page/admin/AdminDashboard";
import AdminProjects from "./page/admin/AdminProjects";
import AddProject from "./page/admin/AddProject";
import EditProject from "./page/admin/EditProject";
import AdminLayout from "./page/admin/AdminLayout";
import AdminMessages from "./page/admin/AdminMessages";
import AdminLogin from "./page/admin/AdminLogin";

import ProtectedRoute from "./components/auth/ProtectedRoute";

// =====================================================
// ROUTES
// =====================================================

function AppRoutes() {
  return (
    <Routes>
      {/* ================================================
          PUBLIC WEBSITE
      ================================================= */}

      <Route path="/" element={<NavFooter />}>
        <Route index element={<HomePage />} />

        <Route
          path="portfolio"
          element={<Portfolio />}
        />

        <Route
          path="portfolio/:slug"
          element={<Project />}
        />

        <Route
          path="about"
          element={<About />}
        />

        <Route
          path="services"
          element={<Services />}
        />

        <Route
          path="contact"
          element={<Contact />}
        />

        <Route
          path="showroom"
          element={<ShowRoom />}
        />
      </Route>

      {/* ================================================
          ADMIN LOGIN
      ================================================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ================================================
          PROTECTED ADMIN ROUTES
      ================================================= */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="projects"
            element={<AdminProjects />}
          />

          <Route
            path="projects/new"
            element={<AddProject />}
          />

          <Route
            path="projects/edit/:id"
            element={<EditProject />}
          />

          <Route
            path="messages"
            element={<AdminMessages />}
          />
        </Route>
      </Route>

      {/* ================================================
          NOT FOUND
      ================================================= */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

// =====================================================
// APP
// =====================================================

export default function App() {
  const [showTransition, setShowTransition] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {/* =========================
          Global Components
      ========================= */}

      <SmoothScroll />

      <ScrollProgress />

      <LoadingScreen />

      {showTransition && <PageTransition />}

      {/* =========================
          Routes
      ========================= */}

      <AppRoutes />
    </BrowserRouter>
  );
}