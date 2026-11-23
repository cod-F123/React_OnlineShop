import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LogOut, Store, X } from "lucide-react";
import Logo from "../../assets/images/Logo.png";

const easing = [0.22, 1, 0.36, 1];

export default function DashboardSidebar({
  items = [],
  activeKey,
  onSelect,
  onClose,
  onLogout,
  user,
  isOpen = false,
}) {
  const reduceMotion = useReducedMotion();
  const fullName = user?.full_name?.trim() || "کاربر پرایم شاپ";
  const initial = fullName.slice(0, 1);

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5" aria-label="پرایم شاپ">
          <img src={Logo} alt="" className="size-9 rounded-xl object-cover" />
          <span className="text-sm font-bold text-white">
            پرایم<span className="text-indigo-400"> شاپ</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="بستن منو"
          className="grid size-9 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500/20 text-sm font-bold text-indigo-200">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{fullName}</p>
          {user?.email && (
            <p className="truncate text-[11px] text-slate-400" dir="ltr">
              {user.email}
            </p>
          )}
        </div>
      </div>

      <nav aria-label="منوی داشبورد" className="mt-6 flex-1 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeKey;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect?.(item.key)}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-white text-slate-900 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.95)]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} aria-hidden="true" className={isActive ? "text-indigo-600" : "text-slate-400"} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
        <Link
          to="/shop"
          className="flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <Store size={18} aria-hidden="true" className="text-slate-400" />
          بازگشت به فروشگاه
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
        >
          <LogOut size={18} aria-hidden="true" />
          خروج
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sticky top-8 hidden h-[calc(100vh-4rem)] w-72 shrink-0 lg:block">
        <div className="h-full overflow-y-auto rounded-3xl bg-slate-950 p-5 shadow-[0_50px_90px_-60px_rgba(15,23,42,0.95)]">
          {content}
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dashboard-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <button
              type="button"
              aria-label="بستن منو"
              onClick={onClose}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: easing }}
              className="absolute inset-y-0 start-0 w-72 max-w-[85vw] overflow-y-auto bg-slate-950 p-5"
            >
              {content}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
