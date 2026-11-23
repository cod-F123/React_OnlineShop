import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  KeyRound,
  Loader2,
  Lock,
  RotateCcw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Logo from "../../assets/images/Logo.png";
import { formatIranianPhone, formatTimer, isValidIranianPhone, normalizePhone, toPersianDigits } from "../../lib/phone";

const easing = [0.22, 1, 0.36, 1];

// Replace these placeholders with your real sendOTP / verifyOTP calls,
// or pass them in through the onSendOTP / onVerifyOTP props.
async function placeholderSendOTP() {
  await new Promise((resolve) => setTimeout(resolve, 900));
}

async function placeholderVerifyOTP() {
  await new Promise((resolve) => setTimeout(resolve, 1100));
}

function readErrorMessage(error, fallback) {
  if (error?.userMessage) return error.userMessage;
  if (error?.response) return fallback;
  if (typeof error?.message === "string" && error.message.trim()) return error.message;
  return fallback;
}

function FieldError({ id, children }) {
  if (!children) return null;

  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: easing }}
      className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-5 text-rose-600"
    >
      <AlertCircle size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </motion.p>
  );
}

function SubmitButton({ children, icon: Icon, isLoading, loadingLabel }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(15,23,42,0.9)] transition hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
    >
      {isLoading ? (
        <>
          <Loader2 size={17} aria-hidden="true" className="animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          {children}
          <Icon size={17} aria-hidden="true" />
        </>
      )}
    </button>
  );
}

export default function AuthCard({
  onSendOTP = placeholderSendOTP,
  onVerifyOTP = placeholderVerifyOTP,
  onSuccess,
  initialStep = "phone",
  otpLength = 6,
  resendSeconds = 120,
  title = "ورود یا ثبت‌نام",
  subtitle = "برای ادامه، شماره موبایل خود را وارد کنید.",
}) {
  const reduceMotion = useReducedMotion();
  const phoneInputId = useId();
  const phoneErrorId = useId();
  const otpErrorId = useId();

  const phoneRef = useRef(null);
  const otpRefs = useRef([]);

  const [step, setStep] = useState(initialStep);
  const [direction, setDirection] = useState("forward");
  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState(() => Array(otpLength).fill(""));
  const [phoneError, setPhoneError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(Math.max(0, resendSeconds - 1));
  const [resendNonce, setResendNonce] = useState(0);

  useEffect(() => {
    if (step === "phone") phoneRef.current?.focus();
    else otpRefs.current[0]?.focus();
  }, [step]);

  useEffect(() => {
    if (step !== "otp") return undefined;

    const id = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, [step, resendNonce]);

  const handlePhoneChange = (event) => {
    setPhone(event.target.value.replace(/[^\d+۰-۹٠-٩]/g, "").slice(0, 14));
    if (phoneError) setPhoneError("");
  };

  const handleSendOTP = async (event) => {
    event?.preventDefault();
    if (isSending) return;

    const normalized = normalizePhone(phone);

    if (!normalized) {
      setPhoneError("شماره موبایل را وارد کنید.");
      return;
    }

    if (!isValidIranianPhone(normalized)) {
      setPhoneError("شماره موبایل معتبر نیست. نمونه صحیح: ۰۹۱۲۳۴۵۶۷۸۹");
      return;
    }

    setPhoneError("");
    setIsSending(true);

    try {
      await onSendOTP(normalized);
      setPhone(normalized);
      setDigits(Array(otpLength).fill(""));
      setCodeError("");
      setDirection("forward");
      setStep("otp");
      setSecondsLeft(Math.max(0, resendSeconds - 1));
      setResendNonce((value) => value + 1);
    } catch (error) {
      setPhoneError(readErrorMessage(error, "ارسال کد با خطا مواجه شد. دوباره تلاش کنید."));
    } finally {
      setIsSending(false);
    }
  };

  const handleResendOTP = async () => {
    if (isResending || secondsLeft > 0) return;

    setIsResending(true);
    setCodeError("");

    try {
      await onSendOTP(phone);
      setSecondsLeft(Math.max(0, resendSeconds - 1));
      setResendNonce((value) => value + 1);
      setDigits(Array(otpLength).fill(""));
      otpRefs.current[0]?.focus();
    } catch (error) {
      setCodeError(readErrorMessage(error, "ارسال مجدد کد ناموفق بود. دوباره تلاش کنید."));
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOTP = async (event) => {
    event?.preventDefault();
    if (isVerifying) return;

    const code = digits.join("");

    if (code.length !== otpLength) {
      setCodeError(`کد ${toPersianDigits(otpLength)} رقمی ارسال شده را کامل وارد کنید.`);
      return;
    }

    setCodeError("");
    setIsVerifying(true);

    try {
      await onVerifyOTP({ phone, code });
      onSuccess?.();
    } catch (error) {
      setCodeError(readErrorMessage(error, "کد وارد شده نادرست یا منقضی شده است."));
      setDigits(Array(otpLength).fill(""));
      otpRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDigitChange = (index, rawValue) => {
    const cleaned = rawValue.replace(/\D/g, "");
    if (codeError) setCodeError("");

    if (!cleaned) {
      setDigits((previous) => previous.map((digit, position) => (position === index ? "" : digit)));
      return;
    }

    setDigits((previous) => {
      const next = [...previous];

      for (let offset = 0; offset < cleaned.length && index + offset < otpLength; offset += 1) {
        next[index + offset] = cleaned[offset];
      }

      return next;
    });

    const nextIndex = Math.min(index + cleaned.length, otpLength - 1);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleDigitKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      setDigits((previous) => previous.map((digit, position) => (position === index - 1 ? "" : digit)));
      otpRefs.current[index - 1]?.focus();
      return;
    }

    if (event.key === "ArrowLeft" && index < otpLength - 1) {
      event.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }

    if (event.key === "ArrowRight" && index > 0) {
      event.preventDefault();
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleEditPhone = () => {
    setDirection("back");
    setStep("phone");
    setDigits(Array(otpLength).fill(""));
    setCodeError("");
    setSecondsLeft(Math.max(0, resendSeconds - 1));
  };

  const stepVariants = {
    enter: (current) => ({ opacity: 0, x: current === "back" ? 36 : -36 }),
    center: { opacity: 1, x: 0 },
    exit: (current) => ({ opacity: 0, x: current === "back" ? -36 : 36 }),
  };

  return (
    <section dir="rtl" className="relative flex min-h-[74vh] items-center justify-center px-4 py-10 sm:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(38rem_26rem_at_50%_0%,rgba(99,102,241,0.16),transparent_65%),radial-gradient(30rem_22rem_at_100%_100%,rgba(56,189,248,0.14),transparent_70%)]" />
        <div className="bg-grid mask-fade-center absolute inset-0" />
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_40px_90px_-50px_rgba(15,23,42,0.65)] backdrop-blur-xl">
          <div className="h-1 w-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-l from-indigo-500 to-violet-500"
              initial={false}
              animate={{ width: step === "phone" ? "50%" : "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: easing }}
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-2.5" aria-label="Prime Shop">
                <img src={Logo} alt="" className="size-9 rounded-xl object-cover" />
                <span className="text-sm font-bold tracking-tight text-slate-900">
                  Prime<span className="text-indigo-600">Shop</span>
                </span>
              </Link>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                مرحله {toPersianDigits(step === "phone" ? 1 : 2)} از ۲
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              {step === "phone" ? (
                <motion.div
                  key="phone-step"
                  custom={direction}
                  variants={reduceMotion ? undefined : stepVariants}
                  initial={reduceMotion ? false : "enter"}
                  animate={reduceMotion ? undefined : "center"}
                  exit={reduceMotion ? undefined : "exit"}
                  transition={{ duration: 0.32, ease: easing }}
                >
                  <form onSubmit={handleSendOTP} noValidate>
                    <div className="mt-7">
                      <span className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <Smartphone size={20} aria-hidden="true" />
                      </span>
                      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
                    </div>

                    <div className="mt-6">
                      <label htmlFor={phoneInputId} className="mb-2 block text-sm font-semibold text-slate-800">
                        شماره موبایل
                      </label>
                      <div
                        className={`flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition focus-within:ring-4 ${
                          phoneError
                            ? "border-rose-300 focus-within:border-rose-400 focus-within:ring-rose-500/10"
                            : "border-slate-200 focus-within:border-indigo-400 focus-within:ring-indigo-500/10"
                        }`}
                      >
                        <Smartphone size={18} aria-hidden="true" className="shrink-0 text-slate-400" />
                        <input
                          id={phoneInputId}
                          ref={phoneRef}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          dir="ltr"
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="09123456789"
                          aria-invalid={phoneError ? "true" : undefined}
                          aria-describedby={phoneError ? phoneErrorId : undefined}
                          className="min-w-0 flex-1 bg-transparent text-left text-lg font-semibold tracking-[0.08em] text-slate-900 outline-none placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-300"
                        />
                      </div>
                      <FieldError id={phoneErrorId}>{phoneError}</FieldError>
                      {!phoneError && (
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          کد تایید به همین شماره پیامک می‌شود. نمونه: ۰۹۱۲۳۴۵۶۷۸۹
                        </p>
                      )}
                    </div>

                    <div className="mt-6">
                      <SubmitButton
                        icon={ArrowLeft}
                        isLoading={isSending}
                        loadingLabel="در حال ارسال کد…"
                      >
                        ارسال کد تایید
                      </SubmitButton>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  custom={direction}
                  variants={reduceMotion ? undefined : stepVariants}
                  initial={reduceMotion ? false : "enter"}
                  animate={reduceMotion ? undefined : "center"}
                  exit={reduceMotion ? undefined : "exit"}
                  transition={{ duration: 0.32, ease: easing }}
                >
                  <form onSubmit={handleVerifyOTP} noValidate>
                    <div className="mt-7">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                          <KeyRound size={20} aria-hidden="true" />
                        </span>
                        <button
                          type="button"
                          onClick={handleEditPhone}
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          ویرایش شماره موبایل
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </div>

                      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                        کد تایید را وارد کنید
                      </h1>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        کد {toPersianDigits(otpLength)} رقمی ارسال شده به{" "}
                        <span dir="ltr" className="inline-block font-semibold text-slate-900">
                          {formatIranianPhone(phone)}
                        </span>{" "}
                        را وارد کنید.
                      </p>
                    </div>

                    <div className="mt-6" dir="ltr">
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        {digits.map((digit, index) => (
                          <input
                            key={index}
                            ref={(element) => {
                              otpRefs.current[index] = element;
                            }}
                            type="text"
                            inputMode="numeric"
                            autoComplete={index === 0 ? "one-time-code" : "off"}
                            maxLength={otpLength}
                            value={digit}
                            onChange={(event) => handleDigitChange(index, event.target.value)}
                            onKeyDown={(event) => handleDigitKeyDown(index, event)}
                            onFocus={(event) => event.target.select()}
                            aria-label={`رقم ${toPersianDigits(index + 1)} کد تایید`}
                            aria-invalid={codeError ? "true" : undefined}
                            aria-describedby={codeError ? otpErrorId : undefined}
                            className={`size-12 rounded-2xl border bg-white text-center text-xl font-bold text-slate-900 outline-none transition focus:ring-4 sm:size-14 ${
                              codeError
                                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/10"
                                : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10"
                            } ${digit ? "border-slate-300" : ""}`}
                          />
                        ))}
                      </div>
                      <div dir="rtl">
                        <FieldError id={otpErrorId}>{codeError}</FieldError>
                      </div>
                    </div>

                    <div className="mt-6">
                      <SubmitButton
                        icon={ShieldCheck}
                        isLoading={isVerifying}
                        loadingLabel="در حال بررسی کد…"
                      >
                        تایید کد
                      </SubmitButton>
                    </div>

                    <div className="mt-5 text-center text-sm">
                      {secondsLeft > 0 ? (
                        <p className="text-slate-500">
                          ارسال مجدد کد تا{" "}
                          <span dir="ltr" className="font-semibold tabular-nums text-slate-700">
                            {formatTimer(secondsLeft)}
                          </span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={isResending}
                          className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:text-slate-400"
                        >
                          {isResending ? (
                            <Loader2 size={15} aria-hidden="true" className="animate-spin" />
                          ) : (
                            <RotateCcw size={15} aria-hidden="true" />
                          )}
                          درخواست مجدد کد
                        </button>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-[11px] leading-5 text-slate-500">
              <Lock size={13} aria-hidden="true" className="shrink-0 text-slate-400" />
              <p>
                ورود شما امن است. با ادامه،{" "}
                <Link to="/about" className="font-semibold text-slate-700 transition hover:text-indigo-600">
                  قوانین و شرایط
                </Link>{" "}
                فروشگاه را می‌پذیرید.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
