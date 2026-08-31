import styles from "./ParallaxBG.module.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ParallaxBG = () => {
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(
    () => {
      const main = mainRef.current;

      // =========================
      // INITIAL STATE
      // =========================

      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
          buttonsRef.current,
          scrollRef.current,
        ],
        {
          opacity: 0,
        }
      );

      gsap.set(titleRef.current, {
        y: 80,
      });

      gsap.set(subtitleRef.current, {
        y: 60,
      });

      gsap.set(descriptionRef.current, {
        y: 40,
      });

      gsap.set(buttonsRef.current, {
        y: 30,
      });

      gsap.set(scrollRef.current, {
        y: 20,
      });

      // =========================
      // HERO ENTRANCE
      // =========================

      const intro = gsap.timeline({
        delay: 0.2,
      });

      intro
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
        })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.65"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // =========================
      // IMAGE PARALLAX
      // =========================

      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.12,
          yPercent: -5,
        },
        {
          scale: 1,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: main,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // =========================
      // CONTENT PARALLAX
      // =========================

      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: main,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // =========================
      // SCROLL INDICATOR
      // =========================

      gsap.to(scrollRef.current, {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut",
      });
    },
    { scope: mainRef }
  );

  return (
    <section
      ref={mainRef}
      className={styles.main}
    >
      {/* =========================
          BACKGROUND
      ========================= */}

      <div
        ref={imageRef}
        className={styles.background}
      />

      {/* =========================
          DARK OVERLAY
      ========================= */}

      <div className={styles.overlay} />

      {/* =========================
          GOLDEN LIGHT
      ========================= */}

      <div className={styles.goldGlow} />

      <div className={styles.goldGlowSecond} />

      {/* =========================
          CONTENT
      ========================= */}

      <div
        ref={contentRef}
        className={styles.content}
      >
        <div className={styles.textWrapper}>

          {/* Small Label */}

          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>FARHIDWOOD</span>
            <span className={styles.labelLine} />
          </div>

          {/* Main Title */}

          <h1
            ref={titleRef}
            className={styles.title}
          >
            خلق فضاهایی
          </h1>

          {/* Subtitle */}

          <h2
            ref={subtitleRef}
            className={styles.subtitle}
          >
            که ماندگار می‌مانند
          </h2>

          {/* Description */}

          <p
            ref={descriptionRef}
            className={styles.description}
          >
            طراحی، تولید و اجرای تخصصی دکوراسیون داخلی
            <br />

            با استفاده از پیشرفته‌ترین ماشین‌آلات CNC
            <br />

            و متریال‌های باکیفیت
          </p>

          {/* Buttons */}

          <div
            ref={buttonsRef}
            className={styles.buttons}
          >
            <Link
              to="/portfolio"
              className={styles.primaryButton}
            >
              <span>
                مشاهده نمونه‌کارها
              </span>

              <ArrowLeft size={20} />

            </Link>

            <Link
              to="/contact"
              className={styles.secondaryButton}
            >
              مشاوره و همکاری
            </Link>
          </div>

        </div>
      </div>

      {/* =========================
          SCROLL DOWN
      ========================= */}

      <div
        ref={scrollRef}
        className={styles.scroll}
      >
        <span>
          SCROLL
        </span>

        <ArrowDown size={18} />

      </div>

    </section>
  );
};

export default ParallaxBG;