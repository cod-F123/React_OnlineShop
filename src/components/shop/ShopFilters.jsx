import { useMemo } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { toPersianDigits } from "../../lib/phone";

export default function ShopFilters({
  categories = [],
  filters,
  onChange,
  onReset,
  mobile = false,
}) {
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count += 1;
    if (filters.minPrice || filters.maxPrice) count += 1;
    if (filters.ordering) count += 1;
    return count;
  }, [filters.category, filters.minPrice, filters.maxPrice, filters.ordering]);

  return (
    <aside
      aria-label="فیلتر محصولات"
      className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_55px_-48px_rgba(15,23,42,0.45)] ${mobile ? "" : "sticky top-28"}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <SlidersHorizontal size={16} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-black text-slate-900">فیلترها</h2>
            <p className="mt-0.5 text-[10px] text-slate-500">
              {activeFilterCount ? `${toPersianDigits(activeFilterCount)} فیلتر فعال` : "انتخاب و مرتب‌سازی"}
            </p>
          </div>
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 transition hover:text-rose-600"
          >
            <RotateCcw size={13} aria-hidden="true" />
            پاک‌سازی
          </button>
        )}
      </div>

      <div className="space-y-6 pt-5">
        <fieldset>
          <legend className="text-xs font-black text-slate-800">دسته‌بندی</legend>
          <div className="mt-3 max-h-56 space-y-1 overflow-y-auto pe-1">
            <label className="flex cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs text-slate-600 transition hover:bg-slate-50">
              <input
                type="radio"
                name={mobile ? "mobile-category" : "category"}
                checked={!filters.category}
                onChange={() => onChange("category", "")}
                className="size-4 accent-indigo-600"
              />
              همه دسته‌ها
            </label>
            {categories.map((category) => (
              <label
                key={category.name}
                className="flex cursor-pointer items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-xs text-slate-600 transition hover:bg-slate-50"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <input
                    type="radio"
                    name={mobile ? "mobile-category" : "category"}
                    checked={filters.category === category.name}
                    onChange={() => onChange("category", category.name)}
                    className="size-4 shrink-0 accent-indigo-600"
                  />
                  <span className="truncate">{category.name}</span>
                </span>
                {category.count > 0 && (
                  <span className="text-[10px] text-slate-400">{toPersianDigits(category.count)}</span>
                )}
              </label>
            ))}
            {categories.length === 0 && (
              <p className="px-2.5 py-2 text-[11px] leading-6 text-slate-400">دسته‌بندی‌ها پس از دریافت کالاها نمایش داده می‌شوند.</p>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-black text-slate-800">محدوده قیمت</legend>
          <p className="mt-1 text-[10px] leading-5 text-slate-500">مبالغ به تومان هستند.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="block">
              <span className="sr-only">حداقل قیمت</span>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={filters.minPrice}
                onChange={(event) => onChange("minPrice", event.target.value)}
                placeholder="از"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </label>
            <label className="block">
              <span className="sr-only">حداکثر قیمت</span>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={filters.maxPrice}
                onChange={(event) => onChange("maxPrice", event.target.value)}
                placeholder="تا"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => onChange("applyPrice", true)}
            className="mt-2.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            اعمال محدوده قیمت
          </button>
        </fieldset>

        <fieldset>
          <label htmlFor={mobile ? "mobile-shop-ordering" : "shop-ordering"} className="text-xs font-black text-slate-800">
            مرتب‌سازی
          </label>
          <select
            id={mobile ? "mobile-shop-ordering" : "shop-ordering"}
            value={filters.ordering}
            onChange={(event) => onChange("ordering", event.target.value)}
            className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          >
            <option value="">پیش‌فرض</option>
            <option value="added_at">جدیدترین</option>
            <option value="price">ارزان‌ترین</option>
            <option value="-price">گران‌ترین</option>
          </select>
        </fieldset>
      </div>
    </aside>
  );
}
