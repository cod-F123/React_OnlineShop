import { useState } from "react";
import api from "../service/api";
import useAuth from "../hooks/AuthHook";
import useAlert from "../hooks/AlertHook";
import Loading from "./Loading";

function ProfileSection() {
    // placeholder form (non-functional) for user info

    const {user, setUser} = useAuth();
    const {setMessage, setTypeAlert} = useAlert();

    
    const [name, setName] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitButton = ()=>{
        setIsLoading(true);
        api.put("/accounts/api/v1/user/", {full_name:name, email:email}).then((res)=>{

            setUser(prev=>{
                localStorage.setItem("user", JSON.stringify({...prev,email:res.data.email, full_name:res.data.full_name}));
                return {...prev,email:res.data.email, full_name:res.data.full_name}
            });

            setTypeAlert("success");
            setMessage("اطلاعات شما با موفقیت ویرایش شد");

        }).catch((error)=>{

            setTypeAlert("error");
            console.log(error.response.data);
            setMessage("عملیات به خطا مواجه شد");

        }).finally(()=>{
            setIsLoading(false);
        })
    }
        
    return (
        <>{isLoading ? <>
        <div><Loading /></div>
        </> : <>
        <div>
            <h2 className="text-lg font-semibold mb-3">اطلاعات من</h2>
            <div className="flex flex-col gap-3 max-w-md">
                <label className="flex flex-col text-sm">
                نام:
                <input onChange={(e)=>setName(e.target.value)} className="mt-2 p-2 border-gray-300 focus:outline-gray-400  border rounded" placeholder="نام و نام خانوادگی" type="text" dir="rtl" defaultValue={name} />
                </label>
                <label className="flex flex-col text-sm">
                ایمیل:
                <input onChange={(e)=>setEmail(e.target.value)} className="mt-2 p-2 border-gray-300 focus:outline-gray-400 border rounded" placeholder="userExample@Example.com" type="email" defaultValue={email} />
                </label>
                <div className="flex gap-3">
                <button onClick={onSubmitButton} className="mt-2 cursor-pointer px-3 py-2 bg-sky-600 text-white rounded">بروزرسانی اطلاعات</button>
                {/* <button className="mt-2 w-36 px-3 py-2 border rounded">تغییر رمز عبور</button> */}
                </div>
            </div>
        </div>
        </>}
        </>
    );
};

export default ProfileSection;