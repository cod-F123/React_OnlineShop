import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    ChevronLeft,
    Heart,
    MessageSquare,
    RotateCcw,
    ShieldCheck,
    ShoppingBag,
    Truck,
} from 'lucide-react';
import api from '../service/api';
import ProductItem from "../components/ProductItem";
import useCart from '../hooks/CartHook';
import useAlert from '../hooks/AlertHook';
import CommentList from "../components/CommentList";
import Loading from '../components/Loading';
import Page404 from './Page404';
import ProductGallery from '../components/product/ProductGallery';
import SpecificationsList from '../components/product/SpecificationsList';
import Stars from '../components/product/Stars';
import { formatToman, getPricing, toAmount } from '../lib/format';
import { toPersianDigits } from '../lib/phone';

const easing = [0.22, 1, 0.36, 1];

const guarantees = [
    { icon: Truck, label: 'ارسال سریع' },
    { icon: ShieldCheck, label: 'پرداخت امن' },
    { icon: RotateCcw, label: 'بازگشت ۷ روزه' },
];

function ProductDetail(){

    const [product, setProduct] = useState({});
    const [isLoading, setISLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const {setMessage, setTypeAlert} = useAlert();
    const [isNotFound, setIsNotFound] = useState(false);
    const {addCartItem, checkCart, deleteCartItem} = useCart();

    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        const slug = params.id;

        api.get(`/shop/api/v1/product/${slug}/`).then((res)=>{
            setProduct(res.data);
            setComments(res.data.comments);
            
        }).catch((error)=>{
            console.log(error)
            setTypeAlert("error");
            // axios error object keeps response.status under error.response.status
            const status = error?.response?.status ?? error?.status
            if (status === 404){
                // show 404 page inside this route
                setIsNotFound(true);
            }else{
                setMessage("دریافت اطلاعات با خطا مواجه شد")
                navigate("/");
            }
        }).finally(()=>{
            setISLoading(false);
        })
    },[params]);


    const [idx, setIdx] = useState(0);
    const [tab, setTab] = useState("specs");
    const touchStartX = useRef(null);
    const reduceMotion = useReducedMotion();

    const gallery = useMemo(()=>{
        if (Array.isArray(product.galary) && product.galary.length) return product.galary;
        return product.image ? [{ id: "main", img: product.image }] : [];
    },[product.galary, product.image]);

    const next = () => setIdx(i => (i+1) % Math.max(gallery.length, 1));
    const prev = () => setIdx(i => (i-1 + Math.max(gallery.length, 1)) % Math.max(gallery.length, 1));

    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
    const onTouchEnd = (e) => {
        if(touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if(Math.abs(dx) > 40){ if(dx < 0) next(); else prev(); }
        touchStartX.current = null;
    }

    const pricing = getPricing(product);
    const stock = toAmount(product.stock);
    const isOffedFlag = product.is_offed === true || String(product.is_offed ?? "").toLowerCase() === "true";
    const onSale = pricing.onSale || (isOffedFlag && pricing.offedPrice !== null);
    const finalPrice = onSale ? pricing.offedPrice : pricing.price;
    const discountPercent = Math.round(toAmount(product.discount) ?? pricing.discount ?? 0);
    const isExistent = product.is_exist === undefined || product.is_exist === null
        ? true
        : !(product.is_exist === false || String(product.is_exist).toLowerCase() === "false");
    const inStock = isExistent && (stock === null || stock > 0);
    const lowStock = inStock && stock !== null && stock < 5;
    const category = product.category;
    const tagLabel = product.tag === "Special" ? "ویژه" : product.tag;
    const relatedProducts = Array.isArray(product.related_products) ? product.related_products : [];
    const specifications = Array.isArray(product.Specifications) ? product.Specifications : [];

    const averageRating = useMemo(()=>{
        if (!comments.length) return 0;
        const total = comments.reduce((sum, comment)=> sum + (Number(comment.rating) || 0), 0);
        return Math.round((total / comments.length) * 10) / 10;
    },[comments]);

    const averageRatingLabel = toPersianDigits(averageRating.toLocaleString("fa-IR"));

    const ratingBuckets = useMemo(()=>{
        return [5, 4, 3, 2, 1].map((score)=>({
            score,
            count: comments.filter((comment)=> Math.round(Number(comment.rating)) === score).length,
        }));
    },[comments]);

    const tabs = [
        { id: "specs", label: "مشخصات فنی" },
        { id: "reviews", label: `نظرات کاربران (${toPersianDigits(comments.length)})`, icon: MessageSquare },
    ];

    return (
        <>
        {isLoading ? <><Loading /></> : isNotFound ? <Page404 /> :
         <><Helmet>
             <title>{product.title ? product.title + ' | پرایم شاپ' : 'محصول'}</title>
             <meta name="description" content={product.short_description || product.description?.slice(0,150) || 'مشخصات و جزئیات محصول'} />
             <meta property="og:title" content={product.title ? product.title + ' | پرایم شاپ' : 'محصول'} />
             <meta property="og:description" content={product.short_description || product.description?.slice(0,150) || ''} />
         </Helmet>
        <main dir="rtl" lang="fa" className="min-h-[90vh] bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <nav aria-label="مسیر صفحه" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <Link to="/" className="transition hover:text-slate-900">خانه</Link>
                <ChevronLeft size={14} aria-hidden="true" className="text-slate-300" />
                <Link to="/shop" className="transition hover:text-slate-900">فروشگاه</Link>
                {category?.name && <>
                    <ChevronLeft size={14} aria-hidden="true" className="text-slate-300" />
                    <Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="transition hover:text-slate-900">{category.name}</Link>
                </>}
                <ChevronLeft size={14} aria-hidden="true" className="text-slate-300" />
                <span className="font-bold text-slate-800 line-clamp-1">{product.title}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
                <div className="lg:order-2 lg:sticky lg:top-24">
                    <ProductGallery
                        images={gallery}
                        title={product.title}
                        index={idx}
                        tag={tagLabel}
                        onSelect={setIdx}
                        onPrev={prev}
                        onNext={next}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    />
                </div>

                <div className="lg:order-1">
                    <div className="flex flex-wrap items-center gap-2">
                        {product.tag && (
                            <span className="rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700">{tagLabel}</span>
                        )}
                        {onSale && discountPercent > 0 && (
                            <span className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700">
                                {toPersianDigits(discountPercent)}٪ تخفیف
                            </span>
                        )}
                        <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ${inStock ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                            <span aria-hidden="true" className={`size-1.5 rounded-full ${inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                            {inStock ? "موجود در انبار" : "ناموجود"}
                        </span>
                    </div>

                    <h1 className="mt-4 text-2xl font-black leading-[1.6] text-slate-900 sm:text-3xl lg:text-4xl">
                        {product.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        {category?.name && (
                            <Link
                                to={`/shop?category=${encodeURIComponent(category.name)}`}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                            >
                                {category.image && (
                                    <img src={category.image} alt="" loading="lazy" className="size-5 rounded-full object-cover" />
                                )}
                                {category.name}
                            </Link>
                        )}

                        {comments.length > 0 && (
                            <button
                                type="button"
                                onClick={()=>setTab("reviews")}
                                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-slate-900"
                            >
                                <Stars value={averageRating} size={15} />
                                {averageRatingLabel} از ۵ · {toPersianDigits(comments.length)} نظر
                            </button>
                        )}
                    </div>

                    <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                        <div className="flex flex-wrap items-end gap-3">
                            <span className="text-3xl font-black text-slate-900">{formatToman(finalPrice)}</span>
                            {onSale && (
                                <del className="text-base font-medium text-slate-400">{formatToman(pricing.price)}</del>
                            )}
                        </div>
                        {lowStock && (
                            <p className="mt-2 text-xs font-bold text-orange-600">
                                تنها {toPersianDigits(stock)} عدد در انبار باقی مانده
                            </p>
                        )}
                    </div>

                    {product.description && (
                        <div className="mt-7">
                            <h2 className="text-sm font-bold text-slate-900">توضیحات محصول</h2>
                            <div className="rich-text mt-3" dangerouslySetInnerHTML={{__html:product.description}}></div>
                        </div>
                    )}

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        {checkCart(product.id) ? (
                            <button
                                type="button"
                                onClick={()=>{deleteCartItem(product.id)}}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm font-bold text-rose-700 transition hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                            >
                                حذف از سبد خرید
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={()=>{addCartItem(product.id, product.title, product.is_offed ? product.offed_price : product.price, product.image)}}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-[0_20px_40px_-24px_rgba(15,23,42,0.9)] transition hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                <ShoppingBag size={18} aria-hidden="true" />
                                افزودن به سبد خرید
                            </button>
                        )}

                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                        >
                            <Heart size={18} aria-hidden="true" />
                            افزودن به علاقه‌مندی
                        </button>
                    </div>

                    <ul className="mt-6 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                        {guarantees.map((item)=> {
                            const Icon = item.icon;

                            return (
                                <li key={item.label} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                    <Icon size={16} aria-hidden="true" className="shrink-0 text-indigo-600" />
                                    {item.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <section aria-label="جزئیات محصول" className="mt-14 lg:mt-20">
                <div role="tablist" aria-label="اطلاعات محصول" className="flex flex-wrap items-center gap-2 border-b border-slate-200">
                    {tabs.map((item)=> {
                        const Icon = item.icon;
                        const isActive = tab === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={()=>setTab(item.id)}
                                className={`relative inline-flex items-center gap-2 px-4 py-3 text-sm font-bold transition ${isActive ? "text-indigo-700" : "text-slate-500 hover:text-slate-800"}`}
                            >
                                {Icon && <Icon size={16} aria-hidden="true" />}
                                {item.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="product-tab-underline"
                                        className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-indigo-600"
                                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: easing }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={tab}
                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: easing }}
                        className="pt-8"
                    >
                        {tab === "specs" ? (
                            <SpecificationsList specifications={specifications} />
                        ) : (
                            <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
                                <div className="h-max rounded-3xl border border-slate-200 bg-slate-50/70 p-6">
                                    <p className="text-4xl font-black text-slate-900">{averageRatingLabel}</p>
                                    <Stars value={averageRating} size={18} className="mt-2" />
                                    <p className="mt-3 text-sm text-slate-600">
                                        میانگین امتیاز از {toPersianDigits(comments.length)} نظر ثبت‌شده
                                    </p>

                                    {comments.length > 0 && (
                                        <ul className="mt-6 space-y-3">
                                            {ratingBuckets.map((bucket)=> {
                                                const percent = Math.round((bucket.count / comments.length) * 100);

                                                return (
                                                    <li key={bucket.score} className="flex items-center gap-3 text-xs text-slate-500">
                                                        <span className="w-8 shrink-0 font-bold text-slate-700">{toPersianDigits(bucket.score)} ★</span>
                                                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                                                            <span className="block h-full rounded-full bg-amber-400" style={{ width: `${percent}%` }} />
                                                        </span>
                                                        <span className="w-9 shrink-0 text-end">{toPersianDigits(bucket.count)}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>

                                <CommentList comments={comments} setComments={setComments} setIsLoading={setISLoading} productId={product.id} />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </section>

            {relatedProducts.length > 0 && (
                <section aria-labelledby="related-heading" className="mt-16">
                    <h2 id="related-heading" className="text-xl font-black text-slate-900">محصولات مرتبط</h2>
                    <div className="hide-scrollbar mt-6 -mx-4 overflow-x-auto px-4">
                        <ul className="flex w-max gap-5 py-2">
                            {relatedProducts.map(r => (
                                <li key={r.id} className="w-64 shrink-0">
                                    <ProductItem product={r} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </div>
        </main></>
         }
        
        </>
    )
}

export default ProductDetail;
