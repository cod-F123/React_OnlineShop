import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white">
      <div className="aspect-4/5 animate-pulse bg-slate-100" />
      <div className="space-y-3 p-5">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-3.5 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-slate-100" />
        <div className="h-5 w-28 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

export default function FeaturedProducts({
  data,
  isLoading = false,
  heading = "محصولات ویژه",
  eyebrow = "منتخب این هفته",
  limit = 8,
}) {
  const products = useMemo(() => {
    const list = Array.isArray(data) ? data : data?.results;
    return Array.isArray(list) ? list.slice(0, limit) : [];
  }, [data, limit]);

  return (
    <section aria-labelledby="featured-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold text-indigo-600">{eyebrow}</p>
            <h2 id="featured-heading" className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              پرطرفدارترین و پرفروش‌ترین محصولات این هفته را با بهترین قیمت ببینید.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-900/25 hover:text-slate-900"
          >
            مشاهده همه
            <ArrowLeft
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        </Reveal>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : products.length ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.id ?? product.slug ?? index} delay={index * 0.05} y={22} amount={0.1} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
            فعلاً محصول ویژه‌ای برای نمایش وجود ندارد. کمی بعد دوباره سر بزنید.
          </p>
        )}
      </div>
    </section>
  );
}
