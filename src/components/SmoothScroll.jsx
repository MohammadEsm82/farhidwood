import Lenis from "lenis";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrame;

    function raf(time) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    // رفتن به ابتدای صفحه هنگام تغییر Route
    lenis.scrollTo(0, {
      immediate: true,
    });

    window.scrollTo(0, 0);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}