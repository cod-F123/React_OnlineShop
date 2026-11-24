import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

const variants = {
  success: {
    icon: CheckCircle2,
    shell: "border-emerald-200/80 bg-emerald-50/95 text-emerald-950",
    iconWrap: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/70",
    accent: "bg-emerald-500",
  },
  error: {
    icon: AlertCircle,
    shell: "border-rose-200/80 bg-rose-50/95 text-rose-950",
    iconWrap: "bg-rose-100 text-rose-700 ring-1 ring-rose-200/70",
    accent: "bg-rose-500",
  },
  warning: {
    icon: AlertTriangle,
    shell: "border-amber-200/80 bg-amber-50/95 text-amber-950",
    iconWrap: "bg-amber-100 text-amber-700 ring-1 ring-amber-200/70",
    accent: "bg-amber-500",
  },
  info: {
    icon: Info,
    shell: "border-indigo-200/80 bg-indigo-50/95 text-indigo-950",
    iconWrap: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200/70",
    accent: "bg-indigo-500",
  },
};

function Alert({ message, alertType = "success", onClose }) {
  const reduceMotion = useReducedMotion();

  if (!message) return null;

  const variant = variants[alertType] || variants.success;
  const Icon = variant.icon;

  return (
    <motion.div
      dir="rtl"
      lang="fa"
      style={{ zIndex: 100 }}
      initial={reduceMotion ? false : { opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: -10,
              scale: 0.94,
              transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.15 }
          : { type: "spring", stiffness: 420, damping: 32, mass: 0.8 }
      }
      className={`pointer-events-auto fixed inset-x-0 top-20 z-[100] mx-auto flex w-[calc(100%-2rem)] max-w-md items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:top-24 sm:px-5 ${variant.shell}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-2 start-0 w-1 rounded-e-full ${variant.accent}`}
      />

      <span
        aria-hidden="true"
        className={`grid size-9 shrink-0 place-items-center rounded-xl ${variant.iconWrap}`}
      >
        <Icon size={18} />
      </span>

      <p
        role={alertType === "error" ? "alert" : "status"}
        aria-live={alertType === "error" ? "assertive" : "polite"}
        aria-atomic="true"
        className="min-w-0 flex-1 break-words text-start text-sm font-semibold leading-6"
      >
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        aria-label="بستن پیام"
        title="بستن"
        className="-me-1 grid size-10 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
      >
        <X size={17} aria-hidden="true" />
      </button>
    </motion.div>
  );
}

export default Alert;
