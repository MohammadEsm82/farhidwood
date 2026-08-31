const express = require("express");

const router = express.Router();

const {
  getProjects,
  getProjectById,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const upload = require("../middleware/upload");
const protectAdmin = require("../middleware/authMiddleware");

// Public
router.get("/", getProjects);
router.get("/slug/:slug", getProjectBySlug);

// Admin only
router.get("/id/:id", protectAdmin, getProjectById);

router.post(
  "/",
  protectAdmin,
  upload.fields([
    { name: "hero", maxCount: 1 },
    { name: "images", maxCount: 20 },
    { name: "video", maxCount: 1 },
  ]),
  createProject
);

router.put(
  "/:id",
  protectAdmin,
  upload.fields([
    { name: "hero", maxCount: 1 },
    { name: "images", maxCount: 20 },
    { name: "video", maxCount: 1 },
  ]),
  updateProject
);

router.delete("/:id", protectAdmin, deleteProject);

module.exports = router;
