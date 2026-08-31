import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowRight,
  Save,
  Image as ImageIcon,
  Video,
  X,
  Trash2,
  LoaderCircle,
} from "lucide-react";

import { API_URL } from "../../config/api";

export default function EditProject() {
  // =====================================================
  // ROUTE PARAM
  // /admin/projects/edit/:id
  // =====================================================

  const { id } = useParams();

  const navigate = useNavigate();

  // =====================================================
  // PROJECT
  // =====================================================

  const [project, setProject] = useState(null);

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // PROJECT ID
  // =====================================================

  const [projectId, setProjectId] =
    useState(null);

  // =====================================================
  // FORM
  // =====================================================

  const [form, setForm] = useState({
    title: "",
    slug: "",
    style: "",
    city: "",
    year: "",
    area: "",
    duration: "",
    category: "",
    description: "",
    layout: "small",
    materials: "",
  });

  // =====================================================
  // FILES
  // =====================================================

  const [heroFile, setHeroFile] =
    useState(null);

  const [galleryFiles, setGalleryFiles] =
    useState([]);

  const [videoFile, setVideoFile] =
    useState(null);

  // =====================================================
  // DELETED OLD IMAGES
  // =====================================================

  const [deletedImages, setDeletedImages] =
    useState([]);

  // =====================================================
  // GET PROJECT BY ID
  // =====================================================

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        // =================================================
        // CHECK ID
        // =================================================

        if (!id) {
          throw new Error(
            "شناسه پروژه در آدرس صفحه وجود ندارد."
          );
        }

        console.log(
          "GET PROJECT BY ID:",
          id
        );

        // =================================================
        // REQUEST
        // =================================================

        const response = await fetch(
          `${API_URL}/projects/id/${id}`,
          { credentials: "include" }
        );

        // =================================================
        // READ RESPONSE SAFELY
        // =================================================

        const contentType =
          response.headers.get(
            "content-type"
          );

        let data = null;

        if (
          contentType &&
          contentType.includes(
            "application/json"
          )
        ) {
          data = await response.json();
        } else {
          const text =
            await response.text();

          console.error(
            "NON JSON RESPONSE:",
            text
          );

          throw new Error(
            `سرور پاسخ نامعتبر ارسال کرد. وضعیت: ${response.status}`
          );
        }

        console.log(
          "GET PROJECT RESPONSE:",
          data
        );

        // =================================================
        // ERROR
        // =================================================

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "پروژه پیدا نشد."
          );
        }

        // =================================================
        // PROJECT
        // =================================================

        const foundProject =
          data?.project;

        if (!foundProject) {
          throw new Error(
            "اطلاعات پروژه دریافت نشد."
          );
        }

        // =================================================
        // SAVE PROJECT
        // =================================================

        setProject(foundProject);

        setProjectId(
          foundProject._id
        );

        // =================================================
        // FORM
        // =================================================

        setForm({
          title:
            foundProject.title || "",

          slug:
            foundProject.slug || "",

          style:
            foundProject.style || "",

          city:
            foundProject.city || "",

          year:
            foundProject.year || "",

          area:
            foundProject.area || "",

          duration:
            foundProject.duration || "",

          category:
            foundProject.category || "",

          description:
            foundProject.description || "",

          layout:
            foundProject.layout ||
            "small",

          materials:
            Array.isArray(
              foundProject.materials
            )
              ? foundProject.materials.join(
                  ", "
                )
              : foundProject.materials ||
                "",
        });
      } catch (err) {
        console.error(
          "GET EDIT PROJECT ERROR:",
          err
        );

        setError(
          err.message ||
            "خطا در دریافت پروژه."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HERO
  // =====================================================

  const handleHeroChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setHeroFile(file);

    event.target.value = "";
  };

  // =====================================================
  // GALLERY
  // =====================================================

  const handleGalleryChange = (
    event
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    setGalleryFiles((prev) => [
      ...prev,
      ...files,
    ]);

    event.target.value = "";
  };

  // =====================================================
  // REMOVE NEW GALLERY FILE
  // =====================================================

  const removeNewGalleryFile = (
    index
  ) => {
    setGalleryFiles((prev) =>
      prev.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );
  };

  // =====================================================
  // REMOVE OLD IMAGE
  // =====================================================

  const removeOldImage = (
    image
  ) => {
    if (!image) return;

    setDeletedImages((prev) => {
      if (prev.includes(image)) {
        return prev;
      }

      return [
        ...prev,
        image,
      ];
    });

    setProject((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        images: (
          prev.images || []
        ).filter(
          (item) =>
            item !== image
        ),
      };
    });
  };

  // =====================================================
  // VIDEO
  // =====================================================

  const handleVideoChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setVideoFile(file);

    event.target.value = "";
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    // =================================================
    // CHECK ID
    // =================================================

    if (!projectId) {
      setError(
        "شناسه پروژه پیدا نشد. لطفاً صفحه را دوباره باز کنید."
      );

      return;
    }

    try {
      setSaving(true);

      setError("");
      setSuccess("");

      // =================================================
      // FORM DATA
      // =================================================

      const formData =
        new FormData();

      // =================================================
      // TEXT
      // =================================================

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "slug",
        form.slug
      );

      formData.append(
        "style",
        form.style
      );

      formData.append(
        "city",
        form.city
      );

      formData.append(
        "year",
        form.year
      );

      formData.append(
        "area",
        form.area
      );

      formData.append(
        "duration",
        form.duration
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "layout",
        form.layout
      );

      // =================================================
      // MATERIALS
      // =================================================

      const materials =
        form.materials
          .split(",")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean);

      formData.append(
        "materials",
        JSON.stringify(materials)
      );

      // =================================================
      // EXISTING IMAGES
      // =================================================

      formData.append(
        "existingImages",
        JSON.stringify(
          project?.images || []
        )
      );

      // =================================================
      // DELETED IMAGES
      // =================================================

      formData.append(
        "deletedImages",
        JSON.stringify(
          deletedImages
        )
      );

      // =================================================
      // HERO
      // =================================================

      if (heroFile) {
        formData.append(
          "hero",
          heroFile
        );
      }

      // =================================================
      // NEW GALLERY
      // =================================================

      galleryFiles.forEach(
        (file) => {
          formData.append(
            "images",
            file
          );
        }
      );

      // =================================================
      // VIDEO
      // =================================================

      if (videoFile) {
        formData.append(
          "video",
          videoFile
        );
      }

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "================================="
      );

      console.log(
        "UPDATE PROJECT"
      );

      console.log(
        "PROJECT ID:",
        projectId
      );

      console.log(
        "PROJECT SLUG:",
        form.slug
      );

      console.log(
        "DELETED IMAGES:",
        deletedImages
      );

      console.log(
        "NEW GALLERY FILES:",
        galleryFiles
      );

      console.log(
        "HERO FILE:",
        heroFile
      );

      console.log(
        "VIDEO FILE:",
        videoFile
      );

      console.log(
        "================================="
      );

      // =================================================
      // PUT
      // =================================================

      const response =
        await fetch(
          `${API_URL}/projects/${projectId}`,
          {
            method: "PUT",
            credentials: "include",
            body: formData,
          }
        );

      // =================================================
      // SAFE RESPONSE
      // =================================================

      const contentType =
        response.headers.get(
          "content-type"
        );

      let data = null;

      if (
        contentType &&
        contentType.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();
      } else {
        const text =
          await response.text();

        console.error(
          "NON JSON UPDATE RESPONSE:",
          text
        );

        throw new Error(
          `پاسخ نامعتبر از سرور دریافت شد. وضعیت: ${response.status}`
        );
      }

      console.log(
        "UPDATE RESPONSE:",
        data
      );

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "ویرایش پروژه انجام نشد."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "پروژه با موفقیت ویرایش شد."
      );

      // =================================================
      // UPDATE LOCAL PROJECT
      // =================================================

      if (data?.project) {
        const updated =
          data.project;

        setProject(updated);

        setProjectId(
          updated._id
        );

        setForm({
          title:
            updated.title || "",

          slug:
            updated.slug || "",

          style:
            updated.style || "",

          city:
            updated.city || "",

          year:
            updated.year || "",

          area:
            updated.area || "",

          duration:
            updated.duration || "",

          category:
            updated.category || "",

          description:
            updated.description || "",

          layout:
            updated.layout ||
            "small",

          materials:
            Array.isArray(
              updated.materials
            )
              ? updated.materials.join(
                  ", "
                )
              : updated.materials ||
                "",
        });
      }

      // =================================================
      // RESET
      // =================================================

      setHeroFile(null);

      setGalleryFiles([]);

      setVideoFile(null);

      setDeletedImages([]);

      // =================================================
      // NAVIGATE
      // =================================================

      setTimeout(() => {
        navigate(
          "/admin/projects"
        );
      }, 1000);
    } catch (err) {
      console.error(
        "UPDATE PROJECT ERROR:",
        err
      );

      setError(
        err.message ||
          "خطا در ویرایش پروژه."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section
        dir="rtl"
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
        "
      >
        <LoaderCircle
          size={40}
          className="
            animate-spin
            text-primary
          "
        />
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !project) {
    return (
      <section
        dir="rtl"
        className="
          min-h-screen
          px-4
          py-10
          sm:px-6
          lg:px-10
        "
      >
        <div
          className="
            mx-auto
            max-w-3xl
            rounded-[28px]
            border
            border-red-500/20
            bg-red-500/5
            p-8
            text-center
          "
        >
          <p className="text-red-400">
            {error}
          </p>

          <Link
            to="/admin/projects"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              px-6
              py-3
              text-white/70
              transition
              hover:border-primary
              hover:text-primary
            "
          >
            <ArrowRight
              size={18}
            />

            بازگشت به پروژه‌ها
          </Link>
        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <section
      dir="rtl"
      className="
        min-h-screen
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-10
        lg:py-10
      "
    >
      <div className="mx-auto max-w-6xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <Link
              to="/admin/projects"
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                text-sm
                text-white/40
                transition
                hover:text-primary
              "
            >
              <ArrowRight
                size={17}
              />

              بازگشت به پروژه‌ها
            </Link>

            <p className="text-xs tracking-[3px] text-primary">
              EDIT PROJECT
            </p>

            <h1 className="mt-2 text-3xl font-black text-white">
              ویرایش پروژه
            </h1>

            {project?.title && (
              <p className="mt-2 text-sm text-white/40">
                {project.title}
              </p>
            )}
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/5
              px-5
              py-4
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-green-500/20
              bg-green-500/5
              px-5
              py-4
              text-sm
              text-green-400
            "
          >
            {success}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <div
            className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.03]
              p-5
              sm:p-7
            "
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                اطلاعات پروژه
              </h2>

              <p className="mt-1 text-sm text-white/40">
                اطلاعات اصلی پروژه را ویرایش کنید.
              </p>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
              "
            >
              <Input
                label="عنوان پروژه"
                name="title"
                value={form.title}
                onChange={
                  handleChange
                }
                required
              />

              <Input
                label="Slug"
                name="slug"
                value={form.slug}
                onChange={
                  handleChange
                }
                required
                dir="ltr"
              />

              <Input
                label="سبک"
                name="style"
                value={form.style}
                onChange={
                  handleChange
                }
              />

              <Input
                label="شهر"
                name="city"
                value={form.city}
                onChange={
                  handleChange
                }
              />

              <Input
                label="سال"
                name="year"
                value={form.year}
                onChange={
                  handleChange
                }
              />

              <Input
                label="متراژ"
                name="area"
                value={form.area}
                onChange={
                  handleChange
                }
              />

              <Input
                label="مدت اجرا"
                name="duration"
                value={form.duration}
                onChange={
                  handleChange
                }
              />

              <Input
                label="دسته‌بندی"
                name="category"
                value={form.category}
                onChange={
                  handleChange
                }
              />

              <Input
                label="Layout"
                name="layout"
                value={form.layout}
                onChange={
                  handleChange
                }
              />

              <Input
                label="متریال‌ها"
                name="materials"
                value={
                  form.materials
                }
                onChange={
                  handleChange
                }
                placeholder="MDF, High Gloss, LED"
              />
            </div>

            {/* Description */}

            <div className="mt-5">
              <label className="mb-2 block text-sm text-white/60">
                توضیحات پروژه
              </label>

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                rows={6}
                className="
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  px-5
                  py-4
                  text-white
                  outline-none
                  transition
                  placeholder:text-white/20
                  focus:border-primary
                "
                placeholder="توضیحات پروژه..."
              />
            </div>
          </div>

          {/* =================================================
              HERO
          ================================================= */}

          <div
            className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.03]
              p-5
              sm:p-7
            "
          >
            <div className="mb-6">
              <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                <ImageIcon
                  size={22}
                  className="text-primary"
                />

                تصویر Hero
              </h2>

              <p className="mt-1 text-sm text-white/40">
                در صورت انتخاب تصویر جدید، تصویر قبلی جایگزین می‌شود.
              </p>
            </div>

            {/* Current Hero */}

            {project?.hero &&
              !heroFile && (
                <div className="mb-5 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={project.hero}
                    alt={
                      project.title ||
                      "Hero"
                    }
                    className="
                      h-[240px]
                      w-full
                      object-cover
                      sm:h-[320px]
                    "
                  />
                </div>
              )}

            {/* New Hero */}

            {heroFile && (
              <div className="relative mb-5 overflow-hidden rounded-2xl border border-primary/20">
                <img
                  src={URL.createObjectURL(
                    heroFile
                  )}
                  alt={
                    heroFile.name
                  }
                  className="
                    h-[240px]
                    w-full
                    object-cover
                    sm:h-[320px]
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setHeroFile(
                      null
                    )
                  }
                  className="
                    absolute
                    left-3
                    top-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-black/70
                    text-white
                    transition
                    hover:bg-red-500
                  "
                >
                  <X size={17} />
                </button>
              </div>
            )}

            {/* Upload */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-white/20
                bg-white/[0.02]
                px-5
                py-8
                text-center
                transition
                hover:border-primary
                hover:bg-primary/5
              "
            >
              <input
                type="file"
                accept="image/*"
                onChange={
                  handleHeroChange
                }
                className="hidden"
              />

              <div>
                <ImageIcon
                  size={30}
                  className="mx-auto text-primary"
                />

                <p className="mt-3 text-sm text-white/60">
                  انتخاب Hero جدید
                </p>

                {heroFile && (
                  <p className="mt-2 text-xs text-primary">
                    {
                      heroFile.name
                    }
                  </p>
                )}
              </div>
            </label>
          </div>

          {/* =================================================
              GALLERY
          ================================================= */}

          <div
            className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.03]
              p-5
              sm:p-7
            "
          >
            <div className="mb-6">
              <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                <ImageIcon
                  size={22}
                  className="text-primary"
                />

                گالری تصاویر
              </h2>

              <p className="mt-1 text-sm text-white/40">
                تصاویر قبلی را حذف کنید یا تصاویر جدید اضافه کنید.
              </p>
            </div>

            {/* OLD IMAGES */}

            {project?.images?.length >
            0 ? (
              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                  sm:grid-cols-3
                  lg:grid-cols-4
                "
              >
                {project.images.map(
                  (
                    image,
                    index
                  ) => (
                    <div
                      key={`${image}-${index}`}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                      "
                    >
                      <img
                        src={image}
                        alt={`${project.title || "پروژه"} ${index + 1}`}
                        className="
                          aspect-square
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/30
                          opacity-0
                          transition
                          group-hover:opacity-100
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeOldImage(
                            image
                          )
                        }
                        className="
                          absolute
                          left-2
                          top-2
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-red-500/90
                          text-white
                          opacity-0
                          transition
                          group-hover:opacity-100
                          hover:bg-red-600
                        "
                      >
                        <Trash2
                          size={17}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-white/10
                  py-10
                  text-center
                  text-sm
                  text-white/30
                "
              >
                تصویری در گالری وجود ندارد.
              </div>
            )}

            {/* NEW IMAGES */}

            {galleryFiles.length >
              0 && (
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-primary">
                    تصاویر جدید
                  </p>

                  <span className="text-xs text-white/30">
                    {
                      galleryFiles.length
                    }{" "}
                    تصویر
                  </span>
                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-3
                    lg:grid-cols-4
                  "
                >
                  {galleryFiles.map(
                    (
                      file,
                      index
                    ) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-2xl
                          border
                          border-primary/20
                        "
                      >
                        <img
                          src={URL.createObjectURL(
                            file
                          )}
                          alt={
                            file.name
                          }
                          className="
                            aspect-square
                            w-full
                            object-cover
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeNewGalleryFile(
                              index
                            )
                          }
                          className="
                            absolute
                            left-2
                            top-2
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-red-500/90
                            text-white
                            transition
                            hover:bg-red-600
                          "
                        >
                          <X
                            size={
                              17
                            }
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ADD IMAGES */}

            <label
              className="
                mt-6
                flex
                cursor-pointer
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-white/20
                bg-white/[0.02]
                px-5
                py-8
                text-center
                transition
                hover:border-primary
                hover:bg-primary/5
              "
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleGalleryChange
                }
                className="hidden"
              />

              <div>
                <ImageIcon
                  size={30}
                  className="mx-auto text-primary"
                />

                <p className="mt-3 text-sm text-white/60">
                  افزودن تصاویر جدید
                </p>

                <p className="mt-1 text-xs text-white/30">
                  امکان انتخاب چند تصویر وجود دارد
                </p>
              </div>
            </label>
          </div>

          {/* =================================================
              VIDEO
          ================================================= */}

          <div
            className="
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.03]
              p-5
              sm:p-7
            "
          >
            <div className="mb-6">
              <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                <Video
                  size={22}
                  className="text-primary"
                />

                ویدیوی پروژه
              </h2>

              <p className="mt-1 text-sm text-white/40">
                در صورت انتخاب ویدیوی جدید، ویدیوی قبلی جایگزین می‌شود.
              </p>
            </div>

            {/* Current Video */}

            {project?.video &&
              !videoFile && (
                <video
                  src={project.video}
                  controls
                  className="
                    mb-5
                    max-h-[400px]
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-black
                  "
                />
              )}

            {/* New Video */}

            {videoFile && (
              <div
                className="
                  mb-5
                  rounded-2xl
                  border
                  border-primary/20
                  bg-primary/5
                  p-4
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Video
                      size={20}
                      className="shrink-0 text-primary"
                    />

                    <span className="truncate text-sm text-white/70">
                      {
                        videoFile.name
                      }
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setVideoFile(
                        null
                      )
                    }
                    className="
                      shrink-0
                      text-red-400
                      transition
                      hover:text-red-300
                    "
                  >
                    <X size={19} />
                  </button>
                </div>
              </div>
            )}

            {/* Upload */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-white/20
                bg-white/[0.02]
                px-5
                py-8
                text-center
                transition
                hover:border-primary
                hover:bg-primary/5
              "
            >
              <input
                type="file"
                accept="video/*"
                onChange={
                  handleVideoChange
                }
                className="hidden"
              />

              <div>
                <Video
                  size={30}
                  className="mx-auto text-primary"
                />

                <p className="mt-3 text-sm text-white/60">
                  انتخاب ویدیوی جدید
                </p>

                {videoFile && (
                  <p className="mt-2 text-xs text-primary">
                    ویدیوی جدید انتخاب شده
                  </p>
                )}
              </div>
            </label>
          </div>

          {/* =================================================
              SAVE
          ================================================= */}

          <div
            className="
              sticky
              bottom-4
              z-20
              flex
              flex-col
              gap-3
              rounded-[24px]
              border
              border-white/10
              bg-[#111]/95
              p-4
              shadow-2xl
              backdrop-blur-xl
              sm:flex-row
              sm:justify-end
            "
          >
            <Link
              to="/admin/projects"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                px-6
                py-3
                text-white/60
                transition
                hover:border-white/20
                hover:text-white
              "
            >
              انصراف
            </Link>

            <button
              type="submit"
              disabled={
                saving ||
                !projectId
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-primary
                px-7
                py-3
                font-bold
                text-black
                transition
                hover:-translate-y-0.5
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {saving ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />

                  در حال ذخیره...
                </>
              ) : (
                <>
                  <Save
                    size={19}
                  />

                  ذخیره تغییرات
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

// =====================================================
// INPUT COMPONENT
// =====================================================

function Input({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  dir,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm text-white/60"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        dir={dir}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-black/20
          px-5
          py-3.5
          text-white
          outline-none
          transition
          placeholder:text-white/20
          focus:border-primary
        "
      />
    </div>
  );
}