import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CircleDot, LifeBuoy, Ticket } from "lucide-react";
import { toPersianDigits } from "../../lib/phone";

function formatCreatedAt(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    dateStyle: "medium",
  }).format(date);
}

function getStatus(status) {
  const value = String(status ?? "").trim().toLowerCase();
  if (["open", "pending", "processing"].includes(value)) {
    return { label: value === "open" ? "باز" : value === "pending" ? "در انتظار بررسی" : "در حال بررسی", style: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500" };
  }
  if (["closed", "answered", "resolved"].includes(value)) {
    return { label: value === "answered" ? "پاسخ داده شده" : value === "resolved" ? "حل شده" : "بسته شده", style: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" };
  }
  return { label: status || "نامشخص", style: "bg-slate-100 text-slate-600 ring-slate-200", dot: "bg-slate-400" };
}

function getPriority(priority) {
  if (priority === "High") return { label: "اولویت بالا", style: "bg-rose-50 text-rose-700" };
  if (priority === "Medium") return { label: "اولویت متوسط", style: "bg-amber-50 text-amber-700" };
  if (priority === "Low") return { label: "اولویت پایین", style: "bg-slate-100 text-slate-600" };
  return null;
}

export default function TicketChatHeader({ ticket }) {
  const status = getStatus(ticket.status ?? ticket.step);
  const priority = getPriority(ticket.priority);

  return (
    <header className="relative z-10 shrink-0 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <Link
          to="/dashboard"
          aria-label="بازگشت به داشبورد"
          className="grid size-10 shrink-0 place-items-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <span className="hidden size-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white sm:grid">
          <LifeBuoy size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <Ticket size={12} aria-hidden="true" />
              تیکت <span dir="ltr">#{toPersianDigits(ticket.ticket_id)}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
              <CalendarDays size={12} aria-hidden="true" />
              {formatCreatedAt(ticket.created_at)}
            </span>
          </div>
          <h1 className="mt-1.5 truncate text-sm font-black text-slate-950 sm:text-lg">{ticket.title || "گفت‌وگوی پشتیبانی"}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset ${status.style}`}>
              <span aria-hidden="true" className={`size-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            {priority && <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${priority.style}`}>{priority.label}</span>}
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-700 md:inline-flex">
          <CircleDot size={12} aria-hidden="true" />
          همراه شما هستیم
        </span>
      </div>
    </header>
  );
}
