import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpLeft, PackageCheck, ShoppingBag, Sparkles } from "lucide-react";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import useCart from "../hooks/CartHook";
import CartItem from "../components/CartItem";
import CartOrderSummary from "../components/CartOrderSummary";
import { toPersianDigits } from "../lib/phone";

const easing = [0.22, 1, 0.36, 1];

function EmptyCart() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easing }}
      className="relative isolate overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-[0_35px_75px_-60px_rgba(15,23,42,0.45)] sm:py-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(30rem_20rem_at_50%_0%,rgba(99,102,241,0.08),transparent_70%)]" />
      <div className="relative mx-auto grid size-20 place-items-center rounded-[1.75rem] bg-slate-950 text-white shadow-xl shadow-slate-900/15">
        <ShoppingBag size={33} aria-hidden="true" strokeWidth={1.5} />
        <span className="absolute -end-1 -top-1 grid size-7 place-items-center rounded-full border-4 border-white bg-indigo-500 text-white">
          <Sparkles size={12} aria-hidden="true" />
        </span>
      </div>
      <h2 className="relative mt-6 text-xl font-black text-slate-950 sm:text-2xl">سبد خرید شما خالی است</h2>
      <p className="relative mx-auto mt-2 max-w-md text-xs leading-7 text-slate-500 sm:text-sm">
        هنوز محصولی انتخاب نکرده‌اید. به فروشگاه بروید و کالاهای موردعلاقه‌تان را به سبد خرید اضافه کنید.
      </p>
      <Link
        to="/shop"
        className="relative mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-black text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
      >
        بازگشت به فروشگاه
        <ArrowUpLeft size={16} aria-hidden="true" />
      </Link>
    </motion.section>
  );
}

function Cart() {
  const { cart, totalAmount, deleteCartItem, updateCartItem, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const { setMessage, setTypeAlert } = useAlert();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const shipping = cart.length > 0 ? 50000 : 0;
  const subtotal = Number(totalAmount) || 0;
  const discount = 0;
  const total = subtotal - discount + shipping;
  const itemCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const startCreateOrderButton = () => {
    setIsLoading(true);

    api.post("/payment/api/v1/order/", { items: cart }).then(() => {
      clearCart();
      setTypeAlert("success");
      setMessage("سفارش شما با موفقیت انجام شد");
      navigate("/dashboard/");
    }).catch((err) => {
      console.log(err.response.data);
      setTypeAlert("error");
      setMessage("عملیات با خطا مواجه شد");
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const handleApplyCoupon = () => {
    setTypeAlert("info");
    setMessage("امکان بررسی کد تخفیف در حال حاضر فعال نیست");
  };

  return (
    <main dir="rtl" lang="fa" className="min-h-screen w-full bg-[#fafaf8] pb-16">
      <Helmet>
        <title>سبد خرید | پرایم شاپ</title>
        <meta name="description" content="سبد خرید خود را مرور کنید و سفارش را با اطمینان نهایی کنید." />
        <meta property="og:title" content="سبد خرید | پرایم شاپ" />
      </Helmet>

      <div className="mx-auto w-full max-w-[82rem] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easing }}
          className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9"
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <Link to="/" className="transition hover:text-slate-700">فروشگاه</Link>
              <ArrowLeft size={12} aria-hidden="true" className="rotate-180" />
              <span className="text-indigo-600">سبد خرید</span>
            </div>
            <p className="mt-4 text-[10px] font-black tracking-[0.16em] text-indigo-600">انتخاب‌های شما</p>
            <h1 className="mt-1.5 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">سبد خرید</h1>
            <p className="mt-2 text-xs text-slate-500">محصولات انتخاب‌شده را بررسی و سفارش خود را نهایی کنید.</p>
          </div>

          {cart.length > 0 && (
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-bold text-slate-600">
              <ShoppingBag size={14} aria-hidden="true" className="text-indigo-600" />
              {toPersianDigits(itemCount)} کالا در سبد شما
            </div>
          )}
        </motion.header>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8">
            <section aria-labelledby="cart-items-heading" className="min-w-0">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 id="cart-items-heading" className="text-sm font-black text-slate-900">محصولات سبد خرید</h2>
                  <p className="mt-1 text-[10px] text-slate-500">تعداد هر کالا را از همین بخش تغییر دهید.</p>
                </div>
                <Link to="/shop" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 transition hover:text-indigo-700">
                  ادامه خرید
                  <ArrowUpLeft size={14} aria-hidden="true" />
                </Link>
              </div>

              <div aria-busy={isLoading} className="space-y-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {cart.map((item) => (
                    <CartItem
                      key={item.product}
                      item={item}
                      updateQtyHandler={updateCartItem}
                      removeItemHandler={deleteCartItem}
                      disabled={isLoading}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {isLoading && (
                <p role="status" className="mt-3 flex items-center gap-2 text-[11px] font-bold text-indigo-600">
                  <span className="size-1.5 animate-pulse rounded-full bg-indigo-600" />
                  در حال ثبت سفارش…
                </p>
              )}

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-emerald-600">
                  <PackageCheck size={17} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-emerald-900">خریدی آسوده و مطمئن</p>
                  <p className="mt-1 text-[10px] leading-5 text-emerald-800/75">جزئیات سفارش و آدرس تحویل را پس از ثبت سفارش می‌توانید در داشبورد پیگیری کنید.</p>
                </div>
              </div>
            </section>

            <CartOrderSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              onCheckout={startCreateOrderButton}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
