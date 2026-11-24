import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Award, Headset, Package, Sparkles, Star, Users } from "lucide-react";
import Reveal from "../landing/Reveal";

const stats = [
  { icon: Package, to: 50000, suffix: "+", label: "سفارش موفق" },
  { icon: Users, to: 12000, suffix: "+", label: "مشتری وفادار" },
  { icon: Star, to: 98, suffix: "٪", label: "رضایت از خرید" },
  { icon: Award, to: 10, suffix: " سال", label: "تجربه در فروش آنلاین" },
];

function CountUp({ to, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return undefined;

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("fa-IR")}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section aria-labelledby="stats-heading" className="relative overflow-hidden bg-slate-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(48rem_30rem_at_78%_-10%,rgba(99,102,241,0.45),transparent_62%),radial-gradient(36rem_26rem_at_6%_110%,rgba(139,92,246,0.32),transparent_66%)]" />
        <div className="bg-grid absolute inset-0 opacity-[0.07]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
            <Sparkles size={13} aria-hidden="true" className="text-indigo-300" />
            آمار و دستاوردها
          </span>
          <h2
            id="stats-heading"
            className="mt-6 text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl"
          >
            پرایم شاپ در یک نگاه
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-400">
            عددها فقط عدد نیستند؛ روایتی از اعتماد مشتریان و تلاش تیم ما در طول سال‌هاست.
          </p>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Reveal key={stat.label} delay={index * 0.08} y={24} className="h-full">
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]">
                  <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-indigo-300">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </dd>
                  <dd className="mt-2 text-sm font-medium text-slate-400">{stat.label}</dd>
                </div>
              </Reveal>
            );
          })}
        </dl>

        <Reveal delay={0.24} className="mt-12 flex justify-center">
          <p className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300">
            <Headset size={18} aria-hidden="true" className="text-emerald-400" />
            پشتیبانی ۲۴ ساعته، ۷ روز هفته؛ همیشه یک انسان پاسخ‌گوی شماست.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
