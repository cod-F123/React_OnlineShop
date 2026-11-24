import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Reveal from "../landing/Reveal";

export default function AboutCTA() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-14 sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(34rem_20rem_at_88%_-20%,rgba(99,102,241,0.55),transparent_65%),radial-gradient(30rem_18rem_at_4%_120%,rgba(139,92,246,0.4),transparent_68%)]"
            />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 className="text-2xl font-black leading-[1.4] tracking-tight text-white sm:text-3xl">
                  آماده‌اید خرید بعدی‌تان را با اطمینان انجام دهید؟
                </h2>
                <p className="mt-4 text-sm leading-8 text-slate-400 sm:text-base">
                  کالکشن کامل پرایم شاپ را ببینید یا اگر پرسشی دارید، همین حالا با تیم ما گفت‌وگو
                  کنید.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  ورود به فروشگاه
                  <ArrowLeft
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </Link>

                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  تماس با ما
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
