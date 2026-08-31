import show from "../assets/picture/show.webp";
import Showroom360 from "../components/showroom/Showroom360";


import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Maximize2,
  Ruler,
  Headphones,
  Award,
  Car,
  Coffee,
  Layers3,
  Move3D,
} from "lucide-react";

import siteConfig from "../config/siteConfig";
import { Link } from "react-router-dom";

export default function ShowRoom() {
  const [activeImage, setActiveImage] = useState(0);

  const gallery = [
    {
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&auto=format&fit=crop&q=85",
      title: "فضای اصلی شوروم",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&auto=format&fit=crop&q=85",
      title: "آشپزخانه مدرن",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1600&auto=format&fit=crop&q=85",
      title: "فضای نمایش محصولات",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&auto=format&fit=crop&q=85",
      title: "طراحی داخلی",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&auto=format&fit=crop&q=85",
      title: "جزئیات اجرا",
    },
  ];

  const features = [
    {
      icon: Award,
      title: "کیفیت برتر",
      desc: "استفاده از بهترین متریال و یراق‌آلات",
    },
    {
      icon: Ruler,
      title: "طراحی اختصاصی",
      desc: "مشاوره و طراحی متناسب با فضای شما",
    },
    {
      icon: Headphones,
      title: "پشتیبانی حرفه‌ای",
      desc: "همراه شما در تمام مراحل پروژه",
    },
    {
      icon: Move3D,
      title: "تور 360 درجه",
      desc: "بازدید مجازی از فضای شوروم",
    },
    {
      icon: Car,
      title: "پارکینگ اختصاصی",
      desc: "فضای مناسب برای مراجعه حضوری",
    },
    {
      icon: Coffee,
      title: "پذیرایی از مشتریان",
      desc: "فضایی آرام برای بررسی و انتخاب",
    },
  ];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const mapsUrl =
    siteConfig.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      siteConfig.address
    )}`;

  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.address
  )}&output=embed`;

  return (
    <main className="overflow-hidden bg-secondary text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[90vh] overflow-hidden">

        {/* Hero Image */}

        <img
          src={show}
          alt="شوروم فرهید وود"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Dark Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/90
            via-black/65
            to-black/20
          "
        />

        {/* Gold Glow */}

        <div
          className="
            absolute
            -left-32
            top-32
            h-[450px]
            w-[450px]
            rounded-full
            bg-primary/20
            blur-[170px]
          "
        />

        {/* Hero Content */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[90vh]
            max-w-7xl
            items-center
            px-6
            py-32
          "
        >

          <div className="max-w-3xl">

            <div className="flex items-center gap-4">

              <span className="h-px w-12 bg-primary" />

              <span
                className="
                  text-sm
                  uppercase
                  tracking-[6px]
                  text-primary
                "
              >
                SHOWROOM
              </span>

            </div>

            <h1
              className="
                mt-7
                text-5xl
                font-black
                leading-[1.15]
                sm:text-6xl
                lg:text-8xl
              "
            >
              شوروم ما
              <br />
              <span className="text-white">
                تجربه لمس کیفیت
              </span>
            </h1>

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                leading-8
                text-white/70
                sm:text-lg
              "
            >
              از نزدیک با متریال‌ها، طراحی‌ها و نمونه‌کارهای
              اجرا شده آشنا شوید و بهترین انتخاب را برای فضای
              خود داشته باشید.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">

              <a
                href="#showroom-tour"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-primary
                  px-8
                  py-4
                  font-bold
                  text-black
                  transition-all
                  duration-500
                  hover:scale-105
                "
              >
                مشاهده شوروم

                <Move3D
                  size={20}
                  className="transition-transform duration-500 group-hover:rotate-12"
                />
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-white/30
                  bg-black/20
                  px-8
                  py-4
                  font-medium
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-500
                  hover:border-primary
                  hover:bg-primary
                  hover:text-black
                "
              >
                تماس با ما

                <Phone size={19} />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Scroll */}

        <div
          className="
            absolute
            bottom-8
            left-1/2
            z-20
            hidden
            -translate-x-1/2
            flex-col
            items-center
            gap-3
            md:flex
          "
        >
          <span className="text-[10px] tracking-[4px] text-white/50">
            SCROLL
          </span>

          <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>

      </section>


      {/* =====================================================
          ABOUT SHOWROOM
      ===================================================== */}

      <section className="relative py-28 lg:py-36">

        <div
          className="
            absolute
            right-0
            top-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-primary/10
            blur-[180px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-7xl
            items-center
            gap-16
            px-6
            lg:grid-cols-2
          "
        >

          {/* Text */}

          <div>

            <span className="text-sm uppercase tracking-[5px] text-primary">
              ABOUT OUR SHOWROOM
            </span>

            <h2
              className="
                mt-5
                text-4xl
                font-black
                leading-tight
                sm:text-5xl
              "
            >
              فضایی برای
              <br />
              <span className="text-primary leading-snug mr-10">
                الهام گرفتن
              </span>
            </h2>

            <p className="mt-8 leading-9 text-white/60">
              شوروم فرهید وود فضایی برای لمس واقعی کیفیت،
              مشاهده جزئیات و انتخاب آگاهانه است. در این فضا
              می‌توانید متریال‌ها، رنگ‌ها، سبک‌های مختلف و
              نمونه‌کارهای اجرا شده را از نزدیک مشاهده کنید.
            </p>

            <p className="mt-5 leading-9 text-white/60">
              هدف ما این است که قبل از شروع پروژه، تصویری
              واقعی از نتیجه نهایی در اختیار شما قرار دهیم.
            </p>

            {/* Mini Stats */}

            <div className="mt-12 grid grid-cols-3 gap-5 border-t border-white/10 pt-8">

              <div>
                <div className="text-3xl font-black text-primary">
                  ۲۰+
                </div>

                <span className="mt-2 block text-sm text-white/50">
                  سال تجربه
                </span>
              </div>

              <div>
                <div className="text-3xl font-black text-primary">
                  ۱۰۰۰+
                </div>

                <span className="mt-2 block text-sm text-white/50">
                  پروژه اجرا شده
                </span>
              </div>

              <div>
                <div className="text-3xl font-black text-primary">
                  360°
                </div>

                <span className="mt-2 block text-sm text-white/50">
                  بازدید مجازی
                </span>
              </div>

            </div>

          </div>


          {/* Image */}

          <div className="relative">

            <div
              className="
                absolute
                -inset-4
                rounded-[40px]
                border
                border-primary/20
              "
            />

            <img
              src={gallery[0].image}
              alt="فضای شوروم"
              className="
                relative
                h-[500px]
                w-full
                rounded-[34px]
                object-cover
                lg:h-[600px]
              "
            />

            <div
              className="
                absolute
                bottom-6
                right-6
                rounded-2xl
                border
                border-white/10
                bg-black/60
                px-6
                py-4
                backdrop-blur-xl
              "
            >
              <span className="block text-xs text-white/50">
                SHOWROOM
              </span>

              <span className="mt-1 block text-lg font-bold">
                فضای نمایش محصولات
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section className="relative py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <span className="text-sm uppercase tracking-[5px] text-primary">
                SHOWROOM GALLERY
              </span>

              <h2 className="mt-5 text-4xl font-black sm:text-5xl">
                گالری تصاویر شوروم
              </h2>

            </div>

            <span className="text-sm text-white/40">
              {activeImage + 1} / {gallery.length}
            </span>

          </div>


          {/* Main Gallery */}

          <div className="relative mt-16 overflow-hidden rounded-[36px] border border-white/10">

            <img
              src={gallery[activeImage].image}
              alt={gallery[activeImage].title}
              className="
                h-[450px]
                w-full
                object-cover
                transition-all
                duration-700
                sm:h-[600px]
                lg:h-[700px]
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">

              <span className="text-sm uppercase tracking-[4px] text-primary">
                0{activeImage + 1}
              </span>

              <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {gallery[activeImage].title}
              </h3>

            </div>


            {/* Previous */}

            <button
              onClick={prevImage}
              aria-label="تصویر قبلی"
              className="
                absolute
                left-5
                top-1/2
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/50
                text-white
                backdrop-blur-xl
                transition-all
                hover:border-primary
                hover:bg-primary
                hover:text-black
                sm:left-8
                sm:h-14
                sm:w-14
              "
            >
              <ArrowLeft size={22} />
            </button>


            {/* Next */}

            <button
              onClick={nextImage}
              aria-label="تصویر بعدی"
              className="
                absolute
                right-5
                top-1/2
                flex
                h-12
                w-12
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/50
                text-white
                backdrop-blur-xl
                transition-all
                hover:border-primary
                hover:bg-primary
                hover:text-black
                sm:right-8
                sm:h-14
                sm:w-14
              "
            >
              <ArrowRight size={22} />
            </button>

          </div>


          {/* Thumbnails */}

          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">

            {gallery.map((item, index) => (

              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  transition-all
                  duration-500
                  ${
                    activeImage === index
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-white/10 opacity-60 hover:border-primary/50 hover:opacity-100"
                  }
                `}
              >

                <img
                  src={item.image}
                  alt=""
                  className="
                    h-24
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    sm:h-32
                  "
                />

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="relative py-28">

        <div
          className="
            absolute
            left-0
            top-0
            h-full
            w-full
            bg-gradient-to-b
            from-transparent
            via-primary/[0.02]
            to-transparent
          "
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="text-sm uppercase tracking-[5px] text-primary">
              SHOWROOM FEATURES
            </span>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              امکانات شوروم
            </h2>

          </div>


          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {features.map((feature) => {

              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    group
                    rounded-[30px]
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-8
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-primary/60
                    hover:bg-white/[0.05]
                  "
                >

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                      transition-all
                      duration-500
                      group-hover:bg-primary
                      group-hover:text-black
                    "
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-7 text-2xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-8 text-white/50">
                    {feature.desc}
                  </p>

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          360 TOUR
      ===================================================== */}
        <div id="showroom-tour">
          <Showroom360 />
        </div>

      {/* =====================================================
          MAP + CONTACT
      ===================================================== */}

      <section className="relative py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid overflow-hidden rounded-[36px] border border-white/10 lg:grid-cols-[1.3fr_0.7fr]">

            {/* Map */}

            <div className="relative min-h-[450px]">

              <iframe
                title="موقعیت شوروم"
                src={mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.5]"
                loading="lazy"
                allowFullScreen
              />

              <div className="pointer-events-none absolute inset-0 bg-primary/5" />

            </div>


            {/* Contact */}

            <div className="bg-black/30 p-8 sm:p-12 lg:p-14">

              <span className="text-sm uppercase tracking-[5px] text-primary">
                VISIT US
              </span>

              <h2 className="mt-5 text-4xl font-black">
                آدرس شوروم
              </h2>

              <div className="mt-10 space-y-8">

                {/* Address */}

                <Link to={"https://neshan.org/maps/places/rbZ9_3Ox9VoC"} className="flex gap-5 hover:text-primary">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin size={22} />
                  </div>

                  <div>
                    

                    <h3 className="font-bold">
                      آدرس
                    </h3>

                    <p className="mt-2 leading-7 text-white/50 hover:text-primary">
                      {siteConfig.address}
                    </p>

                  </div>

                </Link>


                {/* Working Hours */}

                <div className="flex gap-5">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock size={22} />
                  </div>

                  <div>

                    <h3 className="font-bold">
                      ساعات کاری
                    </h3>

                    <p className="mt-2 leading-7 text-white/50">
                      {siteConfig.workingHours}
                    </p>

                  </div>

                </div>


                {/* Phone */}

                <Link to={`tel:${siteConfig.phone}`} className="flex gap-5 group-hover:rotate-45 group-hover:text-primary">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone size={22} />
                  </div>

                  <div>

                    <h3 className="font-bold hover:text-primary">
                      تماس
                    </h3>

                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="mt-2 block text-white/50 transition-colors hover:text-primary"
                    >
                      {siteConfig.phone}
                    </a>

                  </div>

                </Link>

              </div>


              {/* Buttons */}

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-primary
                    px-6
                    py-4
                    font-bold
                    text-black
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                  "
                >
                  مسیریابی

                  <Navigation size={18} />
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    border
                    border-white/20
                    px-6
                    py-4
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:border-primary
                    hover:bg-primary
                    hover:text-black
                  "
                >
                  تماس با ما

                  <Phone size={18} />
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden py-32">

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary/10
            blur-[180px]
          "
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

          <span className="text-sm uppercase tracking-[5px] text-primary">
            LET'S MEET
          </span>

          <h2 className="mt-6 text-4xl font-black sm:text-6xl">
            از نزدیک ببینید،
            <br />
            <span className="text-primary">
              بهتر انتخاب کنید.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl leading-8 text-white/50">
            برای مشاهده متریال‌ها، دریافت مشاوره و بررسی
            نمونه‌کارها به شوروم ما سر بزنید.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-primary
                px-8
                py-4
                font-bold
                text-black
                transition-all
                duration-300
                hover:scale-105
              "
            >
              مسیر شوروم

              <Navigation size={19} />
            </a>

            <a
              href="/contact"
              className="
                flex
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-white/20
                px-8
                py-4
                text-white
                transition-all
                duration-300
                hover:border-primary
                hover:bg-primary
                hover:text-black
              "
            >
              درخواست مشاوره

              <ArrowUpRight size={19} />
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}