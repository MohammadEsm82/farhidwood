import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Mail,
  Phone,
  Send,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

import instagram from "../assets/picture/instagram.svg";
import farhidwood from "../assets/picture/farhidwood_transparent.png";

function NavFooter() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  // =====================================================
  // SCROLL HEADER
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // =====================================================

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // =====================================================
  // LOCK BODY SCROLL
  // =====================================================

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // =====================================================
  // ESC CLOSE
  // =====================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  // =====================================================
  // TOGGLE
  // =====================================================

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // =====================================================
  // NAV ITEMS
  // =====================================================

  const navItems = [
    {
      to: "/",
      label: "خانه",
    },
    {
      to: "/portfolio",
      label: "نمونه‌کارها",
    },
    {
      to: "/services",
      label: "خدمات",
    },
    {
      to: "/showroom",
      label: "شوروم",
    },
    {
      to: "/about",
      label: "درباره ما",
    },
    {
      to: "/contact",
      label: "تماس با ما",
    },
  ];

  // =====================================================
  // ACTIVE ROUTE
  // =====================================================

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      {/* ===================================================
          HEADER
      ==================================================== */}

      <header className="fixed left-0 top-0 z-50 w-full">
        <nav
          className={`
            relative
            mx-auto
            flex
            h-[78px]
            items-center
            justify-between
            transition-all
            duration-500
            ${
              scrolled
                ? `
                  mx-3
                  mt-3
                  max-w-7xl
                  rounded-2xl
                  border
                  border-white/10
                  bg-secondary/80
                  px-4
                  shadow-[0_15px_50px_rgba(0,0,0,.3)]
                  backdrop-blur-2xl
                  sm:mx-4
                  sm:px-6
                  lg:mx-auto
                  lg:px-8
                `
                : `
                  max-w-7xl
                  px-5
                  sm:px-6
                  lg:px-8
                `
            }
          `}
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="
              group
              relative
              z-[70]
              flex
              shrink-0
              items-center
            "
          >
            <img
              src={farhidwood}
              alt="FarhidWood"
              className="
                w-32
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:drop-shadow-[0_0_18px_rgba(201,168,106,.35)]
                sm:w-36
                lg:w-40
              "
            />
          </Link>

          {/* =================================================
              DESKTOP MENU
          ================================================== */}

          <div
            className="
              hidden
              items-center
              gap-1
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              p-1
              backdrop-blur-md
              lg:flex
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  rounded-full
                  px-4
                  py-2.5
                  text-sm
                  transition-all
                  duration-300
                  xl:px-5
                  ${
                    isActive(item.to)
                      ? "bg-primary/15 text-primary"
                      : "text-white/65 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className="flex items-center gap-3">
            {/* Desktop Contact */}

            <Link
              to="/contact"
              className="
                group
                hidden
                items-center
                gap-2
                rounded-full
                bg-primary
                px-5
                py-3
                text-sm
                font-semibold
                text-secondary
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_10px_30px_rgba(201,168,106,.25)]
                lg:flex
              "
            >
              <span>درخواست مشاوره</span>

              <Send
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />
            </Link>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={
                mobileMenuOpen
                  ? "بستن منو"
                  : "باز کردن منو"
              }
              aria-expanded={mobileMenuOpen}
              className="
                relative
                z-[70]
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.05]
                text-white
                transition-all
                duration-300
                hover:border-primary/40
                hover:bg-primary/10
                hover:text-primary
                lg:hidden
              "
            >
              {mobileMenuOpen ? (
                <X
                  size={22}
                  className="transition-transform duration-300"
                />
              ) : (
                <Menu
                  size={22}
                  className="transition-transform duration-300"
                />
              )}
            </button>
          </div>
        </nav>

        {/* ===================================================
            MOBILE MENU BACKDROP
        ==================================================== */}

        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`
            fixed
            inset-0
            z-[55]
            bg-black/60
            backdrop-blur-sm
            transition-all
            duration-500
            lg:hidden
            ${
              mobileMenuOpen
                ? "visible opacity-100"
                : "invisible opacity-0"
            }
          `}
        />

        {/* ===================================================
            MOBILE MENU
        ==================================================== */}

        <div
          className={`
            fixed
            left-3
            right-3
            top-[92px]
            z-[60]
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-secondary/90
            shadow-[0_25px_80px_rgba(0,0,0,.45)]
            backdrop-blur-2xl
            transition-all
            duration-500
            lg:hidden
            ${
              mobileMenuOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-5 opacity-0"
            }
          `}
        >
          {/* Gold top line */}

          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

          <div className="p-4">
            {/* Mobile Menu Header */}

            <div className="mb-3 flex items-center justify-between px-3 py-2">
              <div>
                <p className="text-[9px] font-semibold tracking-[4px] text-primary/60">
                  FARHIDWOOD
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  منوی سایت
                </p>
              </div>

              <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(201,168,106,.7)]" />
            </div>

            {/* Mobile Links */}

            <div className="space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={`
                    group
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    px-4
                    py-3.5
                    transition-all
                    duration-300
                    ${
                      isActive(item.to)
                        ? "border border-primary/20 bg-primary/10 text-primary"
                        : "border border-transparent text-white/65 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                  

                    <span className="text-sm">
                      {item.label}
                    </span>
                  </div>

                  <ChevronLeft
                    size={17}
                    className={`
                      transition-all
                      duration-300
                      ${
                        isActive(item.to)
                          ? "translate-x-0 text-primary"
                          : "-translate-x-1 text-white/20 group-hover:translate-x-0 group-hover:text-primary"
                      }
                    `}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}

            <Link
              to="/contact"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-primary
                px-5
                py-3.5
                text-sm
                font-bold
                text-secondary
                transition-all
                duration-300
                hover:brightness-110
              "
            >
              <span>درخواست مشاوره</span>

              <Send size={17} />
            </Link>
          </div>
        </div>
      </header>

      {/* ===================================================
          MAIN
      ==================================================== */}

      <main className="mt-[78px] flex-1">
        <Outlet />
      </main>

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <footer className="relative mt-24 overflow-hidden px-3 pb-3 sm:px-5 lg:px-8">
        {/* =================================================
            GOLD LINE
        ================================================== */}

        <div className="mx-auto h-[1px] max-w-7xl bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

        {/* =================================================
            GLASS CONTAINER
        ================================================== */}

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[30px]
            border
            border-white/10
            bg-secondary/75
            shadow-[0_25px_100px_rgba(0,0,0,.35)]
            backdrop-blur-2xl
            sm:rounded-[32px]
          "
        >
          {/* =================================================
              DECORATION
          ================================================== */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Gold Glow */}

            <div
              className="
                absolute
                -right-32
                -top-32
                h-80
                w-80
                rounded-full
                bg-primary/10
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-40
                -left-40
                h-96
                w-96
                rounded-full
                bg-primary/5
                blur-3xl
              "
            />

            {/* Circles */}

            <div
              className="
                absolute
                -right-24
                top-20
                h-72
                w-72
                rounded-full
                border
                border-primary/10
              "
            />

            <div
              className="
                absolute
                -bottom-32
                left-20
                h-64
                w-64
                rounded-full
                border
                border-white/5
              "
            />

            {/* Grid */}

            <div
              className="
                absolute
                inset-0
                opacity-[0.025]
                [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
                [background-size:50px_50px]
              "
            />
          </div>

          {/* =================================================
              FOOTER CONTENT
          ================================================== */}

          <div className="relative px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
            <div
              className="
                grid
                grid-cols-1
                gap-12
                lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]
                lg:items-center
                lg:gap-8
              "
            >
              {/* =================================================
                  QUICK LINKS
              ================================================== */}

              <div className="text-center lg:text-right">
                <span className="text-[9px] font-semibold tracking-[4px] text-primary/70">
                  NAVIGATION
                </span>

                <h3 className="mt-2 text-xl font-bold text-white">
                  دسترسی سریع
                </h3>

                <div className="mt-6 space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="
                        group
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-sm
                        text-white/50
                        transition-all
                        duration-300
                        lg:justify-start
                        hover:text-primary
                      "
                    >
                      <span
                        className="
                          h-[1px]
                          w-0
                          bg-primary
                          transition-all
                          duration-300
                          group-hover:w-4
                        "
                      />

                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* =================================================
                  SEPARATOR
              ================================================== */}

              <div className="hidden h-52 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:block" />

              {/* =================================================
                  BRAND
              ================================================== */}

              <div className="flex flex-col items-center text-center">
                <div
                  className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-6
                    py-5
                    shadow-inner
                    backdrop-blur-xl
                    sm:px-8
                    sm:py-6
                  "
                >
                  <img
                    src={farhidwood}
                    alt="FarhidWood"
                    className="
                      w-48
                      transition-all
                      duration-500
                      hover:scale-105
                      hover:drop-shadow-[0_0_30px_rgba(201,168,106,.35)]
                      sm:w-56
                      lg:w-60
                    "
                  />
                </div>

                <p
                  className="
                    mt-6
                    max-w-sm
                    text-sm
                    leading-8
                    text-white/45
                    
                  "
                >
                  خلق فضای ماندگار با تلفیق <span className="text-primary mx-1">هنر</span> و<span className="text-primary mx-1">صنعت چوب</span> 
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/30" />

                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(201,168,106,.5)]" />

                  <span className="h-px w-10 bg-primary/30" />
                </div>
              </div>

              {/* =================================================
                  SEPARATOR
              ================================================== */}

              <div className="hidden h-52 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:block" />

              {/* =================================================
                  CONTACT
              ================================================== */}

              <div className="text-center lg:text-right">
                <span className="text-[9px] font-semibold tracking-[4px] text-primary/70">
                  CONTACT
                </span>

                <h3 className="mt-2 text-xl font-bold text-white">
                  اطلاعات تماس
                </h3>

                <div className="mt-6 space-y-3">
                  {/* Email */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.025]
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-primary/20
                      hover:bg-primary/5
                    "
                    style={{ direction: "ltr" }}
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-primary/20
                        bg-primary/5
                      "
                    >
                      <Mail
                        size={17}
                        className="text-primary"
                      />
                    </div>

                    <span className="truncate text-xs text-white/55 sm:text-sm">
                      farhidwood@gmail.com
                    </span>
                  </div>

                  {/* Phone */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.025]
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-primary/20
                      hover:bg-primary/5
                    "
                    style={{ direction: "ltr" }}
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-primary/20
                        bg-primary/5
                      "
                    >
                      <Phone
                        size={17}
                        className="text-primary"
                      />
                    </div>

                    <span className="text-sm text-white/55">
                      09132300078
                    </span>
                  </div>

                  {/* Telegram */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.025]
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-primary/20
                      hover:bg-primary/5
                    "
                    style={{ direction: "ltr" }}
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-primary/20
                        bg-primary/5
                      "
                    >
                      <Send
                        size={17}
                        className="text-primary"
                      />
                    </div>

                    <span className="text-sm text-white/55">
                      @farhidwood-1
                    </span>
                  </div>

                  {/* Instagram */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/5
                      bg-white/[0.025]
                      px-4
                      py-3
                      transition-all
                      duration-300
                      hover:border-primary/20
                      hover:bg-primary/5
                    "
                    style={{ direction: "ltr" }}
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-primary/20
                        bg-primary/5
                      "
                    >
                      <img
                        src={instagram}
                        className="h-4 w-4"
                        alt="Instagram"
                      />
                    </div>

                    <span className="text-sm text-white/55">
                      farhidwood
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                BOTTOM
            ================================================== */}

            <div
              className="
                mt-12
                border-t
                border-white/10
                pt-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-between
                  gap-3
                  text-center
                  text-xs
                  text-white/30
                  md:flex-row
                  md:text-right
                "
              >
                <span>
                  © 2026 FarhidWood. تمامی حقوق محفوظ است.
                </span>

                <span>
                  Designed with
                  <span className="mx-1 text-primary">
                    ♥
                  </span>
                  by @valiuxSR
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NavFooter;