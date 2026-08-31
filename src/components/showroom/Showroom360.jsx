import { useState } from "react";
import { Maximize2, X, Move3D } from "lucide-react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import pana from "../../assets/picture/pana.webp"

export default function Showroom360() {
  const [fullscreen, setFullscreen] = useState(false);

  const panorama = pana;

  return (
    <>
      {/* =========================
          360 PREVIEW
      ========================= */}

      <section className="relative py-28 lg:py-36">

        <div className="mx-auto max-w-7xl px-6">

          <div
            className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-primary/20
            bg-black
            "
          >

            {/* Header */}

            <div
              className="
              absolute
              left-0
              right-0
              top-0
              z-20
              flex
              items-center
              justify-between
              bg-gradient-to-b
              from-black/80
              to-transparent
              p-6
              sm:p-8
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-primary/40
                  bg-black/40
                  text-primary
                  backdrop-blur-md
                  "
                >
                  <Move3D size={21} />
                </div>

                <div>

                  <span className="block text-xs uppercase tracking-[4px] text-primary">
                    VIRTUAL TOUR
                  </span>

                  <span className="mt-1 block text-sm font-bold text-white">
                    نمای ۳۶۰ درجه شوروم
                  </span>

                </div>

              </div>


              <button
                onClick={() => setFullscreen(true)}
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/40
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-primary
                hover:bg-primary
                hover:text-black
                "
                aria-label="تمام صفحه"
              >
                <Maximize2 size={19} />
              </button>

            </div>


            {/* Viewer */}

            <div className="h-[450px] sm:h-[550px] lg:h-[650px]">

              <ReactPhotoSphereViewer
                src={panorama}
                height="100%"
                width="100%"
                navbar={[
                  "autorotate",
                  "zoom",
                  "fullscreen",
                ]}
                defaultZoomLvl={0}
                defaultPitch={0}
                moveInertia={true}
                mousewheel={true}
                mousemove={true}
              />

            </div>


            {/* Bottom Hint */}

            <div
              className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              right-0
              z-10
              flex
              justify-center
              bg-gradient-to-t
              from-black/70
              to-transparent
              px-6
              pb-7
              pt-16
              "
            >

              <div
                className="
                rounded-full
                border
                border-white/10
                bg-black/40
                px-5
                py-2.5
                text-xs
                text-white/60
                backdrop-blur-md
                "
              >
                برای مشاهده محیط، تصویر را با موس بکشید
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FULLSCREEN
      ========================= */}

      {fullscreen && (

        <div
          className="
          fixed
          inset-0
          z-[99999]
          bg-black
          "
        >

          {/* Close */}

          <button
            onClick={() => setFullscreen(false)}
            className="
            absolute
            right-6
            top-6
            z-[100]
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/60
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-primary
            hover:bg-primary
            hover:text-black
            "
            aria-label="بستن"
          >
            <X size={22} />
          </button>


          {/* Title */}

          <div
            className="
            absolute
            left-6
            top-6
            z-[100]
            "
          >

            <span className="text-xs uppercase tracking-[5px] text-primary">
              FARHIDWOOD
            </span>

            <h3 className="mt-2 text-xl font-bold text-white">
              تور مجازی شوروم
            </h3>

          </div>


          {/* Fullscreen Viewer */}

          <ReactPhotoSphereViewer
            src={panorama}
            height="100vh"
            width="100%"
            navbar={[
              "autorotate",
              "zoom",
              "fullscreen",
            ]}
            defaultZoomLvl={0}
            defaultPitch={0}
            moveInertia={true}
            mousewheel={true}
            mousemove={true}
          />

        </div>

      )}

    </>
  );
}