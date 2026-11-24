import { motion, useReducedMotion } from "framer-motion";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import Reveal from "../landing/Reveal";

const details = [
  {
    icon: Phone,
    label: "شماره تماس",
    value: "۰۲۱ ۱۲۳۴ ۵۶۷۸",
    hint: "شنبه تا پنجشنبه، ۹ تا ۱۸",
    href: "tel:+982112345678",
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: "support@p-shop.ir",
    hint: "پاسخ در کمتر از ۲۴ ساعت",
    href: "mailto:support@p-shop.ir",
    ltr: true,
  },
  {
    icon: MapPin,
    label: "آدرس دفتر",
    value: "تهران، خیابان مثال، پلاک ۱۲۳",
    hint: "طبقه سوم، واحد ۳۰۲",
  },
  {
    icon: Clock,
    label: "ساعات کاری",
    value: "۹:۰۰ تا ۱۸:۰۰",
    hint: "پشتیبانی آنلاین ۲۴ ساعته",
  },
];

export default function ContactInfo() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <span className="text-xs font-bold text-indigo-600">راه‌های ارتباطی</span>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            مستقیم با ما در تماس باشید
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            اگر ترجیح می‌دهید سریع‌تر پاسخ بگیرید، از راه‌های زیر استفاده کنید.
          </p>
        </div>
      </Reveal>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {details.map((detail, index) => {
          const Icon = detail.icon;
          const content = (
            <>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white transition-colors duration-300 group-hover:bg-indigo-600">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold text-slate-500">
                  {detail.label}
                </span>
                <span
                  dir={detail.ltr ? "ltr" : undefined}
                  className={`mt-1 block text-sm font-bold leading-6 text-slate-900 transition-colors ${
                    detail.ltr ? "break-all text-start" : "break-words"
                  } ${detail.href ? "group-hover:text-indigo-700" : ""}`}
                >
                  {detail.value}
                </span>
                <span className="mt-1 block text-[11px] leading-5 text-slate-500">
                  {detail.hint}
                </span>
              </span>
            </>
          );

          return (
            <li key={detail.label}>
              <Reveal delay={index * 0.06} y={18} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="h-full rounded-2xl border border-slate-900/5 bg-white p-4 shadow-[0_24px_50px_-48px_rgba(15,23,42,0.6)] transition-colors hover:border-indigo-200"
                >
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="group flex items-start gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-start gap-3">{content}</div>
                  )}
                </motion.div>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <Reveal delay={0.12} y={22}>
        <div className="overflow-hidden rounded-3xl border border-slate-900/5 bg-white shadow-[0_30px_60px_-55px_rgba(15,23,42,0.6)]">
          <div
            role="img"
            aria-label="نقشه موقعیت دفتر مرکزی پرایم شاپ در تهران"
            className="relative h-52 overflow-hidden bg-[#eef1f6]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(18rem_12rem_at_72%_18%,rgba(99,102,241,0.16),transparent_68%),radial-gradient(16rem_12rem_at_12%_92%,rgba(56,189,248,0.14),transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.22) 1px, transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute -start-10 top-1/3 h-8 w-[130%] -rotate-6 rounded-full bg-white/80 shadow-[0_1px_0_rgba(148,163,184,0.25)]"
            />
            <div
              aria-hidden="true"
              className="absolute -start-6 top-[68%] h-5 w-[120%] rotate-3 rounded-full bg-white/70"
            />
            <div
              aria-hidden="true"
              className="absolute -top-10 end-[28%] h-[130%] w-6 rotate-12 rounded-full bg-white/80"
            />
            <div
              aria-hidden="true"
              className="absolute -top-6 end-[58%] h-[120%] w-3 -rotate-6 rounded-full bg-white/60"
            />

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/85 to-transparent" />

            <div className="absolute inset-0 grid place-items-center">
              <span className="relative grid place-items-center">
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute size-14 rounded-full bg-indigo-500/20"
                    animate={{ scale: [0.8, 1.5], opacity: [0.7, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className="relative grid size-12 place-items-center rounded-full bg-indigo-600 text-white shadow-[0_18px_35px_-15px_rgba(79,70,229,0.9)] ring-4 ring-white">
                  <MapPin size={20} aria-hidden="true" />
                </span>
              </span>
            </div>

            <span className="absolute bottom-4 start-4 inline-flex items-center gap-1.5 rounded-full border border-slate-900/5 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-sm backdrop-blur">
              <Navigation size={12} aria-hidden="true" className="text-indigo-600" />
              دفتر مرکزی پرایم شاپ
            </span>
          </div>

          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-extrabold text-slate-900">تهران، خیابان مثال، پلاک ۱۲۳</p>
              <p className="mt-1 text-xs leading-6 text-slate-500">
                برای مراجعه حضوری، لطفاً پیش از حضور هماهنگ کنید.
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent("تهران، خیابان مثال، پلاک ۱۲۳")}`}
              target="_blank"
              rel="noreferrer"
              aria-label="مسیریابی به دفتر مرکزی پرایم شاپ در گوگل مپ"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-900/10 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-900/25 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              <Navigation size={14} aria-hidden="true" />
              مسیریابی
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
