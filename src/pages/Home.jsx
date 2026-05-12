import HeroHeader from "../components/HeroHeader";
import ProductList from "../components/ProductList";
import SpecialProducts from "../components/SpecialProducts";

function Home(){
    return <>
        <HeroHeader />
        <ProductList />
        <SpecialProducts />

        <section dir="rtl" aria-label="دعوت به ورود و سفارش" className="mt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 p-8 text-white shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-right">
                  <h3 className="text-2xl font-extrabold">همین حالا وارد حساب خودت شو و سفارش بده</h3>
                  <p className="mt-2 text-indigo-100/90">با ورود به حساب، سابقه سفارش‌ها، تخفیف‌های اختصاصی و پرداخت سریع در دسترس شماست. تجربه‌ای شخصی‌تر و سریع‌تر از همیشه.</p>
                </div>

                <div className="flex flex-row-reverse gap-3">
                  <a href="/login" className="inline-flex items-center justify-center rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">ورود / ثبت‌نام</a>
                  <a href="#shop" className="inline-flex items-center justify-center rounded-md bg-white text-indigo-700 px-4 py-2 text-sm font-semibold">شروع سفارش</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductList label="محصولات باتخفیف بالا"/>
    </>
};

export default Home;