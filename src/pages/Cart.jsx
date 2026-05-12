import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "کفش اسپرت مردانه",
      desc: "سایز 42 — رنگ مشکی",
      price: 79.99,
      qty: 1,
      img: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      title: "تیشرت ساده",
      desc: "سایز M — پنبه‌ای",
      price: 19.99,
      qty: 2,
      img: "http://localhost:5176/src/assets/images/SBD-BR.jpg",
    },
  ]);

  const updateQty = (id, qty) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it)));
  };

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const shipping = items.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  return (
    <div dir="rtl" className="p-6 max-w-5xl min-h-screen mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">سبد خرید</h1>
        <div className="text-sm text-gray-500">{items.length} مورد</div>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center text-gray-600">
          <p className="text-xl mb-2">سبد خرید شما خالی است</p>
          <p className="mb-4">برای افزودن کالاها به فروشگاه بازگردید.</p>
          <a href="/shop" className="inline-block px-4 py-2 bg-sky-600 text-white rounded">بازگشت به فروشگاه</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((it) => (
              <CartItem key={it.id} item={it} updateQtyHandler={updateQty} removeItemHandler={removeItem} />
            ))}
          </div>

          <aside className="bg-white p-4 h-max-content sticky top-3.5 rounded-lg shadow-sm">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <div>جمع محصولات</div>
                <div>${subtotal.toFixed(2)}</div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <div>هزینه ارسال</div>
                <div>${shipping.toFixed(2)}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-gray-700 font-semibold">مجموع قابل پرداخت</div>
                <div className="text-xl font-bold text-sky-600">${total.toFixed(2)}</div>
              </div>

              <button className="w-full px-4 py-3 bg-sky-600 cursor-pointer text-white rounded-lg font-semibold">پرداخت و تسویه</button>
              <Link to={"/shop"} className="w-full block text-center mt-3 px-4 py-3 border-2 cursor-pointer rounded-lg text-sm">ادامه خرید</Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;