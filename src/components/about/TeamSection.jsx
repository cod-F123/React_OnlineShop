import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Reveal from "../landing/Reveal";

const members = [
  {
    name: "امیرحسین رستگار",
    role: "بنیان‌گذار و مدیرعامل",
    initials: "ا.ر",
    tone: "from-indigo-500 via-violet-500 to-indigo-400",
  },
  {
    name: "نگار موسوی",
    role: "مدیر طراحی و تجربه کاربری",
    initials: "ن.م",
    tone: "from-violet-500 via-fuchsia-500 to-violet-400",
  },
  {
    name: "سعید کریمی",
    role: "مدیر فنی و زیرساخت",
    initials: "س.ک",
    tone: "from-sky-500 via-cyan-500 to-sky-400",
  },
  {
    name: "پریسا احمدی",
    role: "مدیر پشتیبانی و رضایت مشتری",
    initials: "پ.ا",
    tone: "from-emerald-500 via-teal-500 to-emerald-400",
  },
];

export default function TeamSection() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="team-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
            <Users size={13} aria-hidden="true" className="text-indigo-600" />
            معرفی تیم
          </span>
          <h2
            id="team-heading"
            className="mt-6 text-3xl font-black leading-[1.35] tracking-tight text-slate-900 sm:text-4xl"
          >
            آدم‌هایی که پرایم شاپ را
            <span className="font-display text-indigo-600"> می‌سازند</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            تیمی کوچک با استانداردهای بزرگ؛ از طراحی تجربه خرید تا انبار و پشتیبانی، همه در یک
            مسیر مشترک.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <li key={member.name}>
              <Reveal delay={index * 0.08} y={24} className="h-full">
                <motion.article
                  whileHover={reduce ? undefined : { y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-slate-900/5 bg-white p-7 text-center shadow-[0_30px_60px_-55px_rgba(15,23,42,0.6)]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-indigo-50/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <span className="relative grid size-24 place-items-center rounded-full bg-gradient-to-br from-indigo-100 via-violet-100 to-sky-100 p-1 transition-transform duration-300 group-hover:scale-105">
                    <span
                      className={`grid size-full place-items-center rounded-full bg-gradient-to-br ${member.tone} text-lg font-black text-white`}
                    >
                      {member.initials}
                    </span>
                  </span>

                  <h3 className="relative mt-6 text-base font-extrabold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="relative mt-1.5 text-sm leading-6 text-slate-500">{member.role}</p>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 bottom-0 h-0.5 origin-center scale-x-0 bg-gradient-to-l from-indigo-500 to-violet-500 transition-transform duration-300 group-hover:scale-x-100"
                  />
                </motion.article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link
            to="/contact-us"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-900/15 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900/30 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            دوست دارید به تیم ما بپیوندید؟
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
