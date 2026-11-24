import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, CreditCard, ShieldCheck, Store, Truck } from "lucide-react";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import Page404 from "./Page404";
import OrderStatusStepper from "../components/order/OrderStatusStepper";
import OrderItemsList from "../components/order/OrderItemsList";
import OrderInformation from "../components/order/OrderInformation";
import { formatToman, toAmount } from "../lib/format";

const easing = [0.22, 1, 0.36, 1];

function OrderDetail() {
  const [order, setOrder] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { setMessage, setTypeAlert } = useAlert();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const order_id = params.order_id;

    api.get(`/payment/api/v1/order/${order_id}/`).then((res) => {
      setOrder(res.data);

      api.get("/accounts/api/v1/address/").then((response) => {
        setAddresses(response.data);
        setSelectedAddress(response.data.length > 0 ? response.data[0].id : "");
      }).catch(() => {
        setTypeAlert("error");
        setMessage("دریافت اطلاعات با خطا مواجه شد");
      });
    }).catch((error) => {
      setTypeAlert("error");
      const status = error?.response?.status ?? error?.status;
      if (status === 404) {
        setMessage("سفارش یافت نشد");
        setIsNotFound(true);
      } else {
        setMessage("دریافت اطلاعات با خطا مواجه شد");
        navigate("/");
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }, [navigate, params.order_id, setMessage, setTypeAlert]);

  if (isLoading) {
    return (
      <main dir="rtl" lang="fa" className="mx-auto min-h-[60vh] w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-busy="true">
        <div className="animate-pulse space-y-5">
          <div className="h-32 rounded-3xl bg-slate-100" />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="h-96 rounded-3xl bg-slate-100" />
            <div className="h-72 rounded-3xl bg-slate-100" />
          </div>
        </div>
        <p className="mt-4 text-center text-xs font-bold text-slate-500">در حال دریافت جزئیات سفارش…</p>
      </main>
    );
  }

  if (isNotFound) return <Page404 />;

  const items = Array.isArray(order.items) ? order.items : [];
  const orderTotal = toAmount(order.total_amount) ?? 0;
  const shipping = items.length > 0 ? 50000 : 0;
  const grandTotal = orderTotal + shipping;
  const isPending = order.status === "Pending";

  return (
    <>
      <Helmet>
        <title>جزئیات سفارش #{order.order_id} | پرایم شاپ</title>
        <meta name="description" content={`مشاهده جزئیات و وضعیت سفارش شماره ${order.order_id}`} />
      </Helmet>

      <main dir="rtl" lang="fa" className="min-h-screen w-full bg-[#fafaf8] pb-16">
        <div className="mx-auto w-full max-w-[82rem] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
          <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easing }}
            className="mb-6 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <Link to="/dashboard" className="transition hover:text-slate-700">داشبورد</Link>
                <ArrowUpLeft size={12} aria-hidden="true" className="-rotate-90" />
                <Link to="/dashboard" className="transition hover:text-slate-700">سفارش‌های من</Link>
                <ArrowUpLeft size={12} aria-hidden="true" className="-rotate-90" />
                <span className="text-indigo-600">جزئیات سفارش</span>
              </div>
              <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">جزئیات سفارش</h1>
              <p className="mt-2 text-xs text-slate-500">وضعیت، محصولات و اطلاعات تحویل سفارش خود را بررسی کنید.</p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              <Store size={15} aria-hidden="true" />
              بازگشت به فروشگاه
            </Link>
          </motion.header>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: easing }}
          >
            <OrderStatusStepper order={order} />
          </motion.div>

          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-6">
            <div className="min-w-0 space-y-5">
              <OrderItemsList items={items} totalAmount={order.total_amount} />

              <section aria-labelledby="delivery-note-heading" className="flex items-start gap-3 rounded-3xl border border-sky-100 bg-sky-50/70 p-4 sm:p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-sky-700">
                  <Truck size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 id="delivery-note-heading" className="text-xs font-black text-sky-950">پیگیری ارسال</h2>
                  <p className="mt-1 text-[10px] leading-6 text-sky-900/75">
                    با تغییر وضعیت سفارش، آخرین مرحله ارسال در همین صفحه به‌روزرسانی می‌شود.
                  </p>
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <section aria-labelledby="payment-summary-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.55)] sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-slate-950 text-white">
                    <CreditCard size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 id="payment-summary-heading" className="text-sm font-black text-slate-900">خلاصه پرداخت</h2>
                    <p className="mt-1 text-[10px] text-slate-500">مبالغ سفارش به تومان</p>
                  </div>
                </div>

                <dl className="mt-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-3 text-slate-500">
                    <dt>جمع محصولات</dt>
                    <dd className="font-bold text-slate-800">{formatToman(orderTotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-slate-500">
                    <dt>هزینه ارسال</dt>
                    <dd className="font-bold text-slate-800">{formatToman(shipping)}</dd>
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-end justify-between gap-3">
                      <dt className="text-xs font-black text-slate-700">مجموع قابل پرداخت</dt>
                      <dd className="text-lg font-black text-indigo-700">{formatToman(grandTotal)}</dd>
                    </div>
                  </div>
                </dl>

                {isPending ? (
                  addresses.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setTypeAlert("warning");
                        setMessage("در حال حاضر امکان پرداخت وجود ندارد");
                      }}
                      className="mt-5 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-xs font-black text-white transition hover:bg-indigo-700"
                    >
                      پرداخت و تسویه
                    </button>
                  ) : (
                    <Link to="/dashboard" className="mt-5 block w-full rounded-2xl bg-rose-600 px-4 py-3 text-center text-xs font-black text-white transition hover:bg-rose-700">
                      افزودن نشانی برای ادامه
                    </Link>
                  )
                ) : (
                  <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
                    <ShieldCheck size={16} aria-hidden="true" />
                    {order.status === "Completed" || order.status === "Delivered" ? "سفارش تکمیل شده است" : "وضعیت سفارش ثبت شده است"}
                  </div>
                )}

                <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck size={12} aria-hidden="true" />
                  اطلاعات سفارش شما محفوظ است.
                </p>
              </section>

              <OrderInformation
                order={order}
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
                isPending={isPending}
              />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderDetail;
