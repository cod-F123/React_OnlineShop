import { motion, useReducedMotion } from "framer-motion";
import { Compass, Gem, HeartHandshake, Leaf, ShieldCheck } from "lucide-react";
import Reveal from "../landing/Reveal";
import { toPersianDigits } from "../../lib/phone";

const values = [
  {
    icon: HeartHandshake,
    title: "مشتری‌محور",
    description: "هر تصمیم ما با یک پرسش شروع می‌شود: آیا این تجربه برای مشتری بهتر می‌شود؟",
  },
  {
    icon: Gem,
    title: "کیفیت بی‌کم‌وکاست",
    description: "تنها کالاهایی را عرضه می‌کنیم که خودمان با اطمینان از آن‌ها استفاده می‌کنیم.",
  },
  {
    icon: ShieldCheck,
    title: "صداقت و شفافیت",
    description: "قیمت، مشخصات و شرایط بازگشت، بدون ابهام و پنهان‌کاری روی صفحه هر محصول.",
  },
  {
    icon: Leaf,
    title: "پایداری و مسئولیت",
    description: "بسته‌بندی مسئولانه و همکاری با تامین‌کنندگان داخلی، برای ساختن آینده‌ای بهتر.",
  },
];

export default function MissionValues() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="mission-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
                <Compass size={13} aria-hidden="true" className="text-indigo-600" />
                ماموریت و ارزش‌ها
              </span>
              <h2
                id="mission-heading"
                className="mt-6 text-3xl font-black leading-[1.35] tracking-tight text-slate-900 sm:text-4xl"
              >
                چیزی که ما را
                <span className="font-display text-indigo-600"> متفاوت </span>
                می‌کند
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              <p className="text-lg leading-9 text-slate-600 sm:text-xl sm:leading-10">
                ماموریت ما ساده است: خرید آنلاین باید به‌اندازه کیفیت کالا مهم باشد. فناوری،
                لجستیک و پشتیبانی پرایم شاپ حول یک هدف سازمان یافته‌اند تا از لحظه جست‌وجو تا
                تحویل بسته، مطمئن و آرام باشید.
              </p>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-900/5 bg-slate-50 px-5 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-indigo-600">
                  <ShieldCheck size={18} aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold leading-7 text-slate-700">
                  اگر کالایی با توضیحات صفحه محصول هم‌خوانی نداشت، بازگشت آن بدون هیچ پرسشی انجام
                  می‌شود.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <li key={value.title}>
                <Reveal delay={index * 0.08} className="h-full">
                  <motion.article
                    whileHover={reduce ? undefined : { y: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-900/5 bg-white p-7 shadow-[0_30px_60px_-52px_rgba(15,23,42,0.55)]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -end-4 -top-5 text-6xl font-black text-slate-900/[0.05]"
                    >
                      {toPersianDigits(String(index + 1).padStart(2, "0"))}
                    </span>

                    <span className="grid size-12 place-items-center rounded-2xl bg-slate-900 text-white transition-colors duration-300 group-hover:bg-indigo-600">
                      <Icon size={20} aria-hidden="true" />
                    </span>

                    <h3 className="mt-6 text-base font-extrabold text-slate-900">{value.title}</h3>
                    <p className="mt-2.5 text-sm leading-7 text-slate-600">{value.description}</p>

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-right scale-x-0 bg-gradient-to-l from-indigo-500 to-violet-500 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </motion.article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
