import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

function Page404(){
    return (
        <div>
        <Helmet><title>صفحه یافت نشد | 404</title></Helmet>
        <div className="min-h-[90vh] flex items-center justify-center px-4">
            <div className="max-w-2xl text-center">
                <div className="text-9xl font-extrabold text-rose-500">404</div>
                <h1 className="mt-4 text-2xl font-semibold text-slate-800">صفحه مورد نظر پیدا نشد</h1>
                <p className="mt-2 text-slate-600">ممکن است آدرس را اشتباه وارد کرده‌اید یا صفحه حذف شده است.</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                    <Link to="/" className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-700">
                        بازگشت به صفحه اصلی
                    </Link>
                    <Link to="/shop" className="inline-block border border-slate-200 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-50">
                        مشاهده فروشگاه
                    </Link>
                </div>
            </div>
        </div>
        </div>
    )
};

export default Page404;