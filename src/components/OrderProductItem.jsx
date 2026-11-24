import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { BASEURL } from "../service/api";
import { formatToman, toAmount } from "../lib/format";
import { toPersianDigits } from "../lib/phone";

function resolveImage(image) {
  if (!image) return "";
  if (/^(https?:|data:|blob:)/i.test(image)) return image;
  return `${BASEURL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function OrderProductItem({ item }) {
  const [imageFailed, setImageFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const product = item?.product ?? {};
  const quantity = Number(item?.quantity) || 0;
  const unitPrice = toAmount(product.is_offed ? product.offed_price : product.price);
  const amount = toAmount(item?.amount) ?? (unitPrice ?? 0) * quantity;
  const productUrl = product.slug ? `/product/${product.slug}/` : `/product/${product.id ?? ""}`;
  const imageUrl = resolveImage(product.image);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-3 py-4 sm:gap-4 sm:py-5"
    >
      <Link to={productUrl} aria-label={`مشاهده ${product.title || "محصول"}`} className="size-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:size-24">
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={product.title || ""}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="size-full object-cover"
          />
        ) : (
          <span className="grid size-full place-items-center text-slate-300"><ImageOff size={22} aria-hidden="true" /></span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <Link to={productUrl} className="line-clamp-2 text-sm font-black leading-6 text-slate-900 transition hover:text-indigo-600">
            {product.title || "محصول سفارش"}
          </Link>
          <p className="mt-1.5 text-[10px] text-slate-500">
            قیمت واحد: <span className="font-bold text-slate-700">{formatToman(unitPrice)}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-8">
          <div className="text-center">
            <p className="text-[10px] text-slate-500">تعداد</p>
            <p className="mt-1 text-xs font-black text-slate-800">{toPersianDigits(quantity)}</p>
          </div>
          <div className="min-w-28 text-end">
            <p className="text-[10px] text-slate-500">جمع این کالا</p>
            <p className="mt-1 text-sm font-black text-slate-950">{formatToman(amount)}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default OrderProductItem;
