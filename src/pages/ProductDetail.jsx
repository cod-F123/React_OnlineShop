import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../service/api';
import ProductItem from "../components/ProductItem";
import CommentList from "../components/CommentList";
import Loading from '../components/Loading';

  

function ProductDetail(){

    const [product, setProduct] = useState({});
    const [isLoading, setISLoading] = useState(true);

    const params = useParams();


    useEffect(()=>{
        const slug = params.id;

        api.get(`/shop/api/v1/product/${slug}/`).then((res)=>{
            setProduct(res.data);
            setISLoading(false)
        }).catch((error)=>{
            console.log(error)
        })
    },[]);


    const [idx, setIdx] = useState(0);
    const touchStartX = useRef(null);

    const next = () => setIdx(i => (i+1) % product.galary.length);
    const prev = () => setIdx(i => (i-1 + product.galary.length) % product.galary.length);

    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
    const onTouchEnd = (e) => {
        if(touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if(Math.abs(dx) > 40){ if(dx < 0) next(); else prev(); }
        touchStartX.current = null;
    }

    return (
        <>
        {isLoading ? <><Loading /></> :
         <><main dir="rtl" className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gallery */}
            <div className="md:col-span-1">
                <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                    src={product.galary[idx]?.img}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-80 object-contain bg-slate-50"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    />

                    <button aria-label="قبلی" onClick={prev} className="absolute top-1/2 hover:cursor-pointer -translate-y-1/2 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow">‹</button>
                    <button aria-label="بعدی" onClick={next} className="absolute top-1/2 hover:cursor-pointer -translate-y-1/2 left-3 bg-white/80 hover:bg-white p-2 rounded-full shadow">›</button>
                </div>

                <div className="mt-3 -mx-2 px-2 overflow-x-auto hide-scrollbar">
                    <div className="flex gap-3 w-max">
                    {product.galary.map((src,i)=> (
                        <button key={i} onClick={()=>setIdx(i)} className={`rounded-md hover:cursor-pointer overflow-hidden border-2 ${i===idx? 'border-indigo-500':'border-transparent'} focus:outline-none`}>
                        <img src={src.img} loading="lazy" alt={`${product.title} ${i+1}`} className="w-20 h-20 object-cover" />
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2">
                <div className="bg-white rounded-2xl p-6 shadow-md">
                <h1 className="text-2xl font-extrabold mb-2">{product.title}</h1>
                <div className="text-2xl text-rose-600 font-bold mb-4">{ product.is_offed ?<>{new Intl.NumberFormat("fa-IR").format(product.offed_price)} تومان  <del className='text-lg text-black '>{new Intl.NumberFormat("fa-IR").format(product.price)} تومان</del> </> : <span>{new Intl.NumberFormat("fa-IR").format(product.price)} تومان</span>}</div>

                <p className="text-slate-700 mb-4" dangerouslySetInnerHTML={{__html:product.description}}></p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className='col-span-2 md:col-span-1'>
                    <h4 className="text-sm font-semibold mb-2">مشخصات</h4>
                    <ul className="text-sm text-slate-600">
                        {product.Specifications.map((specs) => <li key={specs.key}><span className="font-medium">{specs.key}:</span> {specs.value}</li>)}
                    </ul>
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                    <h4 className="text-sm font-semibold mb-2">عملیات</h4>
                    <div className="flex gap-3">
                        <button className="px-4 py-2  hover:cursor-pointer bg-indigo-600 hover:bg-indigo-400 duration-75 text-white rounded-md">افزودن به سبد</button>
                        <button className="px-4 py-2  hover:cursor-pointer hover:bg-gray-900 hover:text-white duration-75 border rounded-md">افزودن به علاقه‌مندی</button>
                    </div>
                    </div>
                </div>

                <hr className="my-4" />

                <h3 className="text-lg font-bold mb-2">محصولات مرتبط</h3>
                <div className="-mx-4 px-4 overflow-x-auto hide-scrollbar">
                    <div className="flex gap-4 w-max py-2">
                    {/* {product.related.map(r => (
                        <div key={r.id} className="w-48 flex-shrink-0">
                        <ProductItem product={r} />
                        </div>
                    ))} */}
                    </div>
                </div>

                </div>

                <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">نظرات کاربران</h3>
                <CommentList comments={product.comments} />
                </div>
            </div>
            </div>
        </div>

        <style>{`
            .hide-scrollbar::-webkit-scrollbar{ display:none }
            .hide-scrollbar{ -ms-overflow-style: none; scrollbar-width: none }
        `}</style>
        </main></>
         }
        
        </>
    )
}

export default ProductDetail;