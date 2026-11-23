import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ImageOff, Sparkles, Star, Truck } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { value: "۱۲ هزار+", label: "مشتری راضی" },
  { value: "۴٫۹", label: "میانگین امتیاز" },
  { value: "۴۸ ساعت", label: "ارسال سراسری" },
];

function FloatingCard({ className = "", children, delay = 0, reduce }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: reduce ? 0 : [0, -10, 0] }}
      transition={
        reduce
          ? { duration: 0.6, delay }
          : { opacity: { duration: 0.6, delay }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay } }
      }
      className={`absolute flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.55)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({
  image = null,
  eyebrow = "کالکشن جدید · پاییز ۱۴۰۵",
  title = "هر روز، یک انتخاب خاص",
  subtitle = "گزیده‌ای محدود از محصولات منتخب؛ با ارسال سریع، پرداخت امن و بازگشت آسان کالا. ارسال رایگان برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان.",
}) {
  const reduce = useReducedMotion();
  const words = title.trim().split(" ");
  const accent = words.length > 1 ? words.pop() : "";
  const lead = words.join(" ");

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(62rem_42rem_at_18%_-12%,rgba(99,102,241,0.18),transparent_62%),radial-gradient(42rem_32rem_at_108%_18%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="bg-grid mask-fade-center absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur">
              <Sparkles size={13} aria-hidden="true" className="text-indigo-600" />
              {eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.5rem] font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {lead}{" "}
              {accent && <span className="font-display text-indigo-600">{accent}</span>}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{subtitle}</p>
          </Reveal>

          <Reveal delay={0.24} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.8)] transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full ring-2 ring-indigo-400/70"
                  animate={{ opacity: [0.65, 0, 0.65], scale: [1, 1.09, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span className="relative">شروع خرید</span>
              <ArrowLeft
                size={17}
                aria-hidden="true"
                className="relative transition-transform duration-300 group-hover:-translate-x-1"
              />
            </Link>

            <Link
              to="/shop?ordering=-discount"
              className="inline-flex items-center justify-center rounded-full border border-slate-900/15 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition hover:border-slate-900/25 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              مشاهده تخفیف‌ها
            </Link>
          </Reveal>

          <Reveal delay={0.32}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-900/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{stat.value}</dd>
                  <dd className="mt-1 text-xs font-medium text-slate-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={36} className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 rounded-[3.5rem] bg-gradient-to-br from-indigo-200/50 via-white to-sky-100/60 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-slate-100 shadow-[0_50px_90px_-45px_rgba(15,23,42,0.5)]">
            <div className="aspect-4/5">
              {image ? (
                <img
                  src={image}
                  alt=""
                  loading="eager"
                  fetchPriority="high"
                  className="size-full object-cover"
                />
              ) : (
                <div className="grid size-full place-items-center bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-300">
                  <ImageOff size={56} aria-hidden="true" />
                </div>
              )}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/60 to-transparent"
            />
            <div className="absolute inset-x-6 bottom-6 text-white">
              <p className="text-xs font-semibold text-white/75">پیشنهاد ویژه</p>
              <p className="mt-1 text-lg font-bold leading-7">محصولاتی که این روزها همه درباره‌شان حرف می‌زنند</p>
            </div>
          </div>

          <FloatingCard reduce={reduce} delay={0.5} className="-start-3 bottom-24 sm:-start-8">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <Truck size={17} aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold leading-tight text-slate-800">
              ارسال رایگان
              <span className="block text-[11px] font-medium text-slate-500">برای سفارش‌های بالای ۵۰۰٬۰۰۰</span>
            </span>
          </FloatingCard>

          <FloatingCard reduce={reduce} delay={0.8} className="-end-2 top-10 sm:-end-6">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-500">
              <Star size={17} aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold leading-tight text-slate-800">
              امتیاز ۴٫۹ از ۵
              <span className="block text-[11px] font-medium text-slate-500">۲٬۴۰۰+ نظر ثبت‌شده</span>
            </span>
          </FloatingCard>
        </Reveal>
      </div>
    </section>
  );
}
