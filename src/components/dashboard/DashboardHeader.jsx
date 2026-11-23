import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, ShoppingBag, Store, UserRound } from "lucide-react";

const easing = [0.22, 1, 0.36, 1];

export default function DashboardHeader({
  title = "داشبورد",
  subtitle,
  user,
  onOpenSidebar,
  onSelect,
  onLogout,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const fullName = user?.full_name?.trim() || "کاربر پرایم شاپ";
  const email = user?.email || "";
  const initial = fullName.slice(0, 1);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const menuItems = [
    { key: "dashboard", label: "داشبورد", icon: LayoutDashboard },
    { key: "orders", label: "سفارش‌های من", icon: ShoppingBag },
    { key: "profile", label: "پروفایل من", icon: UserRound },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="باز کردن منو"
          className="grid size-10 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
        >
          <Menu size={18} aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-black text-slate-900 sm:text-lg">{title}</h1>
          {subtitle && <p className="mt-0.5 truncate text-xs text-slate-500">{subtitle}</p>}
        </div>

        <Link
          to="/shop"
          className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 md:inline-flex"
        >
          <Store size={15} aria-hidden="true" />
          فروشگاه
        </Link>

        <button
          type="button"
          aria-label="اعلان‌ها"
          className="relative hidden size-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:grid"
        >
          <Bell size={17} aria-hidden="true" />
          <span aria-hidden="true" className="absolute end-2.5 top-2.5 size-1.5 rounded-full bg-indigo-500" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-1.5 ps-3 transition hover:border-slate-300"
          >
            <ChevronDown
              size={15}
              aria-hidden="true"
              className={`text-slate-400 transition ${isMenuOpen ? "rotate-180" : ""}`}
            />
            <span className="hidden max-w-40 truncate text-xs font-bold text-slate-800 sm:block">{fullName}</span>
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-xs font-bold text-white">
              {initial}
            </span>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: easing }}
                className="absolute end-0 top-full z-40 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_30px_60px_-35px_rgba(15,23,42,0.5)]"
              >
                <div className="border-b border-slate-100 px-3 py-3">
                  <p className="truncate text-sm font-bold text-slate-900">{fullName}</p>
                  {email && (
                    <p className="mt-0.5 truncate text-[11px] text-slate-500" dir="ltr">
                      {email}
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          onSelect?.(item.key);
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Icon size={16} aria-hidden="true" className="text-slate-400" />
                        {item.label}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onLogout?.();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
                  >
                    <LogOut size={16} aria-hidden="true" />
                    خروج از حساب
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
