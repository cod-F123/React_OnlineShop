import React, { useState, useRef } from 'react';
import ProductItem from "../components/ProductItem";
import CommentList from "../components/CommentList";
import ProductImage from "../assets/images/p1.webp"
import ProductImage2 from "../assets/images/p2.webp"

const demoProduct = {
  id: 101,
  title: 'هدفون بی‌سیم شیک',
  price: '۱,۴۹۰,۰۰۰ تومان',
  images: [
    ProductImage,
    ProductImage2,
    'https://via.placeholder.com/640x640?text=3'
  ],
  description: 'هدفون بی‌سیم با کیفیت بالا، باتری طولانی و طراحی ارگونومیک. صدای شفاف و بیس متعادل.',
  specs: [ ['رنگ','مشکی'], ['باتری','۳۰ ساعت'], ['وزن','۱۸۰ گرم'] ],
  related: [
    { id: 2, title: 'کیف چرمی', price: '۳۹۰,۰۰۰', image: 'https://via.placeholder.com/320x320?text=کیف' },
    { id: 3, title: 'کابل شارژ سریع', price: '۹۰,۰۰۰', image: 'https://via.placeholder.com/320x320?text=کابل' },
    { id: 4, title: 'کابل شارژ سریع', price: '۹۰,۰۰۰', image: 'https://via.placeholder.com/320x320?text=کابل' },
    { id: 5, title: 'کابل شارژ سریع', price: '۹۰,۰۰۰', image: 'https://via.placeholder.com/320x320?text=کابل' },
    { id: 6, title: 'کابل شارژ سریع', price: '۹۰,۰۰۰', image: 'https://via.placeholder.com/320x320?text=کابل' },
    { id: 7, title: 'کابل شارژ سریع', price: '۹۰,۰۰۰', image: 'https://via.placeholder.com/320x320?text=کابل' },
  ]
}

function ProductDetail({ product = demoProduct }){
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef(null);

  const next = () => setIdx(i => (i+1) % product.images.length);
  const prev = () => setIdx(i => (i-1 + product.images.length) % product.images.length);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if(touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if(Math.abs(dx) > 40){ if(dx < 0) next(); else prev(); }
    touchStartX.current = null;
  }

  return (
    <main dir="rtl" className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gallery */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.images[idx]}
                  alt={product.title}
                  className="w-full h-80 object-contain bg-slate-50"
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                />

                <button aria-label="قبلی" onClick={prev} className="absolute top-1/2 hover:cursor-pointer -translate-y-1/2 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow">‹</button>
                <button aria-label="بعدی" onClick={next} className="absolute top-1/2 hover:cursor-pointer -translate-y-1/2 left-3 bg-white/80 hover:bg-white p-2 rounded-full shadow">›</button>
              </div>

              <div className="mt-3 -mx-2 px-2 overflow-x-auto hide-scrollbar">
                <div className="flex gap-3 w-max">
                  {product.images.map((src,i)=> (
                    <button key={i} onClick={()=>setIdx(i)} className={`rounded-md hover:cursor-pointer overflow-hidden border-2 ${i===idx? 'border-indigo-500':'border-transparent'} focus:outline-none`}>
                      <img src={src} alt={`${product.title} ${i+1}`} className="w-20 h-20 object-cover" />
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
              <div className="text-2xl text-rose-600 font-bold mb-4">{product.price}</div>

              <p className="text-slate-700 mb-4">{product.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className='col-span-2 md:col-span-1'>
                  <h4 className="text-sm font-semibold mb-2">مشخصات</h4>
                  <ul className="text-sm text-slate-600">
                    {product.specs.map(([k,v]) => <li key={k}><span className="font-medium">{k}:</span> {v}</li>)}
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
                  {product.related.map(r => (
                    <div key={r.id} className="w-48 flex-shrink-0">
                      <ProductItem product={r} />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">نظرات کاربران</h3>
              <CommentList />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar{ display:none }
        .hide-scrollbar{ -ms-overflow-style: none; scrollbar-width: none }
      `}</style>
    </main>
  )
}

export default ProductDetail;