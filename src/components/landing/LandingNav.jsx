import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import useAuth from "../../hooks/AuthHook";
import useCart from "../../hooks/CartHook";
import Logo from "../../assets/images/Logo.png";

const links = [
  { label: "فروشگاه", to: "/shop" },
  { label: "جدیدترین‌ها", to: "/shop?ordering=added_at" },
  { label: "درباره ما", to: "/about" },
  { label: "تماس با ما", to: "/contact-us" },
];

function CartBadge({ count }) {
  if (count < 1) return null;

  return (
    <motion.span
      key={count}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 520, damping: 24 }}
      className="absolute -end-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold leading-5 text-white ring-2 ring-white"
    >
      {count > 99 ? "۹۹+" : count.toLocaleString("fa-IR")}
    </motion.span>
  );
}

export default function LandingNav({ categories = [] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0),
    [cart]
  );

  const categoryOptions = useMemo(
    () => [...new Set(categories.filter(Boolean))].sort((a, b) => a.localeCompare(b, "fa")),
    [categories]
  );

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : "/shop");
    setOpen(false);
  };

  const selectCategory = (value) => {
    navigate(value ? `/shop?category=${encodeURIComponent(value)}` : "/shop");
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        elevated
          ? "border-slate-900/10 bg-white/80 shadow-[0_10px_40px_-28px_rgba(15,23,42,0.55)]"
          : "border-transparent bg-white/60"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:gap-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="پرایم شاپ">
          <img src={Logo} alt="" className="size-9 rounded-xl object-cover" />
          <span className="text-base font-bold tracking-tight text-slate-900">
            پرایم<span className="text-indigo-600"> شاپ</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={submitSearch}
          aria-label="جستجوی محصولات"
          role="search"
          className="ms-auto hidden max-w-md flex-1 items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 p-1.5 shadow-sm transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/10 md:flex"
        >
          <div className="relative">
            <select
              aria-label="انتخاب دسته‌بندی"
              defaultValue=""
              onChange={(event) => selectCategory(event.target.value)}
              className="max-w-40 cursor-pointer appearance-none truncate rounded-full bg-slate-100/80 py-2 ps-3.5 pe-8 text-xs font-medium text-slate-700 outline-none transition hover:bg-slate-100"
            >
              <option value="">همه دسته‌ها</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <label htmlFor="nav-search" className="sr-only">
            جستجوی محصولات
          </label>
          <input
            id="nav-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجوی محصول…"
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            aria-label="جستجو"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-900 text-white transition hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <Search size={16} aria-hidden="true" />
          </button>
        </form>

        <div className="ms-auto flex items-center gap-1 md:ms-0 md:gap-2">
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            aria-label={isAuthenticated ? "حساب کاربری من" : "ورود به حساب کاربری"}
            className="grid size-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-900"
          >
            <User size={19} aria-hidden="true" />
          </Link>

          <Link
            to="/cart"
            aria-label={`سبد خرید، ${cartCount.toLocaleString("fa-IR")} کالا`}
            className="relative grid size-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-900"
          >
            <ShoppingBag size={19} aria-hidden="true" />
            <CartBadge count={cartCount} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            className="grid size-10 place-items-center rounded-full text-slate-700 transition hover:bg-slate-900/5 lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-900/5 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              <form
                onSubmit={submitSearch}
                aria-label="جستجوی محصولات"
                role="search"
                className="mb-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2"
              >
                <Search size={16} aria-hidden="true" className="shrink-0 text-slate-400" />
                <label htmlFor="nav-search-mobile" className="sr-only">
                  جستجوی محصولات
                </label>
                <input
                  id="nav-search-mobile"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="جستجوی محصول…"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </form>

              <label htmlFor="nav-category-mobile" className="sr-only">
                انتخاب دسته‌بندی
              </label>
              <select
                id="nav-category-mobile"
                defaultValue=""
                onChange={(event) => selectCategory(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none"
              >
                <option value="">همه دسته‌ها</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-900/5"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                <span>رفتن به سبد خرید</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">
                  {cartCount.toLocaleString("fa-IR")}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
