import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress / 100})`;
      }

      animationFrame.current = null;
    };

    const handleScroll = () => {
      if (!animationFrame.current) {
        animationFrame.current =
          requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9998]
        h-[3px]
        w-full
        overflow-hidden
        bg-transparent
      "
    >
      <div
        ref={progressRef}
        className="
          h-full
          w-full
          origin-left
          bg-primary
          will-change-transform
        "
      />
    </div>
  );
}