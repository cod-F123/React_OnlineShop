const STATUS_MAP = {
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
    label: "پرداخت شده",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  payed: {
    label: "پرداخت شده",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  completed: {
    label: "پرداخت شده",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
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
  processing: {
    label: "در حال پردازش",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
    dot: "bg-sky-500",
  },
  sent: {
    label: "ارسال شده",
    className: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    dot: "bg-indigo-500",
  },
};

export default function StatusBadge({ status }) {
  const key = String(status ?? "").trim().toLowerCase();
  const config = STATUS_MAP[key] ?? {
    label: status ? String(status) : "نامشخص",
    className: "bg-slate-100 text-slate-700 ring-slate-200",
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
