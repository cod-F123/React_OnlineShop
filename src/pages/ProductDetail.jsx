import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import ProductItem from "../components/ProductItem";
import useCart from '../hooks/CartHook';
import useAlert from '../hooks/AlertHook';
import CommentList from "../components/CommentList";
import Loading from '../components/Loading';
import Page404 from './Page404';

  

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
        {isLoading ? <><Loading /></> : isNotFound ? <Page404 /> :
         <><main dir="rtl" className="py-12 min-h-[90vh]">
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
                        {checkCart(product.id) ? <>
                        <button onClick={(e)=>{deleteCartItem(product.id)}} className="inline-flex items-center px-4 py-2 bg-red-600 hover:cursor-pointer text-white rounded-md text-sm hover:bg-red-700 sm:w-auto justify-center">حذف از سبد</button>
                        </> : <>
                        <button onClick={(e)=>{addCartItem(product.id, product.title, product.is_offed ? product.offed_price : product.price, product.image)}} className="px-4 py-2 text-sm hover:cursor-pointer bg-indigo-600 hover:bg-indigo-400 duration-75 text-white rounded-md">افزودن به سبد</button>
                        </>}
                        
                        <button className="px-4 py-2  hover:cursor-pointer hover:bg-gray-900 hover:text-white duration-75 border rounded-md">افزودن به علاقه‌مندی</button>
                    </div>
                    </div>
                </div>

                <hr className="my-4" />

                <h3 className="text-lg font-bold mb-2">محصولات مرتبط</h3>
                <div className="-mx-4 px-4 overflow-x-auto hide-scrollbar">
                    <div className="flex gap-4 w-max py-2">
                    {product.related_products.map(r => (
                        <div key={r.id} className="w-48 lg:w-72 flex-shrink-0">
                        <ProductItem product={r} />
                        </div>
                    ))}
                    </div>
                </div>

                </div>

                <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">نظرات کاربران</h3>
                <CommentList comments={comments} setComments={setComments} setIsLoading={setISLoading} productId={product.id} />
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