import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Video,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function AdminProjectCard({
  project,
  onDelete,
}) {
  if (!project) return null;

  const {
    _id,
    id,
    slug,
    title,
    hero,
    city,
    year,
    category,
    images = [],
    video,
  } = project;

  // =====================================================
  // PROJECT ID
  // =====================================================

  const projectId = _id || id;

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = () => {
    if (!projectId) {
      console.error(
        "DELETE ERROR: Project ID is missing"
      );

      return;
    }

    const confirmed = window.confirm(
      `آیا از حذف پروژه «${title || "بدون عنوان"}» مطمئن هستید؟`
    );

    if (!confirmed) return;

    onDelete(projectId);
  };

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[#111]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-[0_25px_80px_rgba(0,0,0,.35)]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative h-[240px] overflow-hidden">
        {hero ? (
          <img
            src={hero}
            alt={title || "پروژه"}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-white/5
              text-white/30
            "
          >
            <ImageIcon size={42} />
          </div>
        )}

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/10
            to-transparent
          "
        />

        {/* Category */}

        {category && (
          <span
            className="
              absolute
              right-5
              top-5
              rounded-full
              border
              border-primary/30
              bg-black/50
              px-4
              py-2
              text-xs
              text-primary
              backdrop-blur-md
            "
          >
            {category}
          </span>
        )}

        {/* Media Badges */}

        <div
          className="
            absolute
            bottom-5
            left-5
            flex
            items-center
            gap-2
          "
        >
          {images.length > 0 && (
            <span
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                bg-black/60
                px-3
                py-1.5
                text-xs
                text-white
                backdrop-blur-md
              "
            >
              <ImageIcon size={14} />

              {images.length}
            </span>
          )}

          {video && (
            <span
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                bg-black/60
                px-3
                py-1.5
                text-xs
                text-white
                backdrop-blur-md
              "
            >
              <Video size={14} />

              ویدیو
            </span>
          )}
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="p-6">
        {/* Title */}

        <div className="mb-5">
          <h3
            className="
              line-clamp-1
              text-xl
              font-bold
              text-white
            "
          >
            {title || "بدون عنوان"}
          </h3>

          {slug && (
            <p
              dir="ltr"
              className="
                mt-2
                truncate
                text-left
                text-xs
                text-white/30
              "
            >
              /{slug}
            </p>
          )}
        </div>

        {/* =====================================================
            META
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            border-y
            border-white/10
            py-4
          "
        >
          {city && (
            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-white/50
              "
            >
              <MapPin
                size={15}
                className="shrink-0 text-primary"
              />

              <span className="truncate">
                {city}
              </span>
            </div>
          )}

          {year && (
            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-white/50
              "
            >
              <CalendarDays
                size={15}
                className="shrink-0 text-primary"
              />

              <span>{year}</span>
            </div>
          )}
        </div>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="mt-5 grid grid-cols-3 gap-2">
          {/* VIEW */}

          <Link
            to={`/portfolio/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-3
              py-3
              text-xs
              text-white/70
              transition
              hover:border-primary/40
              hover:bg-primary/10
              hover:text-primary
            "
          >
            <ArrowUpRight size={16} />

            <span className="hidden sm:inline">
              مشاهده
            </span>
          </Link>

          {/* =================================================
              EDIT
              با MongoDB _id
          ================================================= */}

          <Link
            to={`/admin/projects/edit/${projectId}`}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-primary/20
              bg-primary/5
              px-3
              py-3
              text-xs
              text-primary
              transition
              hover:bg-primary
              hover:text-black
            "
          >
            <Edit3 size={16} />

            <span className="hidden sm:inline">
              ویرایش
            </span>
          </Link>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-500/20
              bg-red-500/5
              px-3
              py-3
              text-xs
              text-red-400
              transition
              hover:bg-red-500
              hover:text-white
            "
          >
            <Trash2 size={16} />

            <span className="hidden sm:inline">
              حذف
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}