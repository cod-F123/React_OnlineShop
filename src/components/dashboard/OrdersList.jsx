import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpLeft,
  CalendarDays,
  Eye,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";
import api from "../../service/api";
import useAlert from "../../hooks/AlertHook";
import { formatPersianDate, formatToman } from "../../lib/format";
import { toPersianDigits } from "../../lib/phone";

const easing = [0.22, 1, 0.36, 1];

const STATUS_STYLES = {
  pending: {
    label: "در انتظار پرداخت",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  unpaid: {
    label: "پرداخت نشده",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  paid: {
    label: "پرداخت شده / تکمیل شده",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  payed: {
    label: "پرداخت شده / تکمیل شده",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  completed: {
    label: "پرداخت شده / تکمیل شده",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  sent: {
    label: "ارسال شده",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
    dot: "bg-sky-500",
  },
  processing: {
    label: "در حال پردازش",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
    dot: "bg-sky-500",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
    dot: "bg-rose-500",
  },
  canceled: {
    label: "لغو شده",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
    dot: "bg-rose-500",
  },
  failed: {
    label: "ناموفق",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
    dot: "bg-rose-500",
  },
};

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function toList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function OrderStatusBadge({ status }) {
  const config = STATUS_STYLES[normalize(status)] ?? {
    label: status ? String(status) : "نامشخص",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ring-1 ring-inset ${config.className}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <p className="inline-flex items-center gap-2 text-xs font-bold text-slate-500">
        <Loader2 size={15} aria-hidden="true" className="animate-spin text-indigo-500" />
        در حال بارگذاری سفارش‌ها…
      </p>

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white md:block">
        <div className="h-12 border-b border-slate-100 bg-slate-50/80" />
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center gap-5 border-b border-slate-100 px-5 py-4 last:border-b-0">
            <div className="h-4 w-28 animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-24 animate-pulse rounded-full bg-slate-100" />
            <div className="h-4 w-32 animate-pulse rounded-full bg-slate-100" />
            <div className="ms-auto h-6 w-28 animate-pulse rounded-full bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="space-y-3 md:hidden">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="h-4 w-28 animate-pulse rounded-full bg-slate-100" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
            </div>
            <div className="mt-4 h-20 animate-pulse rounded-2xl bg-slate-50" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center sm:py-16">
      <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-indigo-50 text-indigo-500">
        <Package size={28} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-black text-slate-900">هنوز سفارشی ثبت نکرده‌اید</h3>
      <p className="mx-auto mt-2 max-w-md text-xs leading-7 text-slate-500">
        اولین سفارش خود را ثبت کنید تا وضعیت پرداخت و ارسال آن را از همین بخش پیگیری کنید.
      </p>
      <Link
        to="/shop"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black text-white transition hover:bg-indigo-600"
      >
        <ShoppingBag size={15} aria-hidden="true" />
        شروع خرید
      </Link>
    </div>
  );
}

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setMessage, setTypeAlert } = useAlert();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api.get("/payment/api/v1/order/").then((res) => {
      setOrders(toList(res.data));
    }).catch((error) => {
      console.log(error);
      setTypeAlert("error");
      setMessage("دریافت اطلاعات با خطا مواجه شد");
    }).finally(() => {
      setIsLoading(false);
    });
  }, [setMessage, setTypeAlert]);

  return (
    <section dir="rtl" lang="fa" aria-labelledby="orders-heading" className="space-y-5">
      <header className="flex flex-wrap items-end justify-between mb-3 gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-600">
            <ShoppingBag size={14} aria-hidden="true" />
            سفارش‌های من
          </span>
          <h2 id="orders-heading" className="mt-3 text-2xl font-black tracking-tight text-slate-900">
            سفارش‌های من
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-6 text-slate-500">
            تاریخ ثبت، مبلغ کل و وضعیت پرداخت همه سفارش‌های خود را در یک نگاه بررسی کنید.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600">
            {isLoading ? "در حال دریافت سفارش‌ها" : `${toPersianDigits(orders.length)} سفارش`}
          </span>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            ادامه خرید
            <ArrowUpLeft size={15} aria-hidden="true" />
          </Link>
        </div>
      </header>

      {isLoading ? (
        <OrdersSkeleton />
      ) : orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_60px_-52px_rgba(15,23,42,0.65)] md:block">
            <table className="w-full text-sm">
              <caption className="sr-only">فهرست سفارش‌های شما</caption>
              <thead className="bg-slate-50/80 text-[11px] text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3.5 text-start font-bold">شماره سفارش</th>
                  <th scope="col" className="px-5 py-3.5 text-start font-bold">تاریخ ثبت</th>
                  <th scope="col" className="px-5 py-3.5 text-start font-bold">مبلغ کل</th>
                  <th scope="col" className="px-5 py-3.5 text-start font-bold">وضعیت</th>
                  <th scope="col" className="px-5 py-3.5 text-start font-bold">
                    <span className="sr-only">عملیات</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order, index) => (
                  <motion.tr
                    key={order.order_id}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.045, ease: easing }}
                    className="group transition hover:bg-indigo-50/40"
                  >
                    <td className="px-5 py-4">
                      <span className="font-bold text-slate-900" dir="ltr">
                        #{toPersianDigits(order.order_id)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={14} aria-hidden="true" className="text-slate-400" />
                        {formatPersianDate(order.created_at) || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {formatToman(order.total_amount)}
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        to={`/dashboard/order/${order.order_id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition hover:text-indigo-700"
                      >
                        <Eye size={14} aria-hidden="true" />
                        جزئیات
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {orders.map((order, index) => (
              <motion.li
                key={order.order_id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: easing }}
              >
                <Link
                  to={`/dashboard/order/${order.order_id}`}
                  className="block rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_22px_50px_-48px_rgba(15,23,42,0.6)] transition hover:border-indigo-200 hover:shadow-[0_28px_55px_-40px_rgba(79,70,229,0.45)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-500">شماره سفارش</p>
                      <p className="mt-1 truncate font-black text-slate-900" dir="ltr">
                        #{toPersianDigits(order.order_id)}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3">
                    <div>
                      <dt className="text-[10px] font-bold text-slate-500">تاریخ ثبت</dt>
                      <dd className="mt-1 text-xs font-bold text-slate-800">
                        {formatPersianDate(order.created_at) || "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-bold text-slate-500">مبلغ کل</dt>
                      <dd className="mt-1 text-xs font-black text-slate-900">
                        {formatToman(order.total_amount)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-indigo-600">
                    <span>مشاهده جزئیات سفارش</span>
                    <ArrowUpLeft size={15} aria-hidden="true" />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
