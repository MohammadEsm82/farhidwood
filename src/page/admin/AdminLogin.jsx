import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  Phone,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { API_URL } from "../../config/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [step, setStep] =
    useState("phone");

  const [phone, setPhone] =
    useState(
      localStorage.getItem(
        "adminPhone"
      ) || ""
    );

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [checkingSession, setCheckingSession] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [countdown, setCountdown] =
    useState(0);

  // =====================================================
  // CHECK EXISTING COOKIE SESSION
  // =====================================================

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response =
          await fetch(
            `${API_URL}/auth/me`,
            {
              method: "GET",
              credentials: "include",
            }
          );

        if (response.ok) {
          navigate("/admin", {
            replace: true,
          });

          return;
        }
      } catch (error) {
        console.error(
          "SESSION CHECK ERROR:",
          error
        );
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [navigate]);

  // =====================================================
  // COUNTDOWN
  // =====================================================

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer =
      setInterval(() => {
        setCountdown(
          (prev) =>
            prev > 0
              ? prev - 1
              : 0
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [countdown]);

  // =====================================================
  // NORMALIZE PHONE
  // =====================================================

  const normalizePhone = (
    value
  ) => {
    let cleaned = value
      .replace(/\D/g, "");

    if (
      cleaned.startsWith("98")
    ) {
      cleaned =
        "0" +
        cleaned.substring(2);
    }

    if (
      cleaned.startsWith("9")
    ) {
      cleaned =
        "0" + cleaned;
    }

    return cleaned;
  };

  // =====================================================
  // VALIDATE PHONE
  // =====================================================

  const validatePhone = () => {
    const normalized =
      normalizePhone(phone);

    if (
      !/^09\d{9}$/.test(
        normalized
      )
    ) {
      setError(
        "شماره موبایل معتبر وارد کنید."
      );

      return false;
    }

    setPhone(normalized);

    return true;
  };

  // =====================================================
  // SEND OTP
  // =====================================================

  const handleSendOtp =
    async (e) => {
      e.preventDefault();

      setError("");
      setSuccess("");

      if (!validatePhone()) {
        return;
      }

      setLoading(true);

      try {
        const normalized =
          normalizePhone(phone);

        const response =
          await fetch(
            `${API_URL}/auth/send-otp`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              credentials:
                "include",
              body: JSON.stringify({
                phone: normalized,
              }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "ارسال کد تأیید انجام نشد."
          );
        }

        localStorage.setItem(
          "adminPhone",
          normalized
        );

        setPhone(normalized);
        setOtp("");
        setStep("otp");
        setCountdown(
          data.expiresIn || 120
        );

        setSuccess(
          data.message ||
            "کد تأیید ارسال شد."
        );
      } catch (error) {
        console.error(
          "SEND OTP ERROR:",
          error
        );

        setError(
          error.message ||
            "ارتباط با سرور برقرار نشد."
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOtp =
    async (e) => {
      e.preventDefault();

      setError("");
      setSuccess("");

      const normalized =
        normalizePhone(phone);

      const code =
        otp.trim();

      if (
        !/^09\d{9}$/.test(
          normalized
        )
      ) {
        setError(
          "شماره موبایل معتبر نیست."
        );

        setStep("phone");
        return;
      }

      if (!/^\d{6}$/.test(code)) {
        setError(
          "کد تأیید باید ۶ رقمی باشد."
        );

        return;
      }

      setLoading(true);

      try {
        const response =
          await fetch(
            `${API_URL}/auth/verify-otp`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              credentials:
                "include",
              body: JSON.stringify({
                phone: normalized,
                code,
              }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "کد تأیید صحیح نیست."
          );
        }

        // مهم:
        // Backend توکن را در HttpOnly Cookie
        // قرار داده است.

        const meResponse =
          await fetch(
            `${API_URL}/auth/me`,
            {
              method: "GET",
              credentials:
                "include",
            }
          );

        if (!meResponse.ok) {
          throw new Error(
            "ورود انجام شد اما نشست مدیریت ایجاد نشد."
          );
        }

        const meData =
          await meResponse.json();

        if (
          !meData.success ||
          !meData.admin
        ) {
          throw new Error(
            "نشست مدیریت معتبر نیست."
          );
        }

        setSuccess(
          "ورود با موفقیت انجام شد."
        );

        navigate("/admin", {
          replace: true,
        });
      } catch (error) {
        console.error(
          "VERIFY OTP ERROR:",
          error
        );

        setError(
          error.message ||
            "تأیید کد انجام نشد."
        );
      } finally {
        setLoading(false);
      }
    };

  // =====================================================
  // CHANGE PHONE
  // =====================================================

  const changePhone = () => {
    setStep("phone");
    setOtp("");
    setError("");
    setSuccess("");
    setCountdown(0);
  };

  // =====================================================
  // RESEND
  // =====================================================

  const resendOtp = async () => {
    if (
      countdown > 0 ||
      loading
    ) {
      return;
    }

    await handleSendOtp({
      preventDefault: () => {},
    });
  };

  // =====================================================
  // CHECKING
  // =====================================================

  if (checkingSession) {
    return (
      <main
        dir="rtl"
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#090909]
          text-white
        "
      >
        <div className="text-center">
          <Spinner />

          <p className="mt-4 text-sm text-white/40">
            در حال بررسی نشست مدیریت...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main
      dir="rtl"
      className="
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#090909]
        px-6
        py-12
        text-white
      "
    >
      <div className="pointer-events-none fixed inset-0">
        <div
          className="
            absolute
            right-[-180px]
            top-[-180px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-primary/10
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            left-[-200px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-primary/5
            blur-[160px]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.035]
          p-7
          shadow-2xl
          backdrop-blur-2xl
          sm:p-10
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-primary/20
              bg-primary/10
              text-primary
            "
          >
            {step === "phone" ? (
              <ShieldCheck
                size={30}
              />
            ) : (
              <LockKeyhole
                size={28}
              />
            )}
          </div>

          <h1 className="mt-6 text-2xl font-black">
            FARHID
            <span className="text-primary">
              WOOD
            </span>
          </h1>

          <p className="mt-2 text-sm text-white/40">
            ورود به پنل مدیریت
          </p>
        </div>

        {step === "phone" && (
          <form
            onSubmit={
              handleSendOtp
            }
            className="mt-10"
          >
            <label className="mb-3 block text-sm text-white/70">
              شماره موبایل مدیر
            </label>

            <div className="relative">
              <Phone
                size={19}
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-primary
                "
              />

              <input
                dir="ltr"
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="09123456789"
                autoComplete="tel"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  py-5
                  pl-5
                  pr-14
                  text-white
                  outline-none
                  transition
                  placeholder:text-white/20
                  focus:border-primary
                "
              />
            </div>

            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}

            {success && (
              <SuccessMessage>
                {success}
              </SuccessMessage>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-6
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
                transition
                hover:-translate-y-0.5
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? (
                <>
                  <Spinner />
                  در حال ارسال...
                </>
              ) : (
                <>
                  ارسال کد تأیید
                  <ArrowLeft
                    size={18}
                  />
                </>
              )}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form
            onSubmit={
              handleVerifyOtp
            }
            className="mt-10"
          >
            <div className="text-center">
              <p className="text-sm text-white/50">
                کد تأیید به شماره زیر ارسال شد:
              </p>

              <p
                dir="ltr"
                className="
                  mt-2
                  font-bold
                  tracking-wider
                  text-primary
                "
              >
                {phone}
              </p>
            </div>

            <label className="mb-3 mt-8 block text-sm text-white/70">
              کد تأیید
            </label>

            <input
              dir="ltr"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="------"
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-5
                py-5
                text-center
                text-2xl
                font-bold
                tracking-[10px]
                text-white
                outline-none
                transition
                focus:border-primary
              "
            />

            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}

            {success && (
              <SuccessMessage>
                {success}
              </SuccessMessage>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-6
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
                transition
                hover:-translate-y-0.5
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? (
                <>
                  <Spinner />
                  در حال بررسی...
                </>
              ) : (
                <>
                  ورود به پنل
                  <CheckCircle2
                    size={19}
                  />
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={
                  changePhone
                }
                className="
                  text-white/40
                  transition
                  hover:text-primary
                "
              >
                تغییر شماره
              </button>

              <button
                type="button"
                disabled={
                  countdown > 0 ||
                  loading
                }
                onClick={
                  resendOtp
                }
                className="
                  flex
                  items-center
                  gap-2
                  text-primary
                  disabled:cursor-not-allowed
                  disabled:text-white/20
                "
              >
                <RefreshCw
                  size={16}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                {countdown > 0
                  ? `ارسال مجدد ${countdown} ثانیه`
                  : "ارسال مجدد کد"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-10 text-center text-xs leading-6 text-white/25">
          این بخش مخصوص مدیریت FARHIDWOOD است.
          <br />
          دسترسی غیرمجاز امکان‌پذیر نیست.
        </p>
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <span
      className="
        inline-block
        h-5
        w-5
        animate-spin
        rounded-full
        border-2
        border-black/20
        border-t-black
      "
    />
  );
}

function ErrorMessage({
  children,
}) {
  return (
    <p className="mt-3 text-sm text-red-400">
      {children}
    </p>
  );
}

function SuccessMessage({
  children,
}) {
  return (
    <p className="mt-3 text-sm text-primary">
      {children}
    </p>
  );
}