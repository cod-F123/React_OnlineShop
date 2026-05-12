import React from 'react';

function ProductItem({ product }){
  const { title, price, image, badge } = product;

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-transform transform hover:-translate-y-1" dir="rtl" aria-label={title}>
      <div className="relative">
        <img src={image || 'https://via.placeholder.com/320x320?text=محصول'} alt={title} className="w-full h-48 sm:h-56 object-contain bg-slate-50" />
        {badge && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded">{badge}</span>
        )}
        {/* discount tag */}
        {product.discount && product.discount > 0 ? (
          <div className="absolute -bottom-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-6 shadow">-{product.discount}%</div>
        ) : null}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-slate-700 font-bold">{price}</div>
          <button className="inline-flex items-center px-3 py-2 bg-indigo-600 hover:cursor-pointer text-white rounded-md text-sm hover:bg-indigo-700 w-full sm:w-auto justify-center">افزودن</button>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;