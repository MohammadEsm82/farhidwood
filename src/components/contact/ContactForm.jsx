import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { API_URL } from "../../config/api";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "لطفاً نام خود را وارد کنید.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "لطفاً شماره تماس را وارد کنید.";
    } else if (form.phone.trim().length < 10) {
      newErrors.phone = "شماره تماس صحیح نیست.";
    }

    if (!form.message.trim()) {
      newErrors.message = "لطفاً متن پیام را وارد کنید.";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "ایمیل وارد شده صحیح نیست.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validate()) return;

    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "ارسال پیام با خطا مواجه شد."
        );
      }

      setForm(initialForm);
      setErrors({});
      setStatus("success");
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);

      setStatus("error");

      setServerError(
        error.message ||
          "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید."
      );
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setServerError("");
    setErrors({});
    setForm(initialForm);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        فرم تماس
      </h2>

      <p className="mt-5 leading-8 text-white/50">
        اطلاعات پروژه خود را برای ما ارسال کنید تا در اولین فرصت
        با شما تماس بگیریم.
      </p>

      {/* ================= SUCCESS ================= */}

      {status === "success" ? (
        <div
          className="
            mt-10
            rounded-[32px]
            border
            border-primary/30
            bg-primary/5
            p-10
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
            "
          >
            <CheckCircle2 size={32} />
          </div>

          <h3 className="mt-6 text-2xl font-bold text-white">
            پیام شما با موفقیت ارسال شد
          </h3>

          <p className="mt-4 leading-8 text-white/50">
            پیام شما ثبت شد و کارشناسان FarhidWood در اولین فرصت
            با شما تماس خواهند گرفت.
          </p>

          <button
            type="button"
            onClick={resetForm}
            className="
              mt-8
              rounded-full
              border
              border-primary
              px-7
              py-3
              text-sm
              text-primary
              transition-all
              duration-300
              hover:bg-primary
              hover:text-black
            "
          >
            ارسال پیام جدید
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
          noValidate
        >
          {/* ================= NAME ================= */}

          <Field
            label="نام"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="نام و نام خانوادگی"
            error={errors.name}
          />

          {/* ================= PHONE ================= */}

          <Field
            label="شماره تماس"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="09xxxxxxxxx"
            type="tel"
            error={errors.phone}
            dir="ltr"
          />

          {/* ================= EMAIL ================= */}

          <Field
            label="ایمیل"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            type="email"
            error={errors.email}
            dir="ltr"
          />

          {/* ================= MESSAGE ================= */}

          <div>
            <label className="mb-3 block text-sm text-white/70">
              متن پیام
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              maxLength={3000}
              placeholder="توضیحات پروژه خود را بنویسید..."
              className="
                w-full
                resize-none
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                text-white
                outline-none
                transition-all
                duration-300
                placeholder:text-white/25
                focus:border-primary
                focus:bg-white/[0.05]
              "
            />

            <div className="mt-2 flex justify-between">
              {errors.message ? (
                <p className="text-sm text-red-400">
                  {errors.message}
                </p>
              ) : (
                <span />
              )}

              <span className="text-xs text-white/30">
                {form.message.length}/3000
              </span>
            </div>
          </div>

          {/* ================= SERVER ERROR ================= */}

          {status === "error" && (
            <div
              className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/5
                p-4
                text-sm
                leading-7
                text-red-400
              "
            >
              {serverError}
            </div>
          )}

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            disabled={status === "loading"}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-primary
              py-5
              font-bold
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_15px_40px_rgba(201,168,106,0.2)]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {status === "loading" ? (
              <>
                <span
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-black/30
                    border-t-black
                  "
                />

                در حال ارسال...
              </>
            ) : (
              <>
                ارسال پیام

                <Send
                  size={19}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

/* =====================================================
   FIELD
===================================================== */

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  dir,
}) {
  return (
    <div>
      <label className="mb-3 block text-sm text-white/70">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        dir={dir}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          p-5
          text-white
          outline-none
          transition-all
          duration-300
          placeholder:text-white/25
          focus:border-primary
          focus:bg-white/[0.05]
        "
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}