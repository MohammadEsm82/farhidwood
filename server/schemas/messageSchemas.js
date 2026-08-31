const { z } = require("zod");

// شماره تلفن ایرانی: با 0 شروع بشه و ۱۱ رقم باشه
const phoneRegex = /^0\d{10}$/;

const createMessageSchema = z.object({
  name: z
    .string({
      required_error: "نام الزامی است.",
    })
    .trim()
    .min(2, "نام باید حداقل ۲ حرف باشد.")
    .max(100, "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  phone: z
    .string({
      required_error: "شماره تماس الزامی است.",
    })
    .trim()
    .regex(
      phoneRegex,
      "شماره تماس معتبر وارد کنید (مثال: 09123456789)."
    ),

  email: z
    .string()
    .trim()
    .email("ایمیل معتبر وارد کنید.")
    .max(150)
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .trim()
    .max(200, "موضوع نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد.")
    .optional()
    .or(z.literal("")),

  message: z
    .string({
      required_error: "متن پیام الزامی است.",
    })
    .trim()
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد.")
    .max(3000, "متن پیام نمی‌تواند بیشتر از ۳۰۰۰ کاراکتر باشد."),
});

module.exports = {
  createMessageSchema,
};
