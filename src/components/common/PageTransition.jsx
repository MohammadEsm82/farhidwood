import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition() {
  const overlayRef = useRef(null);
  const loaderRef = useRef(null);

  const location = useLocation();

  const previousPath = useRef(location.pathname);

  useEffect(() => {
    // اگر مسیر تغییر نکرده، هیچ کاری نکن
    if (previousPath.current === location.pathname) {
      return;
    }

    previousPath.current = location.pathname;

    const overlay = overlayRef.current;
    const loader = loaderRef.current;

    if (!overlay || !loader) return;

    const tl = gsap.timeline();

    gsap.set(overlay, {
      display: "flex",
      yPercent: 0,
      pointerEvents: "auto",
    });

    gsap.set(loader, {
      opacity: 1,
      scale: 1,
      y: 0,
    });

    tl.to(loader, {
      y: -220,
      scale: 0.2,
      opacity: 0,
      duration: 0.3,
      ease: "power4.in",
    })

      .to(
        overlay,
        {
          yPercent: -100,
          duration: 0.3,
          ease: "power4.inOut",
        },
        "-=0.05"
      )

      .set(overlay, {
        display: "none",
        pointerEvents: "none",
      });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      className="
        fixed
        inset-0
        z-[99998]
        hidden
        items-center
        justify-center
        bg-secondary
      "
    >
      <div
        ref={loaderRef}
        className="
          relative
          h-14
          w-14
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-full
            border
            border-primary/20
          "
        />

        <div
          className="
            absolute
            inset-0
            animate-spin
            rounded-full
            border-2
            border-transparent
            border-t-primary
            border-r-primary/40
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-2.5
            w-2.5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary
            shadow-[0_0_20px_rgba(255,190,80,0.8)]
          "
        />
      </div>
    </div>
  );
}