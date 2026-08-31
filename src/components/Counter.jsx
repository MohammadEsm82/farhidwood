import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Counter({
  value,
  suffix = "",
  className = "",
}) {
  const counterRef = useRef(null);

  const toPersianNumber = (number) => {
    return number
      .toLocaleString("en-US")
      .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit])
      .replace(/,/g, "٬");
  };

  useGSAP(() => {
    const counter = {
      value: 0,
    };

    gsap.to(counter, {
      value,
      duration: 2,
      ease: "power3.out",

      scrollTrigger: {
        trigger: counterRef.current,

        start: "top 85%",

        toggleActions: "play none none none",

        once: true,
      },

      onUpdate: () => {
        if (!counterRef.current) return;

        counterRef.current.textContent =
          toPersianNumber(Math.floor(counter.value)) + suffix;
      },

      onComplete: () => {
        if (!counterRef.current) return;

        counterRef.current.textContent =
          toPersianNumber(value) + suffix;
      },
    });
  }, [value]);

  return (
    <span
      ref={counterRef}
      className={className}
      dir="rtl"
    >
      {toPersianNumber(0)}
      {suffix}
    </span>
  );
}