import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";
import Reveal from "../landing/Reveal";

const fieldBase =
  "w-full rounded-2xl border bg-white py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4";

function fieldClasses(hasError) {
  return `${fieldBase} ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-500/10"
      : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10"
  }`;
}

function FieldError({ id, message }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
      <AlertCircle size={13} aria-hidden="true" />
      {message}
    </p>
  );
}

export default function ContactForm({
  values,
  errors,
  loading,
  success,
  errorMsg,
  onChange,
  onSubmit,
}) {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={0.1} y={26}>
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/5 bg-white p-6 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.65)] sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-16 -top-20 size-48 rounded-full bg-indigo-50 blur-3xl"
        />

        <div className="relative">
          <span className="text-xs font-bold text-indigo-600">ارسال پیام</span>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            چه کاری می‌توانیم برایتان انجام دهیم؟
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            فرم زیر را تکمیل کنید؛ پیام شما مستقیم به تیم پشتیبانی می‌رسد.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          aria-busy={loading}
          className="relative mt-8 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-slate-800">
                نام و نام خانوادگی
              </label>
              <div className="relative">
                <User
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  dir="rtl"
                  value={values.name}
                  onChange={(event) => onChange("name", event.target.value)}
                  placeholder="مثلاً سارا محمدی"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={`${fieldClasses(errors.name)} ps-11 pe-4`}
                />
              </div>
              <FieldError id="contact-name-error" message={errors.name} />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-slate-800">
                ایمیل
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  value={values.email}
                  onChange={(event) => onChange("email", event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={`${fieldClasses(errors.email)} ps-11 pe-4 text-start`}
                />
              </div>
              <FieldError id="contact-email-error" message={errors.email} />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="contact-subject" className="block text-sm font-bold text-slate-800">
                موضوع
              </label>
              <span className="text-[11px] font-medium text-slate-400">اختیاری</span>
            </div>
            <div className="relative">
              <Tag
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="contact-subject"
                name="subject"
                type="text"
                dir="rtl"
                value={values.subject}
                onChange={(event) => onChange("subject", event.target.value)}
                placeholder="مثلاً پیگیری سفارش"
                className={`${fieldClasses(false)} ps-11 pe-4`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-slate-800">
              متن پیام
            </label>
            <div className="relative">
              <MessageSquare
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute start-4 top-4 text-slate-400"
              />
              <textarea
                id="contact-message"
                name="message"
                dir="rtl"
                rows={6}
                value={values.message}
                onChange={(event) => onChange("message", event.target.value)}
                placeholder="جزئیات پرسش یا درخواست خود را بنویسید…"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${fieldClasses(errors.message)} resize-y ps-11 pe-4 leading-7`}
              />
            </div>
            <FieldError id="contact-message-error" message={errors.message} />
          </div>

          <AnimatePresence initial={false} mode="wait">
            {success && (
              <motion.div
                key="success"
                initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5"
              >
                <motion.span
                  initial={reduce ? false : { scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"
                >
                  <CheckCircle2 size={17} aria-hidden="true" />
                </motion.span>
                <p className="pt-1 text-sm font-semibold leading-6 text-emerald-800">{success}</p>
              </motion.div>
            )}

            {errorMsg && (
              <motion.div
                key="error"
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                role="alert"
                className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rose-500 text-white">
                  <AlertCircle size={17} aria-hidden="true" />
                </span>
                <p className="pt-1 text-sm font-semibold leading-6 text-rose-800">{errorMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs leading-6 text-slate-500">
              <ShieldCheck size={15} aria-hidden="true" className="shrink-0 text-emerald-600" />
              اطلاعات شما فقط برای پاسخ‌گویی استفاده می‌شود.
            </p>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={reduce || loading ? undefined : { scale: 0.98 }}
              className="inline-flex w-full min-w-40 items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.8)] transition hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 size={17} aria-hidden="true" className="animate-spin" />
                  در حال ارسال…
                </>
              ) : (
                <>
                  ارسال پیام
                  <Send size={16} aria-hidden="true" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </Reveal>
  );
}
