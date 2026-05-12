import ProductItem from "./ProductItem";

const demoProducts = [
  { id: 1, title: 'هدفون بی‌سیم شیک', price: '۱,۴۹۰,۰۰۰ تومان', badge: 'پرفروش', discount: 20, image: 'https://via.placeholder.com/320x320?text=هدفون' },
  { id: 2, title: 'ساعت هوشمند مینیمال', price: '۲,۱۹۰,۰۰۰ تومان', badge: '', discount: 10, image: 'https://via.placeholder.com/320x320?text=ساعت' },
  { id: 3, title: 'کیف دستی چرمی', price: '۹۸۰,۰۰۰ تومان', badge: 'جدید', discount:0, image: 'https://via.placeholder.com/320x320?text=کیف' },
  { id: 4, title: 'عینک آفتابی مدرن', price: '۴۲۰,۰۰۰ تومان', badge: '', image: 'https://via.placeholder.com/320x320?text=عینک' },
  { id: 5, title: 'کفش روزمره', price: '۱,۰۹۰,۰۰۰ تومان', badge: '', image: 'https://via.placeholder.com/320x320?text=کفش' },
  { id: 6, title: 'کاپشن زمستانی', price: '۲,۵۰۰,۰۰۰ تومان', badge: 'فروش ویژه', image: 'https://via.placeholder.com/320x320?text=کاپشن' },
];

function ProductList({ products = demoProducts, label = "محصولات منتخب" }){
  return (
    <section className="py-8" dir="rtl" aria-label="لیست محصولات">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4">{label}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;