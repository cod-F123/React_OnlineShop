import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import api from "../service/api";
import HeroHeader from "../components/HeroHeader";
import ProductList from "../components/ProductList";
import SpecialProducts from "../components/SpecialProducts";

function Home(){

    const [products, setProducts] = useState([]);
    const [discountProducts, setDiscountProducts] = useState([]);
    const [specialSuggestionProducts, setSpecialSuggestionProducts] = useState({});

    const [productsIsLoading, setProductIsLoading] = useState(true);
    const [discountIsLoading, setDiscountIsLoading] = useState(true);
    const [sspisLoading, setSspIsLoading] = useState(true);


    useEffect(()=>{
        setProductIsLoading(true)
        setDiscountIsLoading(true)
        api.get('/shop/api/v1/product/?ordering=added_at').then((res)=>{
            setProducts(res.data.result);
            setProductIsLoading(false)
        }).catch((error)=>{

        });

        api.get('/shop/api/v1/product/?ordering=-discount').then((res)=>{
            setDiscountProducts(res.data.result);
            setDiscountIsLoading(false)
        }).catch((error)=>{

        });

        setSspIsLoading(true);
        api.get("/shop/api/v1/special-suggestion/").then((response)=>{
            setSpecialSuggestionProducts(response.data);

            console.log(response.data)

        }).catch((error)=>{
            console.log(error);

        }).finally(()=>{
            setSspIsLoading(false);
        });
    },[])

    return <>
    <Helmet>
        <title>خانه | Prime Shop</title>
        <meta name="description" content="بهترین فروشگاه اینترنتی برای خرید آنلاین - جدیدترین محصولات، تخفیف‌های ویژه و ارسال سریع." />
        <meta property="og:title" content="خانه | Prime Shop" />
        <meta property="og:description" content="بهترین فروشگاه اینترنتی برای خرید آنلاین - جدیدترین محصولات و پیشنهادات ویژه." />
        <link rel="canonical" href="/" />
    </Helmet>
        <HeroHeader />
        <ProductList products={products} isLoading={productsIsLoading} label="جدید ترین محصولات" />
        {specialSuggestionProducts.is_active & specialSuggestionProducts.remaining_sconds > 0 ? <>
            <SpecialProducts specialSuggestion={specialSuggestionProducts} isLoading={sspisLoading} />
        </> : <>
        </>}

        <section dir="rtl" aria-label="دعوت به ورود و سفارش" className="mt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 p-8 text-white shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-right">
                  <h3 className="text-2xl font-extrabold">همین حالا وارد حساب خودت شو و سفارش بده</h3>
                  <p className="mt-2 text-indigo-100/90">با ورود به حساب، سابقه سفارش‌ها، تخفیف‌های اختصاصی و پرداخت سریع در دسترس شماست. تجربه‌ای شخصی‌تر و سریع‌تر از همیشه.</p>
                </div>

                <div className="flex flex-row-reverse gap-3">
                  <a href="/login" className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">ورود / ثبت‌نام</a>
                  <a href="/shop" className="inline-flex items-center justify-center rounded-md bg-white text-indigo-700 px-4 py-2 text-sm font-semibold">شروع سفارش</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductList label="محصولات باتخفیف بالا" isLoading={discountIsLoading} products={discountProducts}/>
    </>
};

export default Home;