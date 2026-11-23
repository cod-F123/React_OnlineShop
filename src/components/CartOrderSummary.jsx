import { LoaderCircle, LockKeyhole, TicketPercent, Truck } from "lucide-react";
import { formatToman } from "../lib/format";

function SummaryRow({ label, value, subdued = false }) {
  return (
    <div className={`flex items-center justify-between gap-4 text-xs ${subdued ? "text-slate-500" : "text-slate-700"}`}>
      <span>{label}</span>
      <span className="font-bold tabular-nums text-slate-900">{value}</span>
    </div>
  );
}

export default function CartOrderSummary({
  subtotal,
  discount = 0,
  shipping,
  total,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  onCheckout,
  isLoading,
}) {
  return (
    <aside aria-labelledby="order-summary-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_28px_65px_-48px_rgba(15,23,42,0.45)] sm:p-6 lg:sticky lg:top-28">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-slate-950 text-white">
          <TicketPercent size={18} aria-hidden="true" />
        </span>
        <div>
          <h2 id="order-summary-heading" className="text-base font-black text-slate-900">خلاصه سفارش</h2>
          <p className="mt-0.5 text-[10px] text-slate-500">جزئیات مبلغ قابل پرداخت</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <SummaryRow label="جمع کل محصولات" value={formatToman(subtotal)} />
        <SummaryRow label="تخفیف" value={formatToman(discount)} subdued />
        <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5"><Truck size={14} aria-hidden="true" /> هزینه ارسال</span>
          <span className="font-bold tabular-nums text-slate-900">{formatToman(shipping)}</span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
        <label htmlFor="cart-coupon" className="text-xs font-bold text-slate-800">وارد کردن کد تخفیف</label>
        <div className="mt-2 flex gap-2">
          <input
            id="cart-coupon"
            type="text"
            value={couponCode}
            onChange={(event) => onCouponCodeChange(event.target.value)}
            placeholder="کد تخفیف شما"
            className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            disabled={!couponCode.trim() || isLoading}
            className="shrink-0 rounded-xl bg-slate-200 px-3 text-xs font-bold text-slate-500 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            اعمال
          </button>
        </div>
        <p className="mt-2 text-[10px] leading-5 text-slate-500">اعمال کد تخفیف پس از اتصال سرویس تخفیف در دسترس خواهد بود.</p>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-600">جمع کل نهایی</p>
            <p className="mt-1 text-[10px] text-slate-400">شامل هزینه ارسال</p>
          </div>
          <p className="text-end text-lg font-black leading-tight text-slate-950 sm:text-xl">{formatToman(total)}</p>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          disabled={isLoading}
          className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-black text-white shadow-[0_14px_30px_-16px_rgba(79,70,229,0.8)] transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-70"
        >
          {isLoading ? <LoaderCircle size={17} aria-hidden="true" className="animate-spin" /> : null}
          {isLoading ? "در حال ثبت سفارش…" : "ادامه جهت تسویه حساب"}
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <LockKeyhole size={12} aria-hidden="true" />
          پرداخت شما در محیط امن انجام می‌شود.
        </p>
      </div>
    </aside>
  );
}
