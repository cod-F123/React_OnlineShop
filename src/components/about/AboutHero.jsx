import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Headset, Quote, Sparkles } from "lucide-react";
import Reveal from "../landing/Reveal";

const promises = [
  {
    icon: BadgeCheck,
    title: "اصالت تضمین‌شده",
    description: "همه کالاها اورجینال و همراه ضمانت بازگشت",
  },
  {
    icon: Headset,
    title: "پشتیبانی انسانی",
    description: "پاسخ‌گویی واقعی، ۲۴ ساعته و ۷ روز هفته",
  },
];

function FloatingCard({ className = "", children, delay = 0, reduce }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: reduce ? 0 : [0, -9, 0] }}
      transition={
        reduce
          ? { duration: 0.6, delay }
          : {
              opacity: { duration: 0.6, delay },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
      className={`absolute flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.55)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(58rem_40rem_at_84%_-16%,rgba(99,102,241,0.20),transparent_62%),radial-gradient(40rem_30rem_at_2%_24%,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="bg-grid mask-fade-center absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur">
              <Sparkles size={13} aria-hidden="true" className="text-indigo-600" />
              ده سال در کنار شما
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.75rem] font-black leading-[1.12] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem]">
              داستان <span className="font-display text-indigo-600">ما</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              پرایم شاپ از یک ایده ساده آغاز شد: خرید آنلاین باید همان اطمینان خرید حضوری را بسازد.
              از سال ۱۳۹۵ در همین مسیر گام برمی‌داریم؛ کالای اصل، قیمت منصفانه و تجربه‌ای که دوست
              دارید تکرارش کنید.
            </p>
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
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-full border border-slate-900/15 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition hover:border-slate-900/25 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              گفت‌وگو با ما
            </Link>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-12 grid max-w-lg gap-5 border-t border-slate-900/10 pt-8 sm:grid-cols-2">
              {promises.map((promise) => {
                const Icon = promise.icon;

                return (
                  <li key={promise.title} className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-indigo-600 shadow-[0_18px_35px_-28px_rgba(15,23,42,0.9)]">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="text-sm">
                      <span className="block font-bold text-slate-900">{promise.title}</span>
                      <span className="mt-0.5 block text-xs leading-6 text-slate-500">
                        {promise.description}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} y={36} className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 rounded-[3.5rem] bg-gradient-to-br from-indigo-200/60 via-violet-100/50 to-sky-100/70 blur-2xl"
          />

          <div className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] border border-white/70 bg-slate-950 shadow-[0_50px_90px_-45px_rgba(15,23,42,0.55)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(28rem_22rem_at_78%_6%,rgba(99,102,241,0.55),transparent_62%),radial-gradient(24rem_20rem_at_10%_88%,rgba(139,92,246,0.45),transparent_66%)]"
            />
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-[0.12]" />
            <div
              aria-hidden="true"
              className="absolute -end-20 top-12 size-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -end-8 top-24 size-40 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -start-16 bottom-8 size-52 rounded-full bg-indigo-500/20 blur-3xl"
            />

            <div className="relative flex size-full flex-col justify-between p-7 sm:p-9">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur">
                <Quote size={12} aria-hidden="true" />
                مانیفست پرایم شاپ
              </span>

              <div>
                <p className="text-2xl font-black leading-[1.6] text-white sm:text-[1.75rem]">
                  ما فروشگاهی ساختیم که خودمان دوست داریم از آن خرید کنیم؛ شفاف، سریع و قابل
                  اعتماد.
                </p>
                <p className="mt-5 text-sm font-medium text-slate-400">
                  تیم پرایم شاپ، از ۱۳۹۵ تا امروز
                </p>
              </div>
            </div>
          </div>

          <FloatingCard reduce={reduce} delay={0.5} className="-start-3 bottom-16 sm:-start-8">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <BadgeCheck size={17} aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold leading-tight text-slate-800">
              اصالت تضمین‌شده
              <span className="block text-[11px] font-medium text-slate-500">
                ضمانت اورجینال بودن کالا
              </span>
            </span>
          </FloatingCard>

          <FloatingCard reduce={reduce} delay={0.8} className="-end-2 top-10 sm:-end-6">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Headset size={17} aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold leading-tight text-slate-800">
              پشتیبانی ۲۴ ساعته
              <span className="block text-[11px] font-medium text-slate-500">
                در تمام روزهای هفته
              </span>
            </span>
          </FloatingCard>
        </Reveal>
      </div>
    </section>
  );
}
