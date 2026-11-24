import { Package, ShoppingBag } from "lucide-react";
import { formatToman } from "../../lib/format";
import { toPersianDigits } from "../../lib/phone";
import OrderProductItem from "../OrderProductItem";

export default function OrderItemsList({ items = [], totalAmount }) {
  return (
    <section aria-labelledby="ordered-items-heading" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-50px_rgba(15,23,42,0.55)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <Package size={18} aria-hidden="true" />
          </span>
          <div>
            <h2 id="ordered-items-heading" className="text-sm font-black text-slate-900">محصولات سفارش</h2>
            <p className="mt-1 text-[10px] text-slate-500">{toPersianDigits(items.length)} ردیف کالا</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500">
          <ShoppingBag size={13} aria-hidden="true" />
          جزئیات خرید
        </span>
      </div>

      {items.length > 0 ? (
        <div className="divide-y divide-slate-100 px-4 sm:px-6">
          {items.map((item, index) => (
            <OrderProductItem key={item.id ?? item.product?.id ?? index} item={item} />
          ))}
        </div>
      ) : (
        <p className="px-6 py-10 text-center text-sm text-slate-500">محصولی برای این سفارش ثبت نشده است.</p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
        <span className="text-xs font-bold text-slate-600">جمع کل محصولات</span>
        <span className="text-sm font-black text-slate-950">{formatToman(totalAmount)}</span>
      </div>
    </section>
  );
}
