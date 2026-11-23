import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ImageOff, Plus, ShoppingBag } from "lucide-react";
import useCart from "../../hooks/CartHook";
import useAlert from "../../hooks/AlertHook";
import { formatToman, getPricing, toAmount } from "../../lib/format";
import { toPersianDigits } from "../../lib/phone";

function isTrue(value) {
  return value === true || ["true", "1", "yes"].includes(String(value ?? "").trim().toLowerCase());
}

export default function ShopProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { checkCart, addCartItem, deleteCartItem } = useCart();
  const { setMessage, setTypeAlert } = useAlert();
  const pricing = getPricing(product);
  const onSale = isTrue(product.is_offed) && pricing.onSale;
  const finalPrice = onSale ? pricing.offedPrice : pricing.price;
  const stock = toAmount(product.stock);
  const available = stock === null ? isTrue(product.is_exist) : stock > 0;
  const productKey = product.id ?? product.slug ?? product.title;
  const inCart = checkCart(productKey);
  const discount = onSale && pricing.price > 0
    ? Math.round(((pricing.price - pricing.offedPrice) / pricing.price) * 100)
    : 0;
  const detailPath = product.slug ? `/product/${product.slug}/` : `/product/${product.id}`;

  const toggleCart = () => {
    if (inCart) {
      deleteCartItem(productKey);
      setTypeAlert("info");
      setMessage("کالا از سبد خرید حذف شد");
      return;
    }
    if (!available) {
      setTypeAlert("warning");
      setMessage("این کالا در حال حاضر موجود نیست");
      return;
    }
    addCartItem(productKey, product.title, finalPrice ?? 0, product.image);
    setTypeAlert("success");
    setMessage("کالا به سبد خرید اضافه شد");
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_10px_30px_-28px_rgba(15,23,42,0.35)] transition duration-500 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_34px_65px_-38px_rgba(15,23,42,0.42)] motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/4.5] overflow-hidden bg-[#f2f2ef]">
        <Link to={detailPath} aria-label={`مشاهده ${product.title}`} className="block size-full">
          {product.image && !imageFailed ? (
            <img
              src={product.image}
              alt={product.title || ""}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.045] motion-reduce:group-hover:scale-100"
            />
          ) : (
            <span className="grid size-full place-items-center bg-gradient-to-br from-slate-100 to-stone-200 text-slate-300">
              <ImageOff size={34} aria-hidden="true" />
            </span>
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.tag && (
              <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-black text-slate-800 shadow-sm backdrop-blur">
                {product.tag === "Special" ? "ویژه" : product.tag}
              </span>
            )}
            {!available && (
              <span className="rounded-full bg-slate-900/90 px-3 py-1.5 text-[10px] font-bold text-white">ناموجود</span>
            )}
          </div>
          {discount > 0 && (
            <span className="rounded-full bg-rose-600 px-3 py-1.5 text-[10px] font-black text-white shadow-sm">
              {toPersianDigits(discount)}٪ تخفیف
            </span>
          )}
        </div>

        {available && (
          <div className="pointer-coarse:translate-y-0 pointer-coarse:opacity-100 absolute inset-x-3 bottom-3 translate-y-[130%] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
            <button
              type="button"
              onClick={toggleCart}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-black text-white shadow-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 ${
                inCart ? "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600" : "bg-slate-950/95 hover:bg-indigo-600 focus-visible:outline-slate-900"
              }`}
            >
              {inCart ? <Check size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
              {inCart ? "در سبد خرید" : "افزودن به سبد خرید"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-4 sm:p-5">
        <div className="flex min-h-4 items-center justify-between gap-3">
          <p className="truncate text-[10px] font-bold text-slate-500">{product.category?.name || "کالای منتخب"}</p>
          {available && stock !== null && stock < 5 && (
            <p className="shrink-0 text-[10px] font-bold text-orange-600">
              {stock === 0 ? "ناموجود" : `تنها ${toPersianDigits(stock)} عدد`}
            </p>
          )}
        </div>

        <h3 className="min-h-12 text-sm font-black leading-6 text-slate-900">
          <Link to={detailPath} className="line-clamp-2 transition hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-3.5">
          <div className="min-w-0">
            {onSale && (
              <del className="block text-[10px] font-medium text-slate-400">{formatToman(pricing.price)}</del>
            )}
            <p className={`mt-0.5 text-sm font-black sm:text-base ${onSale ? "text-emerald-700" : "text-slate-900"}`}>
              {formatToman(finalPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleCart}
            disabled={!available}
            aria-label={inCart ? `حذف ${product.title} از سبد خرید` : `افزودن ${product.title} به سبد خرید`}
            className={`grid size-10 shrink-0 place-items-center rounded-xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
              inCart ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-slate-900 text-white hover:bg-indigo-600"
            }`}
          >
            {inCart ? <Check size={17} aria-hidden="true" /> : <ShoppingBag size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </article>
  );
}
