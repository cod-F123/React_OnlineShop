import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpLeft,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  ExternalLink,
  Inbox,
  LifeBuoy,
  Loader2,
  MessageCircle,
  MessageSquarePlus,
  Phone,
  Send,
  ShieldCheck,
  Ticket,
  X,
} from "lucide-react";
import api from "../../service/api";
import useAlert from "../../hooks/AlertHook";
import { formatPersianDate } from "../../lib/format";
import { toPersianDigits } from "../../lib/phone";

const easing = [0.22, 1, 0.36, 1];

const FAQS = [
  {
    question: "چطور وضعیت سفارش خود را پیگیری کنم؟",
    answer:
      "از بخش «سفارش‌های من» در داشبورد، آخرین وضعیت پرداخت و ارسال سفارش را مشاهده کنید. برای جزئیات بیشتر روی همان سفارش بزنید.",
  },
  {
    question: "امکان مرجوع کردن کالا وجود دارد؟",
    answer:
      "بله. تا ۷ روز پس از تحویل، در صورت سالم بودن کالا و بسته‌بندی، می‌توانید درخواست مرجوعی ثبت کنید. تیم پشتیبانی مراحل را به شما اطلاع می‌دهد.",
  },
  {
    question: "پاسخ تیکت من چقدر طول می‌کشد؟",
    answer:
      "در ساعات کاری معمولاً کمتر از ۲۴ ساعت پاسخ می‌دهیم. اولویت «بالا» برای مشکلات پرداخت و ارسال، سریع‌تر بررسی می‌شود.",
  },
];

const STATUS_STYLES = {
  pending: {
    label: "در انتظار بررسی",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  processing: {
    label: "در حال بررسی",
    className: "bg-sky-50 text-sky-700 ring-sky-200",
    dot: "bg-sky-500",
  },
  answered: {
    label: "پاسخ داده شده",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  open: {
    label: "باز",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  closed: {
    label: "بسته شده",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  },
};

const PRIORITY_STYLES = {
  high: {
    label: "بالا",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
  },
  medium: {
    label: "متوسط",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  low: {
    label: "پایین",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
};

// نشانی پشتیبانی آنلاین را با آیدی رسمی فروشگاه جایگزین کنید.
const SUPPORT_CHANNELS = {
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/",
};

function normalize(value) {
  return String(value ?? "")
    .trim()
    .replace(/[\u064B-\u065F]/g, "")
    .toLowerCase();
}

function toList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function StatusPill({ status }) {
  const key = normalize(status);
  const config = STATUS_STYLES[key] ?? {
    label: status ? String(status) : "نامشخص",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${config.className}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function PriorityPill({ priority }) {
  const key = normalize(priority);
  const config = PRIORITY_STYLES[key] ?? {
    label: priority ? String(priority) : "عادی",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${config.className}`}>
      اولویت {config.label}
    </span>
  );
}

function SupportSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="در حال بارگذاری پشتیبانی">
      <div className="h-56 animate-pulse rounded-[2rem] bg-slate-100" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
      </div>
      <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
    </div>
  );
}

function TicketRow({ ticket, index, reduceMotion }) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: easing }}
    >
      <Link
        to={`/dashboard/ticket/${ticket.ticket_id}/`}
        className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_22px_45px_-35px_rgba(79,70,229,0.55)] sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
            <Ticket size={19} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-slate-900">{ticket.title}</p>
            <p className="mt-1 text-[11px] text-slate-500">
              تیکت #{toPersianDigits(ticket.ticket_id)}
              <span aria-hidden="true" className="mx-1.5 text-slate-300">·</span>
              {formatPersianDate(ticket.created_at)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={ticket.step ?? ticket.status} />
          <PriorityPill priority={ticket.priority} />
          <span className="grid size-8 place-items-center rounded-full text-slate-400 transition group-hover:bg-slate-50 group-hover:text-indigo-600">
            <ArrowUpLeft size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export default function SupportCenter() {
  const { setMessage, setTypeAlert } = useAlert();
  const reduceMotion = useReducedMotion();

  const [tickets, setTickets] = useState([]);
  const [isAddTicket, setIsAddTicket] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newPriority, setNewPriority] = useState("Low");
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    api.get("/tickets/api/v1/ticket/").then((res) => {
      setTickets(toList(res.data));
    }).catch((error) => {
      console.log(error);
      setTypeAlert("error");
      setMessage("دریافت اطلاعات با خطا مواجه شد");
    }).finally(() => {
      setIsLoading(false);
    });
  }, [setMessage, setTypeAlert]);

  const submitNewTicket = (e) => {
    e.preventDefault();

    if (!newTitle.trim() || !newBody.trim()) {
      setTypeAlert("error");
      setMessage("لطفاً موضوع و متن پیام را وارد کنید");
      return;
    }

    setIsLoading(true);

    api.post("/tickets/api/v1/ticket/", {
      title: newTitle,
      content: newBody,
      priority: newPriority,
    }).then((res) => {
      setTickets((prev) => [res.data, ...prev]);
      setTypeAlert("success");
      setMessage("تیکت شما با موفقیت ثبت شد");
    }).catch((error) => {
      console.log(error.response?.data || error);
      setTypeAlert("error");
      setMessage("ارسال تیکت با خطا مواجه شد. لطفاً دوباره تلاش کنید");
    }).finally(() => {
      setNewTitle("");
      setNewBody("");
      setNewPriority("Low");
      setIsAddTicket(false);
      setIsLoading(false);
    });
  };

  const scrollToSection = (id) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const openTicketForm = () => {
    setIsAddTicket(true);
    window.setTimeout(() => scrollToSection("support-ticket-form"), 80);
  };

  const openFaqCard = () => {
    setOpenFaq(0);
    scrollToSection("support-faq");
  };

  if (isLoading && tickets.length === 0 && !isAddTicket) {
    return <SupportSkeleton />;
  }

  return (
    <section dir="rtl" lang="fa" aria-labelledby="support-heading" className="space-y-5">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easing }}
        className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_40px_80px_-55px_rgba(15,23,42,0.9)] sm:p-8 lg:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(34rem_22rem_at_100%_-20%,rgba(99,102,241,0.55),transparent_65%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -start-16 size-64 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-indigo-200">
              <LifeBuoy size={14} aria-hidden="true" />
              مرکز پشتیبانی پرایم شاپ
            </span>
            <h2 id="support-heading" className="mt-4 text-2xl font-black leading-tight sm:text-4xl">
              همیشه کنار شما هستیم
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
              سؤال، پیگیری سفارش یا مشکلی دارید؟ تیم پشتیبانی ما آماده است تا سریع و دقیق به شما کمک کند.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openTicketForm}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs font-black text-slate-900 transition hover:bg-indigo-50"
              >
                <MessageSquarePlus size={16} aria-hidden="true" />
                ارسال پیام به پشتیبانی
              </button>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
              >
                <Phone size={16} aria-hidden="true" />
                تماس با ما
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={14} aria-hidden="true" />
                پاسخ‌گویی در ساعات کاری
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} aria-hidden="true" />
                اطلاعات شما محرمانه است
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-[11px] font-bold text-slate-400">میانگین زمان پاسخ‌گویی</p>
              <p className="mt-2 text-2xl font-black text-white">کمتر از ۲۴ ساعت</p>
              <p className="mt-1 text-[11px] text-slate-400">در روزهای کاری</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-[11px] font-bold text-slate-400">وضعیت پشتیبانی</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-emerald-300">
                <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400" />
                آماده دریافت پیام شما
              </p>
              <p className="mt-1 text-[11px] text-slate-400">تیکت‌ها به‌صورت مرحله‌ای بررسی می‌شوند</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 mt-3 mb-3">
        <motion.button
          type="button"
          onClick={openFaqCard}
          whileHover={reduceMotion ? undefined : { y: -4 }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          transition={{ duration: 0.25, ease: easing }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-start shadow-[0_22px_50px_-45px_rgba(15,23,42,0.65)] transition hover:border-indigo-200 hover:shadow-[0_30px_55px_-38px_rgba(79,70,229,0.45)] sm:p-6"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-indigo-50 transition duration-500 group-hover:scale-125"
          />
          <span className="relative grid size-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
            <CircleHelp size={22} aria-hidden="true" />
          </span>
          <h3 className="relative mt-4 text-base font-black text-slate-900">سوالات متداول</h3>
          <p className="relative mt-2 text-xs leading-6 text-slate-500">
            پاسخ سریع به پرتکرارترین سؤال‌ها درباره سفارش، پرداخت و مرجوعی.
          </p>
          <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600">
            مشاهده پاسخ‌ها
            <ArrowUpLeft size={14} aria-hidden="true" className="transition group-hover:-translate-x-0.5" />
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={openTicketForm}
          whileHover={reduceMotion ? undefined : { y: -4 }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          transition={{ duration: 0.25, ease: easing }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-start shadow-[0_22px_50px_-45px_rgba(15,23,42,0.65)] transition hover:border-emerald-200 hover:shadow-[0_30px_55px_-38px_rgba(16,185,129,0.4)] sm:p-6"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-emerald-50 transition duration-500 group-hover:scale-125"
          />
          <span className="relative grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
            <MessageSquarePlus size={22} aria-hidden="true" />
          </span>
          <h3 className="relative mt-4 text-base font-black text-slate-900">ارسال تیکت جدید</h3>
          <p className="relative mt-2 text-xs leading-6 text-slate-500">
            موضوع و جزئیات مشکل را بنویسید تا کارشناسان ما پیگیری کنند.
          </p>
          <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
            ثبت درخواست
            <ArrowUpLeft size={14} aria-hidden="true" className="transition group-hover:-translate-x-0.5" />
          </span>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {isAddTicket && (
          <motion.section
            id="support-ticket-form"
            key="support-ticket-form"
            initial={reduceMotion ? false : { opacity: 0, height: 0, y: -8 }}
            animate={reduceMotion ? undefined : { opacity: 1, height: "auto", y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.35, ease: easing }}
            className="overflow-hidden"
          >
            <div className="rounded-3xl mb-3 border border-indigo-100 bg-white p-5 shadow-[0_30px_65px_-50px_rgba(79,70,229,0.55)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white">
                    <MessageSquarePlus size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-black text-slate-900">ارسال تیکت جدید</h3>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      هرچه توضیحات دقیق‌تر باشد، بررسی درخواست سریع‌تر انجام می‌شود.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddTicket(false)}
                  aria-label="بستن فرم تیکت"
                  className="grid size-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={submitNewTicket} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
                  <label className="block">
                    <span className="text-xs font-bold text-slate-700">موضوع</span>
                    <input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      id="support-ticket-title"
                      type="text"
                      name="title"
                      required
                      placeholder="مثلاً پیگیری وضعیت سفارش"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-bold text-slate-700">اولویت</span>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      id="support-ticket-priority"
                      name="priority"
                      className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    >
                      <option value="Low">پایین</option>
                      <option value="Medium">متوسط</option>
                      <option value="High">بالا</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">متن پیام</span>
                  <textarea
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    name="content"
                    required
                    placeholder="جزئیات درخواست خود را بنویسید..."
                    className="mt-2 min-h-36 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                    <CheckCircle2 size={14} aria-hidden="true" className="text-emerald-500" />
                    پس از ثبت، پاسخ تیم پشتیبانی در همین بخش نمایش داده می‌شود.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddTicket(false)}
                      className="rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-black text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={15} aria-hidden="true" className="animate-spin" />
                          در حال ارسال…
                        </>
                      ) : (
                        <>
                          <Send size={15} aria-hidden="true" />
                          ارسال تیکت
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <Link
          to="/contact-us"
          className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-[0_24px_45px_-40px_rgba(79,70,229,0.5)]"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-indigo-600 group-hover:text-white">
              <Phone size={19} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-black text-slate-900">تماس با ما</p>
              <p className="mt-1 text-[11px] text-slate-500">اطلاعات تماس و فرم ارتباط با فروشگاه</p>
            </div>
          </div>
          <ArrowUpLeft size={17} aria-hidden="true" className="shrink-0 text-slate-400 transition group-hover:text-indigo-600" />
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <MessageCircle size={19} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-black text-slate-900">پشتیبانی آنلاین</p>
              <p className="mt-1 text-[11px] text-slate-500">گفت‌وگوی سریع با کارشناسان</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={SUPPORT_CHANNELS.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-50 px-4 py-2.5 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
            >
              تلگرام
              <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a
              href={SUPPORT_CHANNELS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
            >
              واتس‌اپ
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <section aria-labelledby="tickets-heading" className="rounded-3xl mt-3 mb-3 border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 id="tickets-heading" className="text-sm font-black text-slate-900">
              تیکت‌های من
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {tickets.length > 0
                ? `${toPersianDigits(tickets.length)} تیکت ثبت شده است`
                : "هنوز تیکتی ثبت نکرده‌اید"}
            </p>
          </div>
          <button
            type="button"
            onClick={openTicketForm}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            <MessageSquarePlus size={15} aria-hidden="true" />
            تیکت جدید
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
              <Inbox size={24} aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-black text-slate-800">هنوز تیکتی ثبت نکرده‌اید</p>
            <p className="mt-1 text-xs leading-6 text-slate-500">
              اگر سؤال یا مشکلی دارید، اولین تیکت خود را برای تیم پشتیبانی ارسال کنید.
            </p>
            <button
              type="button"
              onClick={openTicketForm}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs font-black text-white transition hover:bg-indigo-600"
            >
              <MessageSquarePlus size={15} aria-hidden="true" />
              ارسال تیکت جدید
            </button>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {tickets.map((ticket, index) => (
              <TicketRow
                key={ticket.id ?? ticket.ticket_id}
                ticket={ticket}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </ul>
        )}
      </section>

      <section
        id="support-faq"
        aria-labelledby="faq-heading"
        className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
            <CircleHelp size={19} aria-hidden="true" />
          </span>
          <div>
            <h3 id="faq-heading" className="text-sm font-black text-slate-900">
              سوالات متداول
            </h3>
            <p className="mt-1 text-xs text-slate-500">پاسخ کوتاه به سؤال‌های پرتکرار شما</p>
          </div>
        </div>

        <div className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100">
          {FAQS.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <div key={item.question} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-start transition hover:bg-slate-50 sm:px-5"
                >
                  <span className="text-xs font-bold leading-6 text-slate-800 sm:text-sm">{item.question}</span>
                  <ChevronDown
                    size={17}
                    aria-hidden="true"
                    className={`shrink-0 text-slate-400 transition duration-300 ${isOpen ? "rotate-180 text-indigo-600" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: easing }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-5 text-xs leading-7 text-slate-500 sm:px-5">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
