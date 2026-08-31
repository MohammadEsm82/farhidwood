import { useEffect, useState } from "react";


export default function LoadingScreen() {

  const [hide, setHide] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {

      setHide(true);

    }, 2200);

    return () => clearTimeout(timer);

  }, []);

  return (

    <div
      className={`
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      bg-secondary
      duration-1000
      ${
        hide
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }
      `}
    >

      <div className="text-center">

     

        <h2
          className="
          mt-8
          text-8xl
          font-bold
          text-white
          "
        >

          FARHIDWOOD

        </h2>

        <div
          className="
          mx-auto
          mt-8
          h-[3px]
          w-60
          overflow-hidden
          rounded-full
          bg-white/10
          "
        >

          <div
            className="
            h-full
            animate-[loading_2s_linear]
            bg-primary
            "
          />

        </div>

      </div>

    </div>

  );

}