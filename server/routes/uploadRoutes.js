const express = require("express");
const multer = require("multer");
const path = require("path");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// Multer Storage
// =========================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// =========================
// File Filter
// =========================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("فرمت فایل مجاز نیست"), false);
  }
};

// =========================
// Upload Config
// =========================

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

// =========================
// Test Upload
// =========================

router.post("/", protectAdmin, upload.single("file"), (req, res) => {
  try {
    console.log("UPLOAD REQUEST RECEIVED");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "هیچ فایلی ارسال نشده است.",
      });
    }

    console.log("FILE:", req.file);

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(201).json({
      success: true,
      message: "فایل با موفقیت آپلود شد.",
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
      },
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;