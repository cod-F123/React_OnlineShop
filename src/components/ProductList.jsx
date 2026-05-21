import ProductItem from "./ProductItem";
import Loading from "./Loading";


function ProductList({ products , label = "محصولات منتخب" , isLoading}){
  return (
    <section className="py-8" dir="rtl" aria-label="لیست محصولات">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4">{label}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" dir="rtl">
            {isLoading ? <><div className="col-span-12"><Loading /></div></>:
             <>{products.length == 0 ? 
             <><div className="col-span-12">
                    <div className="flex justify-center">
                        <h3 className="text-gray-500">محصولی یافت نشد </h3>
                    </div>
                </div>
                </> :
                
                <>{products.map(p => (
                    <ProductItem key={p.id} product={p} />
                ))}</>
                
                }</>
             }
          
        </div>
      </div>
    </section>
  );
}

export default ProductList;