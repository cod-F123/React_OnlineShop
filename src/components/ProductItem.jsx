import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/CartHook';

function ProductItem({ product }){
  const { title, price, image, tag } = product;
  const {checkCart, addCartItem, deleteCartItem} = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-transform transform hover:-translate-y-1" dir="rtl" aria-label={title}>
      <Link to={`/product/${product.slug}/`} className="relative">
        <img src={image} alt={title} loading="lazy" className="w-full h-48 sm:h-56 object-cover bg-slate-50" />
        {tag && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">{tag == 'Special' ? "ویژه" : "بیشترین فروش"}</span>
        )}
        {/* discount tag */}
        {product.discount && product.discount > 0 ? (
          <div className="absolute -bottom-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-6 shadow">-{product.discount}%</div>
        ) : null}
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/product/${product.slug}/`} >
        <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-slate-700 font-bold flex flex-col-reverse">{ product.is_offed ?<>{new Intl.NumberFormat("fa-IR").format(product.offed_price)} تومان  <del className='text-sm text-black '>{new Intl.NumberFormat("fa-IR").format(product.price)} تومان</del> </> : <span>{new Intl.NumberFormat("fa-IR").format(product.price)} تومان</span>}</div>
            {checkCart(product.id) ? <>
            <button onClick={(e)=>{deleteCartItem(product.id)}} className="inline-flex items-center px-3 py-2 bg-red-600 hover:cursor-pointer text-white rounded-md text-sm hover:bg-red-700 w-full sm:w-auto justify-center">حذف</button>
            </> : <>
            <button onClick={(e)=>{addCartItem(product.id, product.title, product.is_offed ? product.offed_price : product.price, product.image)}} className="inline-flex items-center px-3 py-2 bg-indigo-600 hover:cursor-pointer text-white rounded-md text-sm hover:bg-indigo-700 w-full sm:w-auto justify-center">افزودن</button>
            </>}
          
        </div>
      </div>
    </div>
  );
}

export default ProductItem;