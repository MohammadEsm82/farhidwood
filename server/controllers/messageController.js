const mongoose = require("mongoose");
const Message = require("../models/Message");
const { sendEitaaNotification } = require("../services/eitaaService");

// =====================================================
// CREATE MESSAGE
// POST /api/messages
// =====================================================

const createMessage = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      subject,
      message,
    } = req.body;

    // اعتبارسنجی کامل قبلاً توسط middleware زد شده (validateBody)

    const newMessage = await Message.create({
      name,
      phone,
      email: email || "",
      subject: subject || "",
      message,
    });

    // اطلاع‌رسانی به ادمین از طریق ایتا — اگر ارسالش با خطا
    // مواجه بشه، مانع ثبت موفق پیام کاربر در سایت نمی‌شود
    sendEitaaNotification(
      `📩 پیام جدید از سایت\n\n` +
        `نام: ${name}\n` +
        `تلفن: ${phone}\n` +
        (subject ? `موضوع: ${subject}\n` : "") +
        `\nمتن پیام:\n${message}`
    );

    return res.status(201).json({
      success: true,
      message: "پیام شما با موفقیت ارسال شد.",
      data: newMessage,
    });
  } catch (error) {
    console.error("CREATE MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "ارسال پیام با خطا مواجه شد.",
    });
  }
};

// =====================================================
// GET ALL MESSAGES
// GET /api/messages
// =====================================================

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "دریافت پیام‌ها با خطا مواجه شد.",
    });
  }
};

// =====================================================
// GET UNREAD COUNT
// GET /api/messages/unread-count
// =====================================================

const getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("GET UNREAD COUNT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "دریافت تعداد پیام‌های جدید انجام نشد.",
    });
  }
};

// =====================================================
// MARK AS READ
// PATCH /api/messages/:id/read
// =====================================================

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه پیام نامعتبر است.",
      });
    }

    const updatedMessage =
      await Message.findByIdAndUpdate(
        id,
        { isRead: true },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "پیام پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "پیام به عنوان خوانده‌شده علامت خورد.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("MARK MESSAGE READ ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "تغییر وضعیت پیام انجام نشد.",
    });
  }
};

// =====================================================
// MARK AS UNREAD
// PATCH /api/messages/:id/unread
// =====================================================

const markAsUnread = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه پیام نامعتبر است.",
      });
    }

    const updatedMessage =
      await Message.findByIdAndUpdate(
        id,
        { isRead: false },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "پیام پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "پیام به عنوان خوانده‌نشده علامت خورد.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("MARK MESSAGE UNREAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "تغییر وضعیت پیام انجام نشد.",
    });
  }
};

// =====================================================
// DELETE MESSAGE
// DELETE /api/messages/:id
// =====================================================

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه پیام نامعتبر است.",
      });
    }

    const deletedMessage =
      await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "پیام پیدا نشد.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "پیام با موفقیت حذف شد.",
    });
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "حذف پیام انجام نشد.",
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getUnreadCount,
  markAsRead,
  markAsUnread,
  deleteMessage,
};