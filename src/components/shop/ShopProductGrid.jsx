import { motion, useReducedMotion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import ShopProductCard from "./ShopProductCard";

function ProductSkeleton({ index }) {
  return (
    <div
      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="aspect-[4/4.5] animate-pulse bg-slate-100" />
      <div className="space-y-3 p-4 sm:p-5">
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-slate-100" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="h-5 w-1/3 animate-pulse rounded-full bg-slate-100" />
          <div className="size-10 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export default function ShopProductGrid({ products = [], isLoading = false, onClearFilters }) {
  const reduceMotion = useReducedMotion();

  if (isLoading) {
    return (
      <div aria-label="در حال بارگذاری محصولات" aria-busy="true" className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} index={index} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-slate-100 text-slate-400">
          <PackageSearch size={29} aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-lg font-black text-slate-900">محصولی یافت نشد</h2>
        <p className="mx-auto mt-2 max-w-md text-xs leading-7 text-slate-500">
          فیلترها یا عبارت جست‌وجو را تغییر دهید تا محصولات بیشتری ببینید.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-5 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-indigo-600"
          >
            پاک‌کردن فیلترها
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id ?? product.slug ?? index}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: Math.min(index * 0.045, 0.27), ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          <ShopProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
