import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function GalleryModal({
  isOpen,
  onClose,
  images,
  selectedIndex,
  setSelectedIndex,
}) {
  if (!isOpen) return null;

  const nextImage = () => {
    setSelectedIndex((prev) =>
      (prev + 1) % images.length
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/95
      backdrop-blur-lg
      "
    >
      {/* Close */}

      <button
        onClick={onClose}
        className="
        absolute
        right-8
        top-8
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-white/10
        text-white
        duration-300
        hover:bg-red-500
        hover:rotate-90
        "
      >
        <X />
      </button>

      {/* Prev */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        className="
        absolute
        left-8
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-black/40
        backdrop-blur-xl
        border
        border-white/10
        text-white
        duration-300
        hover:bg-primary
        hover:scale-110   
        "
      >
        <ChevronLeft />
      </button>

      {/* Next */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        className="
        absolute
        right-8
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-black/40
        backdrop-blur-xl
        border
        border-white/10
        text-white
        duration-300
        hover:bg-primary
        hover:scale-110 
        "
      >
        <ChevronRight />
      </button>
      <div
      className="
      absolute
      top-8
      left-1/2
      -translate-x-1/2
      rounded-full
      bg-black/40
      px-5
      py-2
      text-sm
      tracking-[3px]
      text-white
      backdrop-blur-md
      "
    >

PROJECT GALLERY

</div>

      {/* Image */}

      <img
        onClick={(e) => e.stopPropagation()}
        src={images[selectedIndex]}
        alt=""
        className="
          max-h-[85vh]
          max-w-[90vw]
          rounded-[32px]
          object-contain
          transition-all
          duration-500
          hover:scale-[1.02]
          "
         />
      {/* Thumbnails */}

<div
  className="
  absolute
  bottom-24
  left-1/2
  flex
  -translate-x-1/2
  gap-3
  rounded-full
  bg-black/40
  p-3
  backdrop-blur-xl
  "
>
  {images.map((image, index) => (
    <button
      key={index}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedIndex(index);
      }}
      className={`
      overflow-hidden
      rounded-xl
      border
      duration-300

      ${
        selectedIndex === index
          ? "border-primary scale-110"
          : "border-white/10 opacity-70 hover:opacity-100"
      }
      `}
    >
      <img
        src={image}
        alt=""
        className="
        h-16
        w-16
        object-cover
        "
      />
    </button>
  ))}
</div>

      {/* Counter */}

      <div
        className="
        absolute
        top-8
        right-28
        rounded-full
        bg-black/40
        px-5
        py-2
        text-white
        backdrop-blur
        "
      >
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}