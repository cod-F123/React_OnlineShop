import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownWideNarrow, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import api from "../service/api";
import SpecialProducts from "../components/SpecialProducts";
import ShopFilters from "../components/shop/ShopFilters";
import ShopPagination from "../components/shop/ShopPagination";
import ShopProductGrid from "../components/shop/ShopProductGrid";
import { toAmount } from "../lib/format";
import { toPersianDigits } from "../lib/phone";

function readFilters(searchParams) {
  return {
    search: searchParams.get("search") ?? "",
    tag: searchParams.get("tag") ?? "",
    category: searchParams.get("category") ?? "",
    ordering: searchParams.get("ordering") ?? "",
  };
}

function isTrue(value) {
  return value === true || ["true", "1", "yes"].includes(String(value ?? "").trim().toLowerCase());
}

function getEffectivePrice(product) {
  const price = toAmount(product.price);
  const offedPrice = toAmount(product.offed_price);
  if (isTrue(product.is_offed) && offedPrice !== null && price !== null && offedPrice < price) {
    return offedPrice;
  }
  return price;
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsKey = searchParams.toString();
  const filters = useMemo(() => readFilters(new URLSearchParams(paramsKey)), [paramsKey]);
  const [products, setProducts] = useState([]);
  const [specialSuggestionProducts, setSpecialSuggestionProducts] = useState({});
  const [isSpecialLoading, setIsSpecialLoading] = useState(true);
  const [completedRequestKey, setCompletedRequestKey] = useState(null);
  const [errorRequestKey, setErrorRequestKey] = useState(null);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [pageUrl, setPageUrl] = useState(null);
  const [draftPrice, setDraftPrice] = useState({ min: "", max: "" });
  const [appliedPrice, setAppliedPrice] = useState({ min: "", max: "" });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const activePageTarget = pageUrl?.paramsKey === paramsKey ? pageUrl : null;
  const page = activePageTarget?.page || 1;
  const isLoading = completedRequestKey !== `${paramsKey}|${activePageTarget?.url || "first"}`;
  const error = errorRequestKey === `${paramsKey}|${activePageTarget?.url || "first"}`;
  const requestUrl = activePageTarget?.url || `/shop/api/v1/product/?search=${encodeURIComponent(filters.search)}&tag=${encodeURIComponent(filters.tag)}&category__name=${encodeURIComponent(filters.category)}&ordering=${encodeURIComponent(filters.ordering)}&page=1`;
  const requestKey = `${paramsKey}|${activePageTarget?.url || "first"}`;

  useEffect(() => {
    let active = true;

    api.get(requestUrl).then((response) => {
      if (!active) return;
      const data = response.data || {};
      const results = data.results ?? data.result ?? data;
      const list = Array.isArray(results) ? results : [];

      setProducts(list);
      setCount(Number(data.count) || list.length);
      setNext(typeof data.next === "string" && data.next ? data.next : null);
      setPrevious(typeof data.previous === "string" && data.previous ? data.previous : null);

      const currentPage = Number(new URL(requestUrl, window.location.origin).searchParams.get("page")) || 1;
      if (currentPage === 1 && list.length > 0) setPageSize(list.length);
      setErrorRequestKey(null);
      setCompletedRequestKey(requestKey);
    }).catch((requestError) => {
      console.error(requestError);
      if (!active) return;
      setProducts([]);
      setCount(0);
      setNext(null);
      setPrevious(null);
      setErrorRequestKey(requestKey);
      setCompletedRequestKey(requestKey);
    });

    return () => {
      active = false;
    };
  }, [requestKey, requestUrl]);

  useEffect(() => {
    let active = true;
    api.get("/shop/api/v1/special-suggestion/").then((response) => {
      if (active) setSpecialSuggestionProducts(response.data || {});
    }).catch((requestError) => {
      console.error(requestError);
      if (active) setSpecialSuggestionProducts({});
    }).finally(() => {
      if (active) setIsSpecialLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const categoryCounts = new Map();
    products.forEach((product) => {
      const name = product?.category?.name;
      if (!name) return;
      categoryCounts.set(name, (categoryCounts.get(name) || 0) + 1);
    });
    if (filters.category && !categoryCounts.has(filters.category)) {
      categoryCounts.set(filters.category, 0);
    }
    return [...categoryCounts.entries()]
      .map(([name, categoryCount]) => ({ name, count: categoryCount }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "fa"));
  }, [products, filters.category]);

  const visibleProducts = useMemo(() => {
    const minimum = appliedPrice.min === "" ? null : Number(appliedPrice.min);
    const maximum = appliedPrice.max === "" ? null : Number(appliedPrice.max);
    return products.filter((product) => {
      const price = getEffectivePrice(product);
      if (price === null) return minimum === null && maximum === null;
      if (minimum !== null && price < minimum) return false;
      if (maximum !== null && price > maximum) return false;
      return true;
    });
  }, [products, appliedPrice]);

  const updateFilter = (key, value) => {
    if (key === "minPrice") {
      setDraftPrice((current) => ({ ...current, min: value }));
      return;
    }
    if (key === "maxPrice") {
      setDraftPrice((current) => ({ ...current, max: value }));
      return;
    }
    if (key === "applyPrice") {
      setAppliedPrice(draftPrice);
      return;
    }

    setSearchParams((current) => {
      const updated = new URLSearchParams(current);
      if (value) updated.set(key, value);
      else updated.delete(key);
      return updated;
    });
    setPageUrl(null);
  };

  const resetFilters = () => {
    setSearchParams({});
    setDraftPrice({ min: "", max: "" });
    setAppliedPrice({ min: "", max: "" });
    setPageUrl(null);
  };

  const navigatePage = (url, targetPage) => {
    if (!url) return;
    setPageUrl({ url, page: targetPage || 1, paramsKey });
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const filterProps = {
    categories,
    filters: { ...filters, minPrice: draftPrice.min, maxPrice: draftPrice.max },
    onChange: updateFilter,
    onReset: resetFilters,
  };

  return (
    <>
      <Helmet>
        <title>فروشگاه | پرایم شاپ</title>
        <meta name="description" content="محصولات منتخب پرایم شاپ را بررسی کنید؛ جست‌وجو، دسته‌بندی و مرتب‌سازی محصولات با قیمت روز." />
        <meta property="og:title" content="فروشگاه | پرایم شاپ" />
        <meta property="og:description" content="محصولات منتخب را پیدا کنید و سفارش خود را آسان ثبت کنید." />
        <link rel="canonical" href="/shop" />
      </Helmet>

      <main dir="rtl" lang="fa" className="min-h-screen bg-[#fafaf8] pb-16">
        <header className="relative isolate overflow-hidden bg-[#111a18] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_28rem_at_0%_0%,rgba(105,132,109,0.28),transparent_65%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-[0.055]" />
          <div className="relative mx-auto max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wide text-emerald-200">
                <Sparkles size={14} aria-hidden="true" />
                انتخاب‌های پرایم شاپ
              </span>
              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                محصول درست،<br className="sm:hidden" /> برای انتخابی مطمئن.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                مجموعه‌ای از کالاهای کاربردی و منتخب را با آرامش بررسی کنید؛ جزئیات و قیمت هر محصول شفاف در دسترس شماست.
              </p>

              <label className="mt-7 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 transition focus-within:border-emerald-300/60 focus-within:bg-white/10 focus-within:ring-4 focus-within:ring-emerald-300/10">
                <Search size={18} aria-hidden="true" className="shrink-0 text-emerald-200" />
                <span className="sr-only">جست‌وجوی محصولات</span>
                <input
                  type="search"
                  value={filters.search}
                  onChange={(event) => updateFilter("search", event.target.value)}
                  placeholder="نام محصول یا دسته‌بندی را جست‌وجو کنید"
                  className="h-13 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                />
                {filters.search && (
                  <button
                    type="button"
                    onClick={() => updateFilter("search", "")}
                    aria-label="پاک‌کردن عبارت جست‌وجو"
                    className="grid size-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <X size={15} aria-hidden="true" />
                  </button>
                )}
              </label>
            </motion.div>
          </div>
          <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-l from-transparent via-emerald-100/30 to-transparent" />
        </header>

        {specialSuggestionProducts?.is_active && Number(specialSuggestionProducts?.remaining_sconds) > 0 && (
          <section className="mx-auto max-w-[90rem] px-4 pt-7 sm:px-6 lg:px-10">
            <SpecialProducts specialSuggestion={specialSuggestionProducts} isLoading={isSpecialLoading} />
          </section>
        )}

        <div className="mx-auto max-w-[90rem] px-4 pt-8 sm:px-6 lg:px-10 lg:pt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black tracking-[0.16em] text-emerald-700">فروشگاه آنلاین</p>
              <h2 className="mt-1.5 text-xl font-black text-slate-900 sm:text-2xl">همه محصولات</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ArrowDownWideNarrow size={15} aria-hidden="true" />
              <span>{isLoading ? "در حال دریافت کالاها" : `${toPersianDigits(count)} محصول`}</span>
            </div>
          </div>

          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen((open) => !open)}
              aria-expanded={isMobileFiltersOpen}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-800"
            >
              <span className="inline-flex items-center gap-2"><SlidersHorizontal size={15} aria-hidden="true" /> فیلتر و مرتب‌سازی</span>
              <span className="text-slate-400">{isMobileFiltersOpen ? "بستن" : "نمایش"}</span>
            </button>
            {isMobileFiltersOpen && <div className="mt-3"><ShopFilters {...filterProps} mobile /></div>}
          </div>

          <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)] xl:gap-8">
            <div className="hidden lg:block"><ShopFilters {...filterProps} /></div>
            <section aria-label="فهرست محصولات" className="min-w-0">
              {error && !isLoading && (
                <div role="alert" className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
                  <span>دریافت محصولات با خطا مواجه شد. لطفاً دوباره تلاش کنید.</span>
                  <button type="button" onClick={() => setPageUrl(null)} className="font-bold text-rose-800">تلاش دوباره</button>
                </div>
              )}

              {appliedPrice.min !== draftPrice.min || appliedPrice.max !== draftPrice.max ? (
                <button
                  type="button"
                  onClick={() => setDraftPrice(appliedPrice)}
                  className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600"
                >
                  <X size={13} aria-hidden="true" />
                  لغو تغییر محدوده قیمت
                </button>
              ) : null}

              <ShopProductGrid
                products={visibleProducts}
                isLoading={isLoading}
                onClearFilters={resetFilters}
              />
              {!isLoading && !error && (
                <ShopPagination
                  previous={previous}
                  next={next}
                  page={page}
                  count={count}
                  pageSize={pageSize}
                  onNavigate={navigatePage}
                />
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Shop;
