const tomanFormatter = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 });
const persianDateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function toAmount(value) {
  if (value === null || value === undefined || value === "") return null;
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

export function formatToman(value) {
  const amount = toAmount(value);
  if (amount === null) return "قیمت نامشخص";
  return `${tomanFormatter.format(Math.round(amount))} تومان`;
}

export function formatPersianDate(value) {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return persianDateFormatter.format(date);
}

export function getPricing(product) {
  const price = toAmount(product?.price);
  const offedPrice = toAmount(product?.offed_price);
  const onSale = offedPrice !== null && price !== null && offedPrice < price;
  const discount = onSale && price > 0 ? Math.round(((price - offedPrice) / price) * 100) : 0;

  return {
    price,
    offedPrice,
    onSale,
    discount,
    finalPrice: onSale ? offedPrice : price,
  };
}
