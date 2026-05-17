import React, { useState } from "react";
import useAuth from "../hooks/AuthHook";
import { Link } from "react-router-dom";

function Nav(){
  const [open, setOpen] = useState(false);
  const {isAuthenticated} = useAuth();

  const cartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );

  const menu = (
    <ul className="hidden md:flex gap-6 items-center list-none m-0 p-0">
      <li><Link to="/" className="px-3 py-2 rounded hover:bg-gray-100 transition">خانه</Link></li>
      <li><Link to="/shop" className="px-3 py-2 rounded hover:bg-gray-100 transition">فروشگاه</Link></li>
      <li>
        <Link to="/cart" aria-label="Cart" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded hover:bg-gray-100 transition">
          <span className="w-5 h-5 text-gray-700" aria-hidden>{cartIcon}</span>
          <span className="sr-only">سبد خرید</span>
          <span className="ml-1 text-gray-800">سبد خرید</span>
        </Link>
      </li>
      <li>
        {isAuthenticated ? <>
        <Link to="/dashboard" className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition inline-flex items-center gap-2">
          داشبورد
        </Link>
        </> : <>
        <Link to="/login" className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          ورود
        </Link>
        </>}
        
      </li>
    </ul>
  );

  return (
    <nav dir="rtl" className="shadow max-md:w-96 md:min-w-2xl mt-3 rounded-4xl bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-extrabold text-xl text-gray-900">فروشگاه من</Link>

          {/* Desktop menu */}
          {menu}

          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className={"p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform duration-200 " + (open ? 'rotate-90' : '')}
            >
              <span className="text-2xl">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
    <div dir="rtl" className={"md:hidden bg-white border-t transition-all duration-200 rounded-b-4xl " + (open ? 'block opacity-100 translate-y-0 scale-100' : 'hidden')}>
        <div className="px-4 pt-3 pb-4 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100 transition transform hover:scale-105">خانه</Link>
          <Link to="/shop" className="block px-3 py-2 rounded hover:bg-gray-100 transition transform hover:scale-105">فروشگاه</Link>
          <Link to="/about" className="block px-3 py-2 rounded hover:bg-gray-100 transition transform hover:scale-105">درباره ما</Link>
        <Link to="/cart" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition transform hover:scale-105">{cartIcon}<span>سبد خرید</span></Link>
          {isAuthenticated ? <>
          <Link to="/dashboard" className=" px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 inline-flex items-center justify-center">
            داشبورد
          </Link>
          </> : <>
          <Link to="/login" className=" px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </Link>
          </>}
        </div>
      </div>
    </nav>
  );
}

export default Nav;