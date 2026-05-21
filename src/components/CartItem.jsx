
function CartItem({item, updateQtyHandler, removeItemHandler}){
    return <>
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <img src={item.image} alt="product" className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
                <div className="flex justify-between items-start">
                <div>
                    <div className="font-medium">{item.title}</div>
                </div>
                <div className="text-left">
                    <div className="font-semibold">{new Intl.NumberFormat("fa-IR").format(item.price)} تومان</div>
                </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                    onClick={() => {item.quantity > 1 ? updateQtyHandler(item.product, item.quantity - 1) : ""}}
                    className="px-2 py-1 cursor-pointer rounded border hover:bg-gray-50"
                    aria-label="decrease"
                    >
                    -
                    </button>
                    <div className="w-10 text-center">{item.quantity}</div>
                    <button
                    onClick={() => { item.quantity < 10 ? updateQtyHandler(item.product, item.quantity + 1)  : ""}}
                    className="px-2 py-1 cursor-pointer rounded border hover:bg-gray-50"
                    aria-label="increase"
                    >
                    +
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => removeItemHandler(item.product)} className="text-red-500 cursor-pointer text-sm">
                    حذف
                    </button>
                    {/* <button className="text-sm text-sky-600">ذخیره برای بعد</button> */}
                </div>
                </div>
            </div>
            </div>
    </>
};

export default CartItem;