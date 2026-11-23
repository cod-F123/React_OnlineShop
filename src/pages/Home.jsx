import { useEffect, useMemo, useState } from "react";
import { Helmet } from 'react-helmet-async';
import api from "../service/api";
import LandingNav from "../components/landing/LandingNav";
import Hero from "../components/landing/Hero";
import TrustBar from "../components/landing/TrustBar";
import CategoryShowcase from "../components/landing/CategoryShowcase";
import FeaturedProducts from "../components/landing/FeaturedProducts";
import Newsletter from "../components/landing/Newsletter";
import LandingFooter from "../components/landing/LandingFooter";

function Home(){

    const [products, setProducts] = useState([]);
    const [productsIsLoading, setProductIsLoading] = useState(true);

    useEffect(()=>{
        let active = true;
        api.get('/shop/api/v1/product/?ordering=-discount').then((res)=>{
            const data = res.data || {};
            const results = data.results ?? data.result ?? data;
            if (active) setProducts(Array.isArray(results) ? results : []);
        }).catch(()=>{
            if (active) setProducts([]);
        }).finally(()=>{
            if (active) setProductIsLoading(false);
        });

        return () => { active = false; };
    },[])

    const categories = useMemo(()=>{
        const map = new Map();

        products.forEach((product)=>{
            const name = product?.category?.name;
            if (!name) return;

            const entry = map.get(name) || { name, image: null, count: 0 };
            entry.count += 1;
            if (!entry.image && product.image) entry.image = product.image;
            map.set(name, entry);
        });

        return [...map.values()].sort((a, b)=> b.count - a.count);
    },[products]);

    const heroImage = useMemo(()=> products.find((product)=> product.image)?.image ?? null, [products]);
    const categoryNames = useMemo(()=> categories.map((category)=> category.name), [categories]);

    return <>
    <Helmet>
        <title>پرایم شاپ | فروشگاه آنلاین محصولات منتخب</title>
        <meta name="description" content="فروشگاه آنلاین پرایم شاپ؛ خرید محصولات منتخب با ارسال سریع، پرداخت امن و بازگشت آسان کالا. جدیدترین‌ها و بیشترین تخفیف‌ها را ببینید." />
        <meta property="og:title" content="پرایم شاپ | فروشگاه آنلاین محصولات منتخب" />
        <meta property="og:description" content="خرید آنلاین با ارسال رایگان برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان." />
        <link rel="canonical" href="/" />
    </Helmet>
        <main dir="rtl" lang="fa" className="min-h-screen bg-white">
            <LandingNav categories={categoryNames} />
            <Hero
                image={heroImage}
                subtitle="گزیده‌ای محدود از محصولات منتخب؛ با ارسال سریع، پرداخت امن و بازگشت آسان کالا. ارسال رایگان برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان."
            />
            <TrustBar />
            <CategoryShowcase categories={categories} />
            <FeaturedProducts data={{ results: products }} isLoading={productsIsLoading} limit={8} />
            <Newsletter />
            <LandingFooter />
        </main>
    </>
};

export default Home;
