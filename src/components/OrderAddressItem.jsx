import { Check, MapPin } from "lucide-react";
import { toPersianDigits } from "../lib/phone";

function OrderAddressItem({ address, onClickHandler, isSelected = false }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onClickHandler(address.id)}
        aria-pressed={isSelected}
        className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-start transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
          isSelected
            ? "border-indigo-300 bg-indigo-50/70 shadow-sm"
            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
          <MapPin size={16} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-xs font-black text-slate-900">{address.title}</span>
            {isSelected && <Check size={15} aria-hidden="true" className="shrink-0 text-indigo-600" />}
          </span>
          <span className="mt-1 block text-[10px] leading-5 text-slate-500">{address.address}</span>
          {address.zip_code && (
            <span className="mt-1 block text-[10px] text-slate-400">
              کد پستی: <span dir="ltr">{toPersianDigits(address.zip_code)}</span>
            </span>
          )}
        </span>
      </button>
    </li>
  );
}

export default OrderAddressItem;
