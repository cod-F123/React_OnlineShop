import { useState, useEffect } from "react";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import AddressItem from "./AddressItem";
import Loading from "./Loading";

function AddressesSection() {
    const sampleEditpleAddress = {id:"", title: "", address: "", zip_code: ""};

    const [addresses, setAddresses] = useState([]);

    const [isAddOrChangeAddress, setIsAddOrChangeAddress] = useState(false);
    const [editbleAddress, setEditbleAddress] = useState(sampleEditpleAddress);

    const [isLoading, setIsLoading] = useState(true);
    const {setMessage, setTypeAlert} = useAlert();


    useEffect(()=>{
        setIsLoading(true);

        api.get("/accounts/api/v1/address/").then((res)=>{
            setAddresses(res.data);
            setIsLoading(false);
            
        }).catch((error)=>{
            console.log(error)
            setTypeAlert("error");
            setMessage("دریافت اطلاعات با خطا مواجه شد")
            
        }).finally(()=>{
            setIsLoading(false);
        })

    }, []);

    function toEnglishDigits(input) {
        return input
            .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 1776)
            .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632);
    };

    function isDigitsOnly(s) {
        return /^\d+$/.test(s);
    };

    const onClickDeleteButton = (addressId) => {
        setIsLoading(true);

        api.delete(`/accounts/api/v1/address/${addressId}/`).then((res)=>{
            setAddresses(prev=>{
                return prev.filter((item)=> item.id !== addressId)
            });

            setTypeAlert("success");
            setMessage("آدرس با موفقیت حذف شد");

            
        }).catch((error)=>{

        setTypeAlert("error");
        setMessage("عملیات با خطا مواجه شد");

        }).finally(()=>{
        setIsLoading(false);
        setEditbleAddress(sampleEditpleAddress);
        setIsAddOrChangeAddress(false);
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

    const onChangeInput = (e)=>{
        setEditbleAddress((prev) =>({...prev,[e.target.name] : e.target.value}));
    }

    const checkAddress = (address)=>{
        if(!isDigitsOnly(toEnglishDigits(address.zip_code)) | address.zip_code.length < 10){
            setTypeAlert("error");
            setMessage("فرمت کدپستی نا معتبر است");
            return false;
        };

        if(!address.title){
            setTypeAlert("error");
            setMessage("فیلد عنوان الزامی است");
            return false;
        };

        if(!address.address){
            setTypeAlert("error");
            setMessage('فیلد آدرس الزامی است');
            return false;
        };

        return true;
    }

    const onSubmitCreateButton = ()=>{

        setIsLoading(true);

        if(checkAddress(editbleAddress)){
          api.post("/accounts/api/v1/address/", editbleAddress).then((res)=>{

            setAddresses(prev=>([...prev,res.data]));

            setTypeAlert('success');
            setMessage("آدرس جدید اضافه شد")

          }).catch((error)=>{

            setTypeAlert("error");
            setMessage("عملیات با خطا مواجه شد")

          }).finally(()=>{
            setIsLoading(false);
            setEditbleAddress(sampleEditpleAddress);
            setIsAddOrChangeAddress(false);
          })
        }
        return
    };

    const onSubmitEditButton = ()=>{
        setIsLoading(true);

        if (checkAddress(editbleAddress)){
            api.put(`/accounts/api/v1/address/${editbleAddress.id}/`,editbleAddress).then((res)=>{
                
                setAddresses((prev)=>{
                    return prev.map((address)=>{
                        if (address.id === editbleAddress.id){
                            return editbleAddress
                        }
                        return address
                    })
                })

                setTypeAlert("success");
                setMessage("آدرس با موفقیت ویرایش یافت")

            }).catch((error)=>{

            setTypeAlert("error");
            setMessage("عملیات با خطا مواجه شد")

          }).finally(()=>{
            setIsLoading(false);
            setEditbleAddress(sampleEditpleAddress);
            setIsAddOrChangeAddress(false);
          })
        }
    }



    return (
        <>{isLoading ? <><Loading /></> :<>
            <>
                <div className={" duration-200 "+ `${isAddOrChangeAddress ? " translate-0" : " opacity-0 translate-x-full  overflow-hidden h-0 w-0"}`}>
                    <h2 className="text-lg font-semibold mb-3">{editbleAddress.id ? "ویرایش آدرس" : "آدرس جدید"}</h2>
                    <ul className="space-y-3 p-4 rounded-lg border border-gray-100">
                        <li
                                className="flex justify-between gap-3   max-sm:flex-col items-center"
                            >
                            <div className="max-sm:w-full max-sm:px-4"><label className="font-bold mr-2" htmlFor="">عنوان</label> <input type="text" onChange={onChangeInput} placeholder="خانه" defaultValue={editbleAddress.title } className="border h-10 w-72 px-2 max-md:w-40 max-sm:w-full border-gray-200 rounded focus:outline-gray-300" dir="rtl" name="title" /></div>
                            <div className="max-sm:w-full max-sm:px-4"><label className="font-bold mr-2"  htmlFor="">کدپستی</label> <input type="text" onChange={onChangeInput} maxLength={10} defaultValue={editbleAddress.zip_code} className="border h-10 w-72 px-2 max-md:w-40 max-sm:w-full border-gray-200 rounded focus:outline-gray-300" name="zip_code" /></div>
                            
                        </li>
                        <li className="flex justify-between  gap-3 max-sm:flex-col items-cente ">
                            <div className="w-full max-sm:px-4">
                                    <textarea name="address" id="" onChange={onChangeInput} placeholder="آدرس دقیق " defaultValue={editbleAddress.address} className="border w-full px-3 py-2 min-h-28  border-gray-200 rounded focus:outline-gray-300" dir="rtl"></textarea>
                            </div>
                        </li>
                    </ul>
                    <button onClick={editbleAddress.id ? onSubmitEditButton : onSubmitCreateButton } className="mt-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded">{editbleAddress.id ? "ویرایش" : "افزودن"}</button> <button className="mt-4 px-4 py-2 cursor-pointer bg-red-600 text-white rounded" onClick={(e)=>{setIsAddOrChangeAddress(~isAddOrChangeAddress); setEditbleAddress(sampleEditpleAddress)}}>لغو</button>
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
                    <button className="mt-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded" onClick={(e)=>{setIsAddOrChangeAddress(~isAddOrChangeAddress); setEditbleAddress(sampleEditpleAddress)}}>افزودن آدرس جدید</button>
                </div>
            </>
            </>}
            
        </> 
    );
};

export default AddressesSection