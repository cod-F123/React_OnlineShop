import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ImageOff, Minus, Plus, Trash2 } from "lucide-react";
import { formatToman, toAmount } from "../lib/format";
import { toPersianDigits } from "../lib/phone";

function CartItem({ item, updateQtyHandler, removeItemHandler, disabled = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const quantity = Math.max(1, Number(item.quantity) || 1);
  const unitPrice = toAmount(item.price) ?? 0;
  const itemTotal = unitPrice * quantity;
  const productPath = `/product/${item.product}`;

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: 18, scale: 0.98 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_-40px_rgba(15,23,42,0.5)] transition hover:border-slate-300 sm:p-5"
    >
      <div className="flex gap-4 sm:gap-5">
        <Link
          to={productPath}
          aria-label={`مشاهده ${item.title}`}
          className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:size-32"
        >
          {item.image && !imageFailed ? (
            <img
              src={item.image}
              alt={item.title || ""}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="size-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="grid size-full place-items-center text-slate-300">
              <ImageOff size={24} aria-hidden="true" />
            </span>
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link to={productPath} className="line-clamp-2 text-sm font-black leading-6 text-slate-900 transition hover:text-indigo-600 sm:text-base">
                {item.title}
              </Link>
              <p className="mt-1.5 text-[11px] text-slate-500">قیمت هر عدد</p>
              <p className="mt-0.5 text-xs font-bold text-slate-700">{formatToman(unitPrice)}</p>
            </div>
            <button
              type="button"
              onClick={() => removeItemHandler(item.product)}
              disabled={disabled}
              aria-label={`حذف ${item.title} از سبد خرید`}
              className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:cursor-wait disabled:opacity-40"
            >
              <Trash2 size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
            <div className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => quantity > 1 && updateQtyHandler(item.product, quantity - 1)}
                disabled={disabled || quantity <= 1}
                aria-label={`کاهش تعداد ${item.title}`}
                className="grid size-8 place-items-center rounded-lg text-slate-600 transition hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                <Minus size={14} aria-hidden="true" />
              </button>
              <span className="min-w-9 px-1 text-center text-xs font-black tabular-nums text-slate-900" aria-live="polite">
                {toPersianDigits(quantity)}
              </span>
              <button
                type="button"
                onClick={() => quantity < 10 && updateQtyHandler(item.product, quantity + 1)}
                disabled={disabled || quantity >= 10}
                aria-label={`افزایش تعداد ${item.title}`}
                className="grid size-8 place-items-center rounded-lg text-slate-600 transition hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                <Plus size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="text-end">
              <p className="text-[10px] text-slate-500">جمع این کالا</p>
              <p className="mt-1 text-sm font-black text-slate-950 sm:text-base">{formatToman(itemTotal)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default CartItem;
