
import React, { useEffect, useMemo, useState } from 'react';
import ProductItem from './ProductItem';

function formatTime(ms){
  if(ms <= 0) return '۰۰:۰۰:۰۰';
  const total = Math.floor(ms/1000);
  const h = String(Math.floor(total/3600)).padStart(2,'0');
  const m = String(Math.floor((total%3600)/60)).padStart(2,'0');
  const s = String(total%60).padStart(2,'0');
  return `${h}:${m}:${s}`;
}

function SpecialProducts({ products = [] }){
  // countdown: default 6 hours from mount
  const endTime = useMemo(() => Date.now() + 1000*60*60*6, []);
  const [timeLeft, setTimeLeft] = useState(Math.max(0, endTime - Date.now()));

  useEffect(() => {
    const t = setInterval(() => {
      const left = Math.max(0, endTime - Date.now());
      setTimeLeft(left);
    }, 1000);
    return () => clearInterval(t);
  }, [endTime]);

  return (
    <section aria-label="محصولات ویژه" dir="rtl" className="py-8 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-rose-500 to-orange-400 text-white rounded-full px-3 py-1 text-sm font-bold">ویژه</div>
            <h3 className="text-2xl font-extrabold text-slate-900">پیشنهادات ویژه</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline text-sm text-slate-500">پایان فرصت در:</div>
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-2 rounded-lg font-mono font-bold shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 8v4l3 3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                <circle cx="12" cy="12" r="9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></circle>
              </svg>
              <span className="text-sm">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* left & right fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-l from-transparent to-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-white"></div>

          <div className="-mx-4 px-4 overflow-x-auto hide-scrollbar">
            <div className="flex gap-6 w-max py-2 items-stretch">
              {products.length ? products.map(p => (
                <div key={p.id} className="w-72 flex-shrink-0">
                  <ProductItem product={p} />
                </div>
              )) : (
                <div className="w-72 flex-shrink-0">
                  <ProductItem product={{ id: 's1', title: 'کالا ویژه', price: '۴۹۰,۰۰۰', image: 'https://via.placeholder.com/320x320?text=ویژه', badge: 'ویژه', discount: 30 }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar{ display:none }
        .hide-scrollbar{ -ms-overflow-style: none; scrollbar-width: none }
        /* updated eye-catching background for special section */
        section[aria-label="محصولات ویژه"] {
          background-image: radial-gradient(circle at 10% 20%, rgba(99,102,241,0.08), transparent 12%),
                            radial-gradient(circle at 90% 80%, rgba(236,72,153,0.06), transparent 12%),
                            linear-gradient(180deg, rgba(249,250,251,0.9), rgba(243,244,255,0.6));
          border-radius: 16px;
          padding: 18px 0;
        }

        /* subtle left/right fade overlay adjustments for clarity */
        .pointer-events-none.absolute.inset-y-0.left-0.w-20 { background: linear-gradient(90deg, rgba(255,255,255,1), transparent); }
        .pointer-events-none.absolute.inset-y-0.right-0.w-20 { background: linear-gradient(-90deg, rgba(255,255,255,1), transparent); }
      `}</style>
    </section>
  )
}

export default SpecialProducts;
