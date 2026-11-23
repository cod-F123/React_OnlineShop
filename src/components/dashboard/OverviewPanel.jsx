import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CircleDollarSign, Clock, Eye, MapPin, Package, ShoppingBag, Wallet } from "lucide-react";
import api from "../../service/api";
import useAlert from "../../hooks/AlertHook";
import StatusBadge from "./StatusBadge";
import { formatPersianDate, formatToman, toAmount } from "../../lib/format";
import { toPersianDigits } from "../../lib/phone";

const easing = [0.22, 1, 0.36, 1];

const toneStyles = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-500",
};

function toList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export default function OverviewPanel({ user, onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
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
    });

    api.get("/accounts/api/v1/address/").then((res) => {
      setAddresses(toList(res.data));
    }).catch((error) => {
      console.log(error);
      setTypeAlert("error");
      setMessage("دریافت اطلاعات با خطا مواجه شد");
    }).finally(() => {
      setIsLoading(false);
    });
  }, [setMessage, setTypeAlert]);

  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + (toAmount(order.total_amount) ?? 0), 0),
    [orders]
  );

  const pendingCount = useMemo(
    () => orders.filter((order) => String(order.status ?? "").toLowerCase() === "pending").length,
    [orders]
  );

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  const fullName = user?.full_name?.trim() || "کاربر پرایم شاپ";

  const statCards = [
    {
      key: "orders",
      label: "تعداد سفارش‌ها",
      value: toPersianDigits(orders.length),
      hint: "مجموع سفارش‌های ثبت‌شده شما",
      icon: ShoppingBag,
      tone: "indigo",
    },
    {
      key: "spent",
      label: "مجموع خرید",
      value: formatToman(totalSpent),
      hint: "مجموع مبالغ همه سفارش‌ها",
      icon: CircleDollarSign,
      tone: "emerald",
    },
    {
      key: "pending",
      label: "در انتظار پرداخت",
      value: toPersianDigits(pendingCount),
      hint: "سفارش‌هایی که نیاز به پرداخت دارند",
      icon: Clock,
      tone: "amber",
    },
    {
      key: "wallet",
      label: "موجودی کیف پول",
      value: "—",
      hint: "به‌زودی در دسترس قرار می‌گیرد",
      icon: Wallet,
      tone: "slate",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6" aria-busy="true">
        <div className="h-36 animate-pulse rounded-3xl bg-slate-100" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easing }}
        className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(32rem_20rem_at_100%_-30%,rgba(99,102,241,0.55),transparent_65%)]"
        />

        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs font-bold text-indigo-300">خوش آمدید</p>
            <h2 className="mt-2 text-xl font-black sm:text-2xl">سلام {fullName} 👋</h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
              از این بخش سفارش‌ها، آدرس‌ها و اطلاعات حساب خود را در یک نگاه مدیریت کنید.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-2xl bg-white px-5 py-3 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
            >
              ادامه خرید
            </Link>
            <button
              type="button"
              onClick={() => onNavigate?.("orders")}
              className="rounded-2xl border border-white/20 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
            >
              سفارش‌های من
            </button>
          </div>
        </div>
      </motion.section>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.li
              key={card.key}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: easing }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_45px_-40px_rgba(15,23,42,0.6)]"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-bold text-slate-500">{card.label}</p>
                <span className={`grid size-10 shrink-0 place-items-center rounded-2xl ${toneStyles[card.tone]}`}>
                  <Icon size={18} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-black text-slate-900">{card.value}</p>
              <p className="mt-1.5 text-[11px] leading-6 text-slate-500">{card.hint}</p>
            </motion.li>
          );
        })}
      </ul>

      <section aria-labelledby="recent-orders-heading" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 id="recent-orders-heading" className="text-sm font-black text-slate-900">
              آخرین سفارش‌ها
            </h3>
            <p className="mt-1 text-xs text-slate-500">وضعیت پرداخت و مبلغ آخرین سفارش‌های شما</p>
          </div>

          {orders.length > 0 && (
            <button
              type="button"
              onClick={() => onNavigate?.("orders")}
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              مشاهده همه سفارش‌ها
              <ArrowLeft size={14} aria-hidden="true" className="transition group-hover:-translate-x-0.5" />
            </button>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <Package size={26} aria-hidden="true" className="mx-auto text-slate-400" />
            <p className="mt-3 text-sm font-bold text-slate-700">هنوز سفارشی ثبت نکرده‌اید.</p>
            <p className="mt-1 text-xs text-slate-500">اولین سفارش خود را ثبت کنید و وضعیت آن را از همین‌جا پیگیری کنید.</p>
            <Link
              to="/shop"
              className="mt-5 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-indigo-600"
            >
              شروع خرید
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
              <table className="w-full text-sm">
                <caption className="sr-only">آخرین سفارش‌های شما</caption>
                <thead className="bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 text-start font-bold">شماره سفارش</th>
                    <th scope="col" className="px-5 py-3.5 text-start font-bold">تاریخ</th>
                    <th scope="col" className="px-5 py-3.5 text-start font-bold">مبلغ کل</th>
                    <th scope="col" className="px-5 py-3.5 text-start font-bold">وضعیت</th>
                    <th scope="col" className="px-5 py-3.5 text-start font-bold">
                      <span className="sr-only">عملیات</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order, index) => (
                    <motion.tr
                      key={order.order_id}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: easing }}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 font-bold text-slate-900">#{order.order_id}</td>
                      <td className="px-5 py-4 text-slate-600">{formatPersianDate(order.created_at)}</td>
                      <td className="px-5 py-4 font-bold text-slate-900">{formatToman(order.total_amount)}</td>
                      <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
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

            <ul className="mt-5 space-y-3 md:hidden">
              {recentOrders.map((order, index) => (
                <motion.li
                  key={order.order_id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: easing }}
                >
                  <Link
                    to={`/dashboard/order/${order.order_id}`}
                    className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-slate-900">#{order.order_id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <dt className="text-slate-500">تاریخ</dt>
                        <dd className="mt-1 font-bold text-slate-800">{formatPersianDate(order.created_at)}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-500">مبلغ کل</dt>
                        <dd className="mt-1 font-bold text-slate-800">{formatToman(order.total_amount)}</dd>
                      </div>
                    </dl>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section aria-labelledby="addresses-heading" className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 id="addresses-heading" className="text-sm font-black text-slate-900">
              آدرس‌های من
            </h3>
            <p className="mt-1 text-xs text-slate-500">آدرس‌های ذخیره‌شده برای تحویل سفارش‌ها</p>
          </div>

          {addresses.length > 0 && (
            <button
              type="button"
              onClick={() => onNavigate?.("addresses")}
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              مدیریت آدرس‌ها
              <ArrowLeft size={14} aria-hidden="true" className="transition group-hover:-translate-x-0.5" />
            </button>
          )}
        </div>

        {addresses.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <MapPin size={26} aria-hidden="true" className="mx-auto text-slate-400" />
            <p className="mt-3 text-sm font-bold text-slate-700">هنوز آدرسی ثبت نشده است.</p>
            <p className="mt-1 text-xs text-slate-500">برای تسریع در ثبت سفارش، آدرس تحویل خود را ذخیره کنید.</p>
            <button
              type="button"
              onClick={() => onNavigate?.("addresses")}
              className="mt-5 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-indigo-600"
            >
              افزودن آدرس
            </button>
          </div>
        ) : (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {addresses.slice(0, 4).map((address, index) => (
              <motion.li
                key={address.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: easing }}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-slate-900">{address.title}</p>
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white text-indigo-600">
                    <MapPin size={15} aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{address.address}</p>
                <p className="mt-3 text-xs text-slate-500">
                  کدپستی:{" "}
                  <span className="font-bold text-slate-700" dir="ltr">
                    {toPersianDigits(address.zip_code)}
                  </span>
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
