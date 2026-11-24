import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Quote } from "lucide-react";
import Reveal from "../landing/Reveal";

const milestones = [
  {
    year: "۱۳۹۵",
    title: "شروع با یک ایده ساده",
    description:
      "پرایم شاپ با یک انبار کوچک و سه همکار آغاز شد. هدف روشن بود: کالای اصل، قیمت منصفانه و پاسخ‌گویی درست.",
  },
  {
    year: "۱۳۹۷",
    title: "نخستین انبار اختصاصی",
    description:
      "با رشد سفارش‌ها، فرایند بسته‌بندی و ارسال را درون تیم خودمان سازمان دادیم و زمان تحویل را به ۴۸ ساعت رساندیم.",
  },
  {
    year: "۱۳۹۹",
    title: "پشتیبانی شبانه‌روزی",
    description:
      "پشتیبانی انسانی در تمام ساعات شبانه‌روز راه‌اندازی شد تا هیچ پرسشی، حتی نیمه‌شب، بی‌پاسخ نماند.",
  },
  {
    year: "۱۴۰۱",
    title: "تجربه خرید تازه",
    description:
      "نسخه تازه فروشگاه با جست‌وجوی دقیق‌تر، فیلترهای هوشمند و پرداخت امن‌تر منتشر شد؛ سریع‌تر از همیشه.",
  },
  {
    year: "۱۴۰۵",
    title: "بیش از ۵۰ هزار سفارش موفق",
    description:
      "امروز به مشتریان در ۳۱ استان خدمت می‌کنیم و همان مسیر را با جدیت ادامه می‌دهیم: ساختن تجربه‌ای که اعتمادآفرین باشد.",
  },
];

export default function BrandStory() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="story-heading" className="bg-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600">
              <BookOpen size={13} aria-hidden="true" className="text-indigo-600" />
              داستان ما
            </span>

            <h2
              id="story-heading"
              className="mt-6 text-3xl font-black leading-[1.35] tracking-tight text-slate-900 sm:text-4xl"
            >
              از یک ایده تا برندی که به آن اعتماد می‌کنید
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              مسیر پرایم شاپ، مسیر رشد یک کسب‌وکار کوچک نیست؛ مسیر ساختن یک استاندارد تازه در
              خرید آنلاین است. هر سال، یک قدم جدی‌تر برداشته‌ایم.
            </p>

            <figure className="mt-8 rounded-3xl border border-slate-900/5 bg-white p-6 shadow-[0_30px_60px_-52px_rgba(15,23,42,0.55)]">
              <Quote size={22} aria-hidden="true" className="text-indigo-500" />
              <blockquote className="mt-4 text-base font-bold leading-8 text-slate-800">
                ما باور داریم خرید آنلاین باید همان اعتماد خرید حضوری را بسازد؛ نه کمتر، نه بیشتر.
              </blockquote>
              <figcaption className="mt-3 text-xs font-medium text-slate-500">
                تیم بنیان‌گذار پرایم شاپ
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute inset-y-3 start-[9px] w-px bg-gradient-to-b from-indigo-500/60 via-slate-900/15 to-transparent"
          />

          {milestones.map((milestone, index) => (
            <li key={milestone.year} className="relative ps-10 pb-10 last:pb-0">
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                className="absolute start-0 top-1.5 grid size-5 place-items-center rounded-full border-2 border-slate-50 bg-indigo-600"
              >
                <span className="size-1.5 rounded-full bg-white" />
              </motion.span>

              <Reveal delay={index * 0.06} y={22}>
                <div className="rounded-3xl border border-slate-900/5 bg-white p-6 shadow-[0_30px_60px_-55px_rgba(15,23,42,0.6)] transition duration-300 hover:-translate-y-1 hover:border-indigo-200">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
                    {milestone.year}
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-slate-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{milestone.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
