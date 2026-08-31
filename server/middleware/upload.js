const multer = require("multer");
const path = require("path");
const fs = require("fs");


// =====================================================
// Upload Directory
// =====================================================

const uploadDir = path.join(
  __dirname,
  "../uploads"
);


// Create uploads folder if doesn't exist

if (!fs.existsSync(uploadDir)) {

  fs.mkdirSync(uploadDir, {
    recursive: true,
  });

}


// =====================================================
// Storage
// =====================================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadDir);

  },


  filename: (req, file, cb) => {

    const extension = path.extname(
      file.originalname
    );

    const filename =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    cb(null, filename);

  },

});


// =====================================================
// File Filter
// =====================================================

const fileFilter = (req, file, cb) => {

  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];


  const videoTypes = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];


  if (
    imageTypes.includes(file.mimetype) ||
    videoTypes.includes(file.mimetype)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "فرمت فایل مجاز نیست"
      ),
      false
    );

  }

};


// =====================================================
// Multer
// =====================================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      100 * 1024 * 1024,

  },

});


module.exports = upload;