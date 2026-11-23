import { Link } from "react-router-dom";
import { ArrowLeft, ImageOff } from "lucide-react";
import Reveal from "./Reveal";
import { toPersianDigits } from "../../lib/phone";

export default function CategoryShowcase({ categories = [] }) {
  if (!categories.length) return null;

  const items = categories.slice(0, 5);

  return (
    <section aria-labelledby="category-heading" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-xs font-bold text-indigo-600">خرید بر اساس دسته‌بندی</p>
          <h2 id="category-heading" className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            همه‌چیز، دسته‌بندی‌شده و منظم
          </h2>
        </div>
        <Link
          to="/shop"
          className="group inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition hover:text-indigo-600"
        >
          مشاهده همه محصولات
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </Link>
      </Reveal>

      <div className="mt-10 grid auto-rows-[minmax(11rem,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((category, index) => (
          <Reveal
            key={category.name}
            delay={index * 0.06}
            amount={0.15}
            className={`h-full ${index === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}
          >
            <Link
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative flex h-full min-h-[11rem] flex-col justify-end overflow-hidden rounded-3xl border border-slate-900/5 bg-slate-900 p-6 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.9)]"
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover opacity-90 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-700 to-slate-900 text-slate-500">
                  <ImageOff size={40} aria-hidden="true" />
                </span>
              )}

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent transition-opacity duration-500 group-hover:from-slate-950/90"
              />

              <div className="relative text-white">
                <p className="text-lg font-bold leading-7">{category.name}</p>
                <p className="mt-1 text-xs font-medium text-white/70">
                  {toPersianDigits(category.count)} محصول
                </p>
              </div>

              <span className="absolute end-5 top-5 grid size-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition duration-500 group-hover:opacity-100">
                <ArrowLeft size={16} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
