
function AddressItem({address, editHandler, removeHandler}){
    return <>
        <li
                className="flex justify-between gap-3 p-4 rounded-lg border border-gray-100 items-center"
            >
                <div>
                    <div className="font-medium">{address.title}</div>
                    <div className="text-sm text-gray-500">{address.address}</div>
                </div>
                <div className="flex gap-1 items-center">
                    <button className="text-sm cursor-pointer text-sky-600 ml-2" onClick={(e)=>{editHandler(address)}}>ویرایش</button>
                    <button className="text-sm cursor-pointer text-red-500" onClick={(e)=>{removeHandler(address.id)}}>حذف</button>
                </div>
         </li>
    </>
};

export default AddressItem;