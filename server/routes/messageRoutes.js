const express = require("express");

const {
  createMessage,
  getMessages,
  getUnreadCount,
  markAsRead,
  markAsUnread,
  deleteMessage,
} = require("../controllers/messageController");

const protectAdmin = require("../middleware/authMiddleware");
const rateLimit = require("../middleware/rateLimit");
const validateBody = require("../middleware/validateBody");
const { createMessageSchema } = require("../schemas/messageSchemas");

const router =
  express.Router();

// =====================================================
// PUBLIC
// =====================================================

router.post(
  "/",
  rateLimit(5, 10 * 60 * 1000), // حداکثر ۵ پیام در ۱۰ دقیقه برای هر IP
  validateBody(createMessageSchema),
  createMessage
);

// =====================================================
// PROTECTED ADMIN
// =====================================================

router.get(
  "/",
  protectAdmin,
  getMessages
);

router.get(
  "/unread-count",
  protectAdmin,
  getUnreadCount
);

router.patch(
  "/:id/read",
  protectAdmin,
  markAsRead
);

router.patch(
  "/:id/unread",
  protectAdmin,
  markAsUnread
);

router.delete(
  "/:id",
  protectAdmin,
  deleteMessage
);

module.exports = router;