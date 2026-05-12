import { useState } from "react";
import AddressItem from "./AddressItem";

function AddressesSection() {
    const addressesDemo = [
        { id: 1, title: "خانه", line: "تهران، خیابان مثال، پلاک 12", zip_code:"1029485769" },
    ];

    const sampleEditpleAddress = {id:"", title: "", line: "", zip_code: ""};

    const [addresses, setAddresses] = useState(addressesDemo);

    const [isAddOrChangeAddress, setIsAddOrChangeAddress] = useState(false);
    const [editbleAddress, setEditbleAddress] = useState(sampleEditpleAddress);

    function toEnglishDigits(input) {
        return input
            .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 1776)
            .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632);
    };

    function isDigitsOnly(s) {
        return /^\d+$/.test(s);
    };

    const onClickDeleteButton = (addressId) => {
        setAddresses(prev=>{
            return prev.filter((item)=> item.id !== addressId)
        })
    }

    const onClickEditButton = (address) => {
        setIsAddOrChangeAddress(~isAddOrChangeAddress);
        setEditbleAddress(prev=>(
            {
                ...address
            }
        ))
    }



    return (
        <>
            <>
                <div className={" duration-200 "+ `${isAddOrChangeAddress ? " translate-0" : " opacity-0 translate-x-full  overflow-hidden h-0 w-0"}`}>
                    <h2 className="text-lg font-semibold mb-3">{editbleAddress.id ? "ویرایش آدرس" : "آدرس جدید"}</h2>
                    <ul className="space-y-3 p-4 rounded-lg border border-gray-100">
                        <li
                                className="flex justify-between gap-3   max-sm:flex-col items-center"
                            >
                            <div className="max-sm:w-full max-sm:px-4"><label className="font-bold mr-2" htmlFor="">عنوان</label> <input type="text" placeholder="خانه" defaultValue={editbleAddress.id ? editbleAddress.title : ""} className="border h-10 w-72 px-2 max-md:w-40 max-sm:w-full border-gray-200 rounded focus:outline-gray-300" dir="rtl" name="title" /></div>
                            <div className="max-sm:w-full max-sm:px-4"><label className="font-bold mr-2"  htmlFor="">کدپستی</label> <input type="text" maxLength={10} defaultValue={editbleAddress.id ? editbleAddress.zip_code : null} className="border h-10 w-72 px-2 max-md:w-40 max-sm:w-full border-gray-200 rounded focus:outline-gray-300" name="zip_code" /></div>
                            
                        </li>
                        <li className="flex justify-between  gap-3 max-sm:flex-col items-cente ">
                            <div className="w-full max-sm:px-4">
                                    <textarea name="address" id="" placeholder="آدرس دقیق " defaultValue={editbleAddress.id ? editbleAddress.line : ""} className="border w-full px-3 py-2 min-h-28  border-gray-200 rounded focus:outline-gray-300" dir="rtl"></textarea>
                            </div>
                        </li>
                    </ul>
                    <button className="mt-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded">{editbleAddress.id ? "ویرایش" : "افزودن"}</button> <button className="mt-4 px-4 py-2 cursor-pointer bg-red-600 text-white rounded" onClick={(e)=>{setIsAddOrChangeAddress(~isAddOrChangeAddress); setEditbleAddress(sampleEditpleAddress)}}>لغو</button>
                </div>
                
            </> 
            <>
                <div className={"duration-200 " + `${~isAddOrChangeAddress ? " translate-0" : " opacity-0 -translate-x-full  overflow-hidden h-0 w-0"}`}>
                    <h2 className={"text-lg font-semibold mb-3 "}>آدرس‌ها</h2>
                    <ul className="space-y-3">
                        {addresses.map((a) => (
                        <AddressItem key={a.id} editHandler={onClickEditButton} removeHandler={onClickDeleteButton} address={a} />
                        ))}
                    </ul>
                    <button className="mt-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded" onClick={(e)=>{setIsAddOrChangeAddress(~isAddOrChangeAddress)}}>افزودن آدرس جدید</button>
                </div>
            </>
            
        </> 
    );
};

export default AddressesSection