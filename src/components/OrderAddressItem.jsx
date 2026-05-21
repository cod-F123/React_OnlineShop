
function OrderAddressItem({address, onClickHandler, isSelected=false}){
    return <>
    <li
        onClick={(e)=>{onClickHandler(address.id)}}
        className={"flex cursor-pointer hover:shadow justify-between gap-3 p-4 rounded-lg border items-center" + `${isSelected ? " bg-gray-100 border-gray-200" : " border-gray-200 bg-white"}`}
    >
        <div>
            <div className="font-medium">{address.title}</div>
            <div className="text-sm text-gray-500">{address.address}</div>
        </div>
        <div className="flex gap-1 items-center">
            <span className="text-gray-500">{address.zip_code}</span>
        </div>
    </li>
    </>
};

export default OrderAddressItem