import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Upload,
  X,
  Image as ImageIcon,
  Video,
  Loader2,
} from "lucide-react";

import { API_URL } from "../../config/api";

export default function AddProject() {
  const navigate = useNavigate();

  // =========================================
  // Form
  // =========================================

  const [form, setForm] = useState({
    title: "",
    slug: "",
    style: "Modern",
    city: "",
    year: "",
    area: "",
    duration: "",
    category: "کابینت",
    materials: "",
    description: "",
    layout: "large",
  });

  // =========================================
  // Files
  // =========================================

  const [hero, setHero] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [video, setVideo] = useState(null);

  // =========================================
  // UI
  // =========================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================
  // Text Inputs
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // Hero Upload
  // =========================================

  const handleHeroChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("فایل تصویر اصلی باید یک تصویر باشد.");
      return;
    }

    setError("");
    setHero(file);

    // اجازه انتخاب دوباره همان فایل
    e.target.value = "";
  };

  // =========================================
  // Remove Hero
  // =========================================

  const removeHero = () => {
    setHero(null);
  };

  // =========================================
  // Gallery Upload
  // =========================================

  const handleGalleryChange = (e) => {
  const files = Array.from(e.target.files || []);

  if (!files.length) return;

  setGallery((prev) => [
    ...prev,
    ...files,
  ]);

  e.target.value = "";
};

  // =========================================
  // Remove Gallery Image
  // =========================================
const removeGalleryImage = (index) => {
  setGallery((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

  // =========================================
  // Video Upload
  // =========================================

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("فایل ویدئو باید یک فایل ویدئویی باشد.");
      return;
    }

    setError("");
    setVideo(file);

    e.target.value = "";
  };

  // =========================================
  // Remove Video
  // =========================================

  const removeVideo = () => {
    setVideo(null);
  };

  // =========================================
  // Submit
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------------------
    // Validation
    // -----------------------------------------

    if (!form.title.trim()) {
      setError("عنوان پروژه را وارد کنید.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Slug پروژه را وارد کنید.");
      return;
    }

    if (!hero) {
      setError("لطفاً تصویر اصلی پروژه را انتخاب کنید.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // =======================================
      // Project Information
      // =======================================

      data.append("title", form.title.trim());
      data.append("slug", form.slug.trim());
      data.append("style", form.style);
      data.append("city", form.city.trim());
      data.append("year", form.year.trim());
      data.append("area", form.area.trim());
      data.append("duration", form.duration.trim());
      data.append("category", form.category);
      data.append("description", form.description.trim());
      data.append("layout", form.layout);

      // =======================================
      // Materials
      // =======================================

      data.append("materials", form.materials);

      // =======================================
      // Hero
      // =======================================

      data.append("hero", hero);

      // =======================================
      // Gallery
      //
      // مهم:
      // Backend با upload.fields({
      //   name: "images"
      // })
      // کار می‌کند.
      //
      // بنابراین باید "images" بفرستیم
      // نه "gallery"
      // =======================================

     gallery.forEach((image) => {
      data.append("images", image);
      });

      // =======================================
      // Video
      // =======================================

      if (video) {
        data.append("video", video);
      }

      // =======================================
      // API
      // =======================================

      const response = await fetch(
        `${API_URL}/projects`,
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );

      // =======================================
      // Safe JSON Response
      // =======================================

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "پاسخ نامعتبر از سرور دریافت شد."
        );
      }

      // =======================================
      // Error From Backend
      // =======================================

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            "خطا در ایجاد پروژه."
        );
      }

      // =======================================
      // Success
      // =======================================

      setSuccess(
        "پروژه با موفقیت ایجاد شد."
      );

      // کمی صبر می‌کنیم تا پیام موفقیت دیده شود
      setTimeout(() => {
        navigate("/admin/projects");
      }, 700);

    } catch (err) {
      console.error(
        "CREATE PROJECT ERROR:",
        err
      );

      setError(
        err.message ||
          "خطایی در ایجاد پروژه رخ داد."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-[#0b0b0b]
        px-4
        py-10
        text-white
        sm:px-6
        lg:px-10
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* =====================================
            Header
        ====================================== */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h1 className="text-3xl font-bold">
              افزودن پروژه
            </h1>

            <p className="mt-2 text-white/50">
              ایجاد پروژه جدید برای پورتفولیو
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/admin/projects")
            }
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              px-5
              py-3
              text-white/70
              transition
              hover:border-primary
              hover:text-primary
            "
          >
            <ArrowRight size={18} />

            بازگشت
          </button>
        </div>

        {/* =====================================
            Error
        ====================================== */}

        {error && (
          <div
            className="
              mb-8
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-5
              py-4
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* =====================================
            Success
        ====================================== */}

        {success && (
          <div
            className="
              mb-8
              rounded-2xl
              border
              border-green-500/20
              bg-green-500/10
              px-5
              py-4
              text-green-400
            "
          >
            {success}
          </div>
        )}

        {/* =====================================
            Form
        ====================================== */}

        <form onSubmit={handleSubmit}>

          <div
            className="
              grid
              gap-8
              lg:grid-cols-3
            "
          >

            {/* =================================
                Main Information
            ================================= */}

            <div
              className="
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.03]
                p-6
                lg:col-span-2
              "
            >

              <h2 className="mb-6 text-xl font-bold">
                اطلاعات پروژه
              </h2>

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >

                <Input
                  label="عنوان پروژه"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="آشپزخانه مدرن"
                />

                <Input
                  label="Slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="modern-kitchen"
                  dir="ltr"
                />

                <Input
                  label="شهر"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="اصفهان"
                />

                <Input
                  label="سال"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="۱۴۰۵"
                />

                <Input
                  label="متراژ"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="۱۸۰ متر مربع"
                />

                <Input
                  label="مدت اجرا"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="۴۵ روز"
                />

                {/* Category */}

                <Select
                  label="دسته‌بندی"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={[
                    "کابینت",
                    "کلوزت",
                    "دکوراسیون",
                    "درب",
                    "دیوارکوب",
                  ]}
                />

                {/* Style */}

                <Select
                  label="سبک"
                  name="style"
                  value={form.style}
                  onChange={handleChange}
                  options={[
                    "Modern",
                    "Luxury",
                    "Classic",
                    "Minimal",
                  ]}
                />

                {/* Layout */}

                <Select
                  label="نوع نمایش"
                  name="layout"
                  value={form.layout}
                  onChange={handleChange}
                  options={[
                    "large",
                    "wide",
                    "tall",
                    "small",
                  ]}
                />

              </div>

              {/* =================================
                  Materials
              ================================= */}

              <div className="mt-5">

                <label className="mb-2 block text-sm text-white/70">
                  متریال‌ها
                </label>

                <input
                  type="text"
                  name="materials"
                  value={form.materials}
                  onChange={handleChange}
                  placeholder="MDF, High Gloss, Polyurethane"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/30
                    px-5
                    py-4
                    text-white
                    outline-none
                    transition
                    focus:border-primary
                  "
                />

                <p className="mt-2 text-xs text-white/30">
                  متریال‌ها را با کاما جدا کنید.
                </p>

              </div>

              {/* =================================
                  Description
              ================================= */}

              <div className="mt-5">

                <label className="mb-2 block text-sm text-white/70">
                  توضیحات پروژه
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="توضیحات پروژه را وارد کنید..."
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/30
                    px-5
                    py-4
                    text-white
                    outline-none
                    transition
                    focus:border-primary
                  "
                />

              </div>

            </div>

            {/* =================================
                Uploads
            ================================= */}

            <div className="space-y-8">

              {/* =================================
                  Hero
              ================================= */}

              <UploadBox
                title="تصویر اصلی پروژه"
                icon={<ImageIcon size={25} />}
                accept="image/*"
                onChange={handleHeroChange}
              />

              {hero && (
                <div className="relative overflow-hidden rounded-2xl">

                  <img
                    src={URL.createObjectURL(hero)}
                    alt="پیش‌نمایش تصویر اصلی"
                    className="
                      h-48
                      w-full
                      object-cover
                    "
                  />

                  <button
                    type="button"
                    onClick={removeHero}
                    className="
                      absolute
                      right-3
                      top-3
                      rounded-full
                      bg-black/70
                      p-2
                      text-white
                      transition
                      hover:bg-red-500
                    "
                  >
                    <X size={18} />
                  </button>

                </div>
              )}

              {/* =================================
                  Gallery
              ================================= */}

              <div
                className="
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                "
              >

                <div className="mb-4 flex items-center gap-3">

                  <ImageIcon
                    size={22}
                    className="text-primary"
                  />

                  <h3 className="font-bold">
                    تصاویر گالری
                  </h3>

                </div>

                <label
                  className="
                    flex
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-white/20
                    bg-black/20
                    p-8
                    text-center
                    transition
                    hover:border-primary
                  "
                >

                  <Upload
                    size={28}
                    className="mb-3 text-primary"
                  />

                  <span className="text-sm text-white/60">
                    انتخاب تصاویر
                  </span>

                  <span className="mt-2 text-xs text-white/30">
                    امکان انتخاب چند تصویر وجود دارد
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryChange}
                    className="hidden"
                  />

                </label>

                {gallery.length > 0 && (
                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >

                    {gallery.map(
                      (image, index) => (
                        <div
                          key={`${image.name}-${image.lastModified}-${index}`}
                          className="
                            group
                            relative
                            overflow-hidden
                            rounded-xl
                          "
                        >

                          <img
                            src={URL.createObjectURL(
                              image
                            )}
                            alt={`تصویر گالری ${index + 1}`}
                            className="
                              h-28
                              w-full
                              object-cover
                            "
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeGalleryImage(
                                index
                              )
                            }
                            className="
                              absolute
                              right-2
                              top-2
                              rounded-full
                              bg-black/70
                              p-1.5
                              text-white
                              transition
                              hover:bg-red-500
                            "
                          >
                            <X size={14} />
                          </button>

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>

              {/* =================================
                  Video
              ================================= */}

              <div
                className="
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                "
              >

                <div className="mb-4 flex items-center gap-3">

                  <Video
                    size={22}
                    className="text-primary"
                  />

                  <h3 className="font-bold">
                    ویدئوی پروژه
                  </h3>

                </div>

                <label
                  className="
                    flex
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-white/20
                    bg-black/20
                    p-8
                    text-center
                    transition
                    hover:border-primary
                  "
                >

                  <Upload
                    size={28}
                    className="mb-3 text-primary"
                  />

                  <span className="text-sm text-white/60">
                    انتخاب ویدئو
                  </span>

                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />

                </label>

                {video && (
                  <div className="mt-4 rounded-xl bg-black/30 p-4">

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >

                      <div className="min-w-0">

                        <p className="truncate text-sm text-white/70">
                          {video.name}
                        </p>

                        <p className="mt-1 text-xs text-white/30">
                          {(video.size / 1024 / 1024).toFixed(
                            2
                          )}{" "}
                          MB
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={removeVideo}
                        className="
                          shrink-0
                          text-red-400
                          transition
                          hover:text-red-300
                        "
                      >
                        <X size={18} />
                      </button>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* =====================================
              Submit
          ====================================== */}

          <div
            className="
              mt-8
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >

            <button
              type="button"
              onClick={() =>
                navigate("/admin/projects")
              }
              disabled={loading}
              className="
                rounded-full
                border
                border-white/10
                px-8
                py-4
                text-white/60
                transition
                hover:border-white/30
                hover:text-white
                disabled:opacity-50
              "
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                min-w-52
                items-center
                justify-center
                gap-3
                rounded-full
                bg-primary
                px-8
                py-4
                font-bold
                text-black
                transition
                hover:scale-[1.02]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  در حال ایجاد پروژه...
                </>
              ) : (
                <>
                  <Upload size={20} />

                  ایجاد پروژه
                </>
              )}

            </button>

          </div>

        </form>

      </div>
    </main>
  );
}


// =============================================
// Input Component
// =============================================

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  dir,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm text-white/70">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dir={dir}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-black/30
          px-5
          py-4
          text-white
          outline-none
          transition
          focus:border-primary
        "
      />

    </div>
  );
}


// =============================================
// Select Component
// =============================================

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm text-white/70">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-[#111]
          px-5
          py-4
          text-white
          outline-none
          focus:border-primary
        "
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


// =============================================
// Upload Box
// =============================================

function UploadBox({
  title,
  icon,
  accept,
  onChange,
}) {
  return (
    <div
      className="
        rounded-[30px]
        border
        border-white/10
        bg-white/[0.03]
        p-5
      "
    >

      <div className="mb-4 flex items-center gap-3">

        <span className="text-primary">
          {icon}
        </span>

        <h3 className="font-bold">
          {title}
        </h3>

      </div>

      <label
        className="
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-white/20
          bg-black/20
          p-8
          text-center
          transition
          hover:border-primary
        "
      >

        <Upload
          size={28}
          className="mb-3 text-primary"
        />

        <span className="text-sm text-white/60">
          انتخاب فایل
        </span>

        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />

      </label>

    </div>
  );
}
