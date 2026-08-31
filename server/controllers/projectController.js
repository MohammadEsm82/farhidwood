const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");

// =====================================================
// HELPER
// =====================================================

// به‌جای هاردکد کردن آدرس، از خود درخواست می‌سازیم
// (روی هر دامنه/پورتی که سرور اجرا بشه درست کار می‌کنه)
const getUploadUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// حذف فیزیکی یک فایل آپلودشده از روی دیسک با گرفتن URL کامل آن
const deleteUploadedFile = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== "string") return;

  try {
    const filename = fileUrl.split("/uploads/")[1];
    if (!filename) return;

    const filePath = path.join(
      __dirname,
      "../uploads",
      filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error(
            "DELETE FILE ERROR:",
            error.message
          );
        }
      });
    }
  } catch (error) {
    console.error(
      "DELETE FILE ERROR:",
      error.message
    );
  }
};

// =====================================================
// GET ALL PROJECTS
// =====================================================

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "خطا در دریافت پروژه‌ها",
      error: error.message,
    });
  }
};

// =====================================================
// GET PROJECT BY ID
// مخصوص پنل مدیریت
// GET /api/projects/id/:id
// =====================================================

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "پروژه پیدا نشد",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET PROJECT BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "خطا در دریافت پروژه",
      error: error.message,
    });
  }
};

// =====================================================
// GET PROJECT BY SLUG
// مخصوص سایت اصلی
// GET /api/projects/slug/:slug
// =====================================================

const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({
      slug,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "پروژه پیدا نشد",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("GET PROJECT BY SLUG ERROR:", error);

    res.status(500).json({
      success: false,
      message: "خطا در دریافت پروژه",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE PROJECT
// =====================================================

const createProject = async (req, res) => {
  try {
    console.log("=================================");
    console.log("CREATE PROJECT REQUEST");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("=================================");

    const {
      title,
      slug,
      style,
      city,
      year,
      area,
      duration,
      category,
      description,
      layout,
      materials,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "عنوان و slug پروژه الزامی است",
      });
    }

    // =================================================
    // CHECK DUPLICATE SLUG
    // =================================================

    const existingProject = await Project.findOne({
      slug,
    });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message: "پروژه‌ای با این slug قبلاً وجود دارد",
      });
    }

    // =================================================
    // FILES
    // =================================================

    let hero = "";
    let images = [];
    let video = "";

    if (req.files) {
      // HERO
      if (req.files.hero?.[0]) {
        hero = getUploadUrl(
          req,
          req.files.hero[0].filename
        );
      }

      // GALLERY
      if (req.files.images?.length) {
        images = req.files.images.map((file) =>
          getUploadUrl(req, file.filename)
        );
      }

      // VIDEO
      if (req.files.video?.[0]) {
        video = getUploadUrl(
          req,
          req.files.video[0].filename
        );
      }
    }

    // =================================================
    // MATERIALS
    // =================================================

    let parsedMaterials = [];

    if (materials) {
      if (Array.isArray(materials)) {
        parsedMaterials = materials;
      } else {
        try {
          const parsed = JSON.parse(materials);

          parsedMaterials = Array.isArray(parsed)
            ? parsed
            : [String(parsed)];
        } catch {
          parsedMaterials = String(materials)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        }
      }
    }

    // =================================================
    // CREATE
    // =================================================

    const project = await Project.create({
      title,
      slug,
      style,
      city,
      year,
      area,
      duration,
      category,
      description,
      layout,
      materials: parsedMaterials,
      hero,
      images,
      video,
    });

    // =================================================
    // RESPONSE
    // =================================================

    res.status(201).json({
      success: true,
      message: "پروژه با موفقیت ایجاد شد",
      project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "خطا در ایجاد پروژه",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE PROJECT
// DELETE /api/projects/:id
// =====================================================

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "پروژه پیدا نشد.",
      });
    }

    // حذف فایل‌های فیزیکی مرتبط با این پروژه از روی دیسک
    deleteUploadedFile(project.hero);
    deleteUploadedFile(project.video);
    (project.images || []).forEach(
      deleteUploadedFile
    );

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "پروژه با موفقیت حذف شد.",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "خطا در حذف پروژه.",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE PROJECT
// PUT /api/projects/:id
// =====================================================

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("=================================");
    console.log("UPDATE PROJECT");
    console.log("ID:", id);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("=================================");

    // =================================================
    // FIND PROJECT
    // =================================================

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "پروژه پیدا نشد.",
      });
    }

    // =================================================
    // GET BODY
    // =================================================

    const {
      title,
      slug,
      style,
      city,
      year,
      area,
      duration,
      category,
      description,
      layout,
      materials,
      existingImages,
      deletedImages,
    } = req.body;

    // =================================================
    // DUPLICATE SLUG
    // =================================================

    if (slug && slug !== project.slug) {
      const duplicate = await Project.findOne({
        slug,
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "پروژه‌ای با این slug قبلاً وجود دارد.",
        });
      }
    }

    // =================================================
    // TEXT FIELDS
    // =================================================

    if (title !== undefined) {
      project.title = title;
    }

    if (slug !== undefined) {
      project.slug = slug;
    }

    if (style !== undefined) {
      project.style = style;
    }

    if (city !== undefined) {
      project.city = city;
    }

    if (year !== undefined) {
      project.year = year;
    }

    if (area !== undefined) {
      project.area = area;
    }

    if (duration !== undefined) {
      project.duration = duration;
    }

    if (category !== undefined) {
      project.category = category;
    }

    if (description !== undefined) {
      project.description = description;
    }

    if (layout !== undefined) {
      project.layout = layout;
    }

    // =================================================
    // MATERIALS
    // =================================================

    if (materials !== undefined) {
      try {
        const parsed = JSON.parse(materials);

        project.materials = Array.isArray(parsed)
          ? parsed
          : [String(parsed)];
      } catch {
        project.materials = String(materials)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    // =================================================
    // EXISTING IMAGES
    // =================================================

    if (existingImages !== undefined) {
      try {
        const parsedExistingImages =
          JSON.parse(existingImages);

        if (Array.isArray(parsedExistingImages)) {
          project.images = parsedExistingImages;
        }
      } catch (error) {
        console.error(
          "EXISTING IMAGES PARSE ERROR:",
          error
        );
      }
    }

    // =================================================
    // DELETED IMAGES
    // =================================================

    if (deletedImages !== undefined) {
      try {
        const parsedDeletedImages =
          JSON.parse(deletedImages);

        if (Array.isArray(parsedDeletedImages)) {
          project.images = (
            project.images || []
          ).filter(
            (image) =>
              !parsedDeletedImages.includes(image)
          );

          // حذف فیزیکی فایل‌های تصویر از روی دیسک
          parsedDeletedImages.forEach(
            deleteUploadedFile
          );
        }
      } catch (error) {
        console.error(
          "DELETED IMAGES PARSE ERROR:",
          error
        );
      }
    }

    // =================================================
    // FILES
    // =================================================

    if (req.files) {
      // =================================================
      // HERO
      // =================================================

      if (
        req.files.hero &&
        req.files.hero.length > 0
      ) {
        // حذف عکس Hero قبلی از روی دیسک قبل از جایگزینی
        deleteUploadedFile(project.hero);

        project.hero = getUploadUrl(
          req,
          req.files.hero[0].filename
        );
      }

      // =================================================
      // NEW GALLERY
      // =================================================

      if (
        req.files.images &&
        req.files.images.length > 0
      ) {
        const newImages =
          req.files.images.map((file) =>
            getUploadUrl(req, file.filename)
          );

        project.images = [
          ...(project.images || []),
          ...newImages,
        ];
      }

      // =================================================
      // VIDEO
      // =================================================

      if (
        req.files.video &&
        req.files.video.length > 0
      ) {
        // حذف ویدیوی قبلی از روی دیسک قبل از جایگزینی
        deleteUploadedFile(project.video);

        project.video = getUploadUrl(
          req,
          req.files.video[0].filename
        );
      }
    }

    // =================================================
    // SAVE
    // =================================================

    const updatedProject =
      await project.save();

    // =================================================
    // RESPONSE
    // =================================================

    res.status(200).json({
      success: true,
      message: "پروژه با موفقیت ویرایش شد.",
      project: updatedProject,
    });
  } catch (error) {
    console.error(
      "UPDATE PROJECT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "خطا در ویرایش پروژه.",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};