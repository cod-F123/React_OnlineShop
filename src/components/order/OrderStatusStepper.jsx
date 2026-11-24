import { Check, CircleCheck, Package, PackageCheck, Truck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { formatPersianDate } from "../../lib/format";
import { toPersianDigits } from "../../lib/phone";

const STEPS = [
  { key: "placed", label: "ثبت سفارش", icon: Package },
  { key: "processing", label: "در حال پردازش", icon: CircleCheck },
  { key: "shipped", label: "ارسال شده", icon: Truck },
  { key: "delivered", label: "تحویل شده", icon: PackageCheck },
];

function getProgress(status) {
  const value = String(status ?? "").trim().replace(/[\u064B-\u065F]/g, "").toLowerCase();
  if (["cancelled", "canceled", "failed"].includes(value)) return { index: -1, cancelled: true };
  if (["completed", "delivered", "received"].includes(value)) return { index: 3, cancelled: false };
  if (["sent", "shipped", "ُsent"].includes(value)) return { index: 2, cancelled: false };
  if (["payed", "paid", "processing", "in_progress"].includes(value)) return { index: 1, cancelled: false };
  return { index: 0, cancelled: false };
}

export default function OrderStatusStepper({ order }) {
  const reduceMotion = useReducedMotion();
  const progress = getProgress(order?.status);

  return (
    <section aria-labelledby="order-progress-heading" className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.55)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black tracking-[0.14em] text-indigo-600">پیگیری سفارش</p>
          <h2 id="order-progress-heading" className="mt-2 text-lg font-black text-slate-950 sm:text-xl">
            سفارش <span dir="ltr">#{toPersianDigits(order?.order_id)}</span>
          </h2>
        </div>
        <div className="text-start">
          <p className="text-[10px] text-slate-500">تاریخ ثبت</p>
          <p className="mt-1 text-xs font-bold text-slate-800">{formatPersianDate(order?.created_at) || "—"}</p>
        </div>
      </div>

      {progress.cancelled ? (
        <div role="status" className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
          این سفارش لغو شده است.
        </div>
      ) : (
        <ol className="mt-8 grid grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isComplete = index < progress.index;
            const isCurrent = index === progress.index;
            const isReached = index <= progress.index;

            return (
              <li key={step.key} className="relative flex min-w-0 flex-col items-center text-center">
                {index < STEPS.length - 1 && (
                  <span aria-hidden="true" className="absolute end-1/2 top-5 h-0.5 w-full bg-slate-100">
                    <motion.span
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={reduceMotion ? undefined : { scaleX: isComplete ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className={`block h-full origin-right ${isComplete ? "bg-emerald-500" : "bg-slate-200"}`}
                    />
                  </span>
                )}
                <span
                  className={`relative z-10 grid size-10 place-items-center rounded-2xl ring-4 ring-white transition sm:size-11 ${
                    isCurrent
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : isReached
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isComplete ? <Check size={17} aria-hidden="true" /> : <Icon size={17} aria-hidden="true" />}
                </span>
                <span className={`mt-3 max-w-full text-[9px] font-bold leading-5 sm:text-[11px] ${isReached ? "text-slate-800" : "text-slate-400"}`}>
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="mt-1 text-[9px] font-bold text-indigo-600">
                    {index === 0 && String(order?.status).toLowerCase() === "pending" ? "در انتظار پرداخت" : "مرحله فعلی"}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
