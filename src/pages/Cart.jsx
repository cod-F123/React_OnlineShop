import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { data, Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import useCart from "../hooks/CartHook";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";

function Cart() {

    const {cart, totalAmount, deleteCartItem, updateCartItem, clearCart} = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const {setMessage, setTypeAlert} = useAlert();

    const navigate = useNavigate();

    const shipping = cart.length > 0 ? 50000 : 0;

    const startCreateOrderButton = (e)=>{
        setIsLoading(true);

        api.post("/payment/api/v1/order/", {"items" : cart}).then((res)=>{

            clearCart();
            setTypeAlert("success");
            setMessage("سفارش شما با موفقیت انجام شد");

            navigate("/dashboard/")

        }).catch((err)=>{

            console.log(err.response.data);

            setTypeAlert("error");
            setMessage("عملیات با خطا مواجه شد");

        }).finally(()=>{

            setIsLoading(false);
        })
    };


    return (
        <div dir="rtl" className="p-6 max-w-5xl min-h-screen mx-auto">
        <Helmet>
            <title>سبد خرید | Prime Shop</title>
            <meta name="description" content="سبد خرید شما را مشاهده و سفارش خود را نهایی کنید." />
            <meta property="og:title" content="سبد خرید | Prime Shop" />
        </Helmet>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">سبد خرید</h1>
            <div className="text-sm text-gray-500">{cart.length} مورد</div>
        </div>

        {cart.length === 0 ? (
            <div className="py-20 text-center text-gray-600">
            <p className="text-xl mb-2">سبد خرید شما خالی است</p>
            <p className="mb-4">برای افزودن کالاها به فروشگاه بازگردید.</p>
            <Link to={"/shop"} className="inline-block px-4 py-2 bg-sky-600 text-white rounded">بازگشت به فروشگاه</Link>
            </div>
        ) : (
           <> 
           {isLoading ? <><Loading /></> : <>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                    {cart.map((it) => (
                    <CartItem key={it.product} item={it} updateQtyHandler={updateCartItem} removeItemHandler={deleteCartItem} />
                    ))}
                </div>

                <aside className="bg-white p-4 h-max-content sticky top-3.5 rounded-lg shadow-sm">
                    <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                        <div>جمع محصولات</div>
                        <div>{new Intl.NumberFormat("fa-IR").format(totalAmount)} تومان</div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <div>هزینه ارسال</div>
                        <div>{new Intl.NumberFormat("fa-IR").format(shipping)} تومان</div>
                    </div>
                    </div>

                    <div className="border-t pt-4">
                    <div className="flex flex-col justify-between mb-4">
                        <div className="text-gray-700 font-semibold text-right">مجموع قابل پرداخت</div>
                        <div className="text-xl font-bold text-center text-sky-600">{new Intl.NumberFormat("fa-IR").format(totalAmount + shipping)} تومان</div>
                    </div>

                    <button onClick={startCreateOrderButton} className="w-full px-4 py-3 bg-sky-600 cursor-pointer text-white rounded-lg font-semibold">پرداخت و تسویه</button>
                    <Link to={"/shop"} className="w-full block text-center mt-3 px-4 py-3 border-2 cursor-pointer rounded-lg text-sm">ادامه خرید</Link>
                    </div>
                </aside>
            </div>
           
           </>}
               
            </>
        )}
        </div>
    );
}

export default Cart;