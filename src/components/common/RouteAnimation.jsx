import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function RouteAnimation({ children }) {
  const container = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, [location.pathname]);

  return (
    <div ref={container}>
      {children}
    </div>
  );
}