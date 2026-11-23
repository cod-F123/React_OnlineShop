import { ChevronRight, ChevronLeft, MoreHorizontal } from "lucide-react";
import { toPersianDigits } from "../../lib/phone";

function pageFromUrl(url) {
  if (!url) return null;
  try {
    return Number(new URL(url, window.location.origin).searchParams.get("page")) || null;
  } catch {
    return null;
  }
}

export default function ShopPagination({ previous, next, page, count, pageSize, onNavigate }) {
  if (!previous && !next) return null;

  const currentPage = page || 1;
  const totalPages = Math.max(1, Math.ceil((count || 0) / (pageSize || 1)));
  const rangeStart = count ? (currentPage - 1) * pageSize + 1 : 0;
  const rangeEnd = Math.min(currentPage * pageSize, count || 0);

  return (
    <nav aria-label="صفحه‌بندی محصولات" className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
      <p className="text-[11px] text-slate-500">
        نمایش <span className="font-bold text-slate-800">{toPersianDigits(rangeStart)}–{toPersianDigits(rangeEnd)}</span> از <span className="font-bold text-slate-800">{toPersianDigits(count)}</span> محصول
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => previous && onNavigate(previous, pageFromUrl(previous))}
          disabled={!previous}
          aria-label="صفحه قبلی"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={15} aria-hidden="true" />
          قبلی
        </button>
        <span aria-current="page" className="grid size-10 place-items-center rounded-xl bg-slate-950 text-xs font-black text-white">
          {toPersianDigits(currentPage)}
        </span>
        {currentPage < totalPages && (
          <>
            <span className="text-slate-300"><MoreHorizontal size={16} aria-hidden="true" /></span>
            <span className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-500">
              {toPersianDigits(totalPages)}
            </span>
          </>
        )}
        <button
          type="button"
          onClick={() => next && onNavigate(next, pageFromUrl(next))}
          disabled={!next}
          aria-label="صفحه بعدی"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          بعدی
          <ChevronLeft size={15} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
