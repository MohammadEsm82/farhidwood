import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import GalleryModal from "./GalleryModal";

export default function Gallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const selectedImage = images[selectedIndex];
  
  const nextImage = () => {
    setLoaded(false);
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLoaded(false);
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" && isFullscreen) {
        nextImage();
      }
      if (e.key === "ArrowLeft" && isFullscreen) {
        prevImage();
      }
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, isFullscreen]);

  return (
    <>
      <section className="bg-secondary py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[120px_1fr]">
          {/* Thumbnail */}
          <div className="order-2 flex gap-4 lg:order-1 lg:flex-col">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setLoaded(false);
                  setSelectedIndex(index);
                }}
                className={`
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  transition-all
                  duration-500
                  ${
                    selectedIndex === index
                      ? "border-primary ring-2 ring-primary scale-105"
                      : "border-white/10 opacity-70 hover:opacity-100 hover:-translate-y-1 hover:border-primary/40"
                  }
                `}
              >
                <img
                  src={image}
                  alt=""
                  className="h-24 w-24 object-cover duration-500 group-hover:scale-110"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative order-1 overflow-hidden rounded-[32px] lg:order-2">
            <div className="absolute top-5 right-5 z-20 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-md">
              {selectedIndex + 1} / {images.length}
            </div>

            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-5 left-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:bg-primary hover:border-primary"
            >
              <Expand size={20} />
            </button>

            {/* Previous */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary"
            >
              <ChevronRight size={24} />
            </button>

            <>
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-neutral-800" />
              )}

              <img
                src={selectedImage}
                alt=""
                onClick={() => setIsFullscreen(true)}
                style={{ cursor: "zoom-in" }}
                onLoad={() => setLoaded(true)}
                className={`
                  h-[650px]
                  w-full
                  object-cover
                  transition-all
                  duration-700
                  ease-out
                  hover:scale-[1.03]
                  ${
                    loaded
                      ? "opacity-100 scale-100 hover:scale-[1.03]"
                      : "opacity-0 scale-105"
                  }
                `}
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8">
                <h2 className="text-3xl font-bold text-white">Gallery</h2>
                
                <div className="mt-2 text-white/70">
                  مشاهده تصاویر پروژه
                  <div className="mt-3 text-sm tracking-[3px] text-primary">
                    {images.length} Photos
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </section>

      {/* ✅ GalleryModal داخل کامپوننت و با Fragment */}
      <GalleryModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </>
  );
}