const express = require("express");

const {
  sendOtp,
  verifyOtp,
  getMe,
  logout,
} = require("../controllers/authController");

const protectAdmin = require("../middleware/authMiddleware");
const rateLimit = require("../middleware/rateLimit");

const router = express.Router();

// =====================================================
// PUBLIC
// =====================================================

router.post(
  "/send-otp",
  rateLimit(5, 10 * 60 * 1000),
  sendOtp
);

router.post(
  "/verify-otp",
  rateLimit(10, 10 * 60 * 1000),
  verifyOtp
);

// =====================================================
// PROTECTED
// =====================================================

router.get(
  "/me",
  protectAdmin,
  getMe
);

router.post(
  "/logout",
  protectAdmin,
  logout
);

module.exports = router;