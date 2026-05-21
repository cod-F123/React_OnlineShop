import { BASEURL } from "../service/api";

function OrderProductItem({item}){
    return <>
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <img src={BASEURL+item.product.image} alt="product" className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                <div>
                    <div className="font-medium">{item.product.title}</div>
                    {/* <div className="text-sm text-gray-500">{item.desc}</div> */}
                </div>
                <div className="text-left">
                    <div className="font-semibold">{new Intl.NumberFormat("fa-IR").format(item.product.is_offed ? item.product.offed_price : item.product.price)} تومان</div>
                </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className=" inline-flex text-center">تعداد :  {item.quantity}</div>
                </div>

                <div className="flex items-center gap-3">
                   <div className="font-semibold">{new Intl.NumberFormat("fa-IR").format(item.amount)} تومان</div>
                    {/* <button className="text-sm text-sky-600">ذخیره برای بعد</button> */}
                </div>
                </div>
            </div>
        </div>
    </>
};

export default OrderProductItem;