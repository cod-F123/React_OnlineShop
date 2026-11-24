import { motion, useReducedMotion } from "framer-motion";
import { Headset, MessageCircle, ShieldCheck } from "lucide-react";
import Reveal from "../landing/Reveal";

const highlights = [
  { icon: Headset, label: "پاسخ‌گویی انسانی" },
  { icon: ShieldCheck, label: "پیگیری تا حل مشکل" },
];

export default function ContactHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(52rem_34rem_at_82%_-18%,rgba(99,102,241,0.20),transparent_62%),radial-gradient(38rem_28rem_at_4%_22%,rgba(139,92,246,0.14),transparent_60%)]" />
        <div className="bg-grid mask-fade-center absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur">
                <MessageCircle size={13} aria-hidden="true" className="text-indigo-600" />
                همیشه در دسترس شما
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[2.75rem] font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                تماس با <span className="font-display text-indigo-600">ما</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                پرسشی درباره یک سفارش، محصول یا همکاری دارید؟ پیام‌تان را برای ما بنویسید؛ یک انسان
                واقعی آن را می‌خواند و در کوتاه‌ترین زمان پاسخ می‌دهد.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24} y={20}>
            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_30px_70px_-55px_rgba(15,23,42,0.6)] backdrop-blur-xl">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -end-10 -top-12 size-32 rounded-full bg-indigo-100/70 blur-2xl"
              />

              <div className="relative flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-slate-900 text-white">
                  <Headset size={19} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">میانگین پاسخ‌گویی</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    کمتر از یک روز کاری
                  </p>
                </div>
              </div>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li
                      key={item.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/5 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600"
                    >
                      <Icon size={12} aria-hidden="true" className="text-emerald-600" />
                      {item.label}
                    </li>
                  );
                })}
              </ul>

              <div className="relative mt-5 flex items-center gap-2 border-t border-slate-900/5 pt-4">
                <span className="relative flex size-2">
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inline-flex size-full rounded-full bg-emerald-400"
                      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs font-medium text-slate-500">
                  پشتیبانی آنلاین در حال حاضر فعال است
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
