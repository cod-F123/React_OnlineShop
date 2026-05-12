import React from "react";
import ProductImage from '../assets/images/SBD-BR.jpg';

function HeroHeader() {
  return (
    <header dir="rtl" aria-label="هدر قهرمان" className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center py-12">
          <div className="text-right">
            <p className="inline-block text-sm font-semibold text-indigo-600 mb-2">جدید — ویژه</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">فروشگاه شیک برای خریدهای باکلاس</h1>
            <p className="mt-4 text-slate-600 max-w-xl">مجموعه‌ای از محصولات منتخب با طراحی مدرن و قیمت مناسب. تجربه‌ای ساده، امن و تحویل سریع در سراسر کشور.</p>

            <div className="mt-6 flex flex-row-reverse gap-3 justify-end sm:justify-start">
              <a href="#shop" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700">خرید کن</a>
              <a href="#about" className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">اطلاعات بیشتر</a>
            </div>

            <ul className="mt-6 flex flex-row-reverse gap-6 text-sm text-slate-500">
              <li className="flex items-center">ارسال رایگان</li>
              <li className="flex items-center">گارانتی اصالت</li>
              <li className="flex items-center">پشتیبانی 24/7</li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white p-6 shadow-lg">
                {/* Product card / illustration */}
                <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center">
                    <img src={ProductImage} className=" rounded-xl text-slate-300" alt="محصول" />
                  {/* <svg className="w-40 h-40 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 7v10a2 2 0 0 0 2 2h14V5H5a2 2 0 0 0-2 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 text-xs text-slate-400">محصول منتخب</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroHeader;