import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ImageOff, Plus } from "lucide-react";
import useAlert from "../../hooks/AlertHook";
import useCart from "../../hooks/CartHook";
import { formatToman, getPricing, toAmount } from "../../lib/format";
import { toPersianDigits } from "../../lib/phone";

export default function ProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { addCartItem, checkCart, deleteCartItem } = useCart();
  const { setMessage, setTypeAlert } = useAlert();

  const { onSale, discount, finalPrice, price } = getPricing(product);
  const stock = toAmount(product.stock);
  const lowStock = stock !== null && stock < 5;
  const productKey = product.id ?? product.slug ?? product.title;
  const inCart = productKey ? checkCart(productKey) : false;
  const detailPath = product.slug ? `/product/${product.slug}/` : `/product/${product.id}`;
  const showImage = product.image && !imageFailed;

  const handleCartToggle = () => {
    if (inCart) {
      deleteCartItem(productKey);
      setTypeAlert("info");
      setMessage("کالا از سبد خرید حذف شد");
      return;
    }

    addCartItem(productKey, product.title, finalPrice ?? 0, product.image);
    setTypeAlert("success");
    setMessage("کالا به سبد خرید اضافه شد");
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] motion-reduce:hover:translate-y-0">
      <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
        {showImage ? (
          <img
            src={product.image}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span className="grid size-full place-items-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-300">
            <ImageOff size={36} aria-hidden="true" />
          </span>
        )}

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {product.tag ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur">
              {product.tag === "Special" ? "ویژه" : product.tag}
            </span>
          ) : (
            <span />
          )}

          {discount > 0 && (
            <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              {toPersianDigits(discount)}٪ تخفیف
            </span>
          )}
        </div>

        <div className="pointer-coarse:translate-y-0 pointer-coarse:opacity-100 absolute inset-x-3 bottom-3 translate-y-[140%] opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
          <button
            type="button"
            onClick={handleCartToggle}
            aria-label={inCart ? `حذف ${product.title} از سبد خرید` : `افزودن ${product.title} به سبد خرید`}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-lg backdrop-blur transition focus-visible:outline-2 focus-visible:outline-offset-2 ${
              inCart
                ? "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600"
                : "bg-slate-900/95 hover:bg-indigo-600 focus-visible:outline-slate-900"
            }`}
          >
            {inCart ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {inCart ? "در سبد خرید" : "افزودن سریع"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          {product.category?.name && (
            <p className="truncate text-[11px] font-bold text-slate-500">{product.category.name}</p>
          )}
          {lowStock && (
            <p className="shrink-0 text-[11px] font-bold text-orange-600">
              {stock === 0 ? "ناموجود" : `تنها ${toPersianDigits(stock)} عدد باقی مانده`}
            </p>
          )}
        </div>

        <h3 className="text-base font-bold leading-7 text-slate-900">
          <Link
            to={detailPath}
            className="line-clamp-2 transition hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-t border-slate-100 pt-3">
          <span className={`text-lg font-black ${onSale ? "text-emerald-600" : "text-slate-900"}`}>
            <span className="sr-only">{onSale ? "قیمت با تخفیف: " : "قیمت: "}</span>
            {formatToman(finalPrice)}
          </span>
          {onSale && (
            <del className="text-sm font-medium text-slate-400">
              <span className="sr-only">قیمت پیش از تخفیف: </span>
              {formatToman(price)}
            </del>
          )}
        </div>
      </div>
    </article>
  );
}
