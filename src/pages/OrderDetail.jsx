import React, { useMemo, useState } from "react";
import OrderProductItem from "../components/OrderProductItem";
import OrderAddressItem from "../components/OrderAddressItem";

function OrderDetail(){
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

    const addresses = [
        { id: 1, title: "خانه", line: "تهران، خیابان مثال، پلاک 12", zipcode: "0123456789" },
        { id: 2, title: "شرکت", line: "گرگان, خیابان شالیکوبی, عدالت 49 , پلاک 14", zipcode: "2345876565"}
    ];

    const [selectedAddress, setSelectedAddress] = useState(()=>{
        return addresses[0].id
    })

    const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
    const shipping = items.length > 0 ? 5.0 : 0;
    const total = subtotal + shipping;
    
    return <>
    <div dir="rtl" className="p-6 max-w-5xl min-h-screen mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">سفارش شماره 1000#</h1>
        <div className="text-sm text-gray-500">{items.length} مورد</div>
      </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((it) => (
              <OrderProductItem key={it.id} item={it} />
            ))}
          </div>

          <aside className="felx flex-col h-max-content">
            <div className="bg-white p-4 rounded-lg shadow-sm">
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
                    {/* <Link to={"/shop"} className="w-full block text-center mt-3 px-4 py-3 border-2 cursor-pointer rounded-lg text-sm">ادامه خرید</Link> */}
                </div>
            </div>

            <div className="bg-white mt-3 p-4 rounded-lg shadow-sm">
                <div className="flex justify-center text-sm text-gray-600">
                    <div>آدرس موردنظر را انتخاب کنید</div>
                </div>

                <div className="border-t mt-2 pt-4">
                    <ul className="space-y-3">
                        {addresses.map((a) => (
                           selectedAddress == a.id ? <OrderAddressItem key={a.id} address={a} isSelected={true}  onClickHandler={setSelectedAddress}/> : <OrderAddressItem key={a.id} address={a} onClickHandler={setSelectedAddress} />
                        ))}
                    </ul>
                </div>

            </div>
            
          </aside>
        </div>
    </div>
    </>
};

export default OrderDetail;