require("dotenv").config();
const express = require("express");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");

const projectRoutes = require("./routes/projectRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
console.log("🔎 SHOW_OTP_IN_CONSOLE =", JSON.stringify(process.env.SHOW_OTP_IN_CONSOLE));

const app = express();

// =====================================================
// DATABASE
// =====================================================

connectDB();

// =====================================================
// CORS
// =====================================================

const allowedOrigins = (
  process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // اجازه برای Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS: Origin not allowed")
      );
    },

    credentials: true,
  })
);

// =====================================================
// BODY
// =====================================================

app.use(express.json({ limit: "2mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb",
  })
);

// =====================================================
// COOKIE
// =====================================================

app.use(cookieParser());

// =====================================================
// STATIC UPLOADS
// =====================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "FARHIDWOOD API is running 🚀",
  });
});

// =====================================================
// AUTH
// =====================================================

app.use(
  "/api/auth",
  authRoutes
);

// =====================================================
// PROJECTS
// =====================================================

app.use(
  "/api/projects",
  projectRoutes
);

// =====================================================
// UPLOAD
// =====================================================

app.use(
  "/api/upload",
  uploadRoutes
);

// =====================================================
// MESSAGES
// =====================================================

app.use(
  "/api/messages",
  messageRoutes
);

// =====================================================
// 404 API
// =====================================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "مسیر مورد نظر پیدا نشد.",
  });
});

// =====================================================
// GLOBAL ERROR
// =====================================================

app.use((error, req, res, next) => {
  console.error("GLOBAL ERROR:", error);

  if (error.message?.startsWith("CORS:")) {
    return res.status(403).json({
      success: false,
      message: "دسترسی CORS مجاز نیست.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "خطای داخلی سرور.",
  });
});

// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});