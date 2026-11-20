import { useState,} from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import editImage from "../assets/images/Edit.png";
import useAuth from "../hooks/AuthHook";

function Login(){

    const {setMessage, setTypeAlert} = useAlert();
    const {setUser, setIsAuthenticated} = useAuth();

    const navigate = useNavigate();

    const [state, setState] = useState(()=>{
        const savedState = localStorage.getItem("loginState");
        return savedState ? savedState : 'send-phone';
    });
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");

    function isDigitsOnly(s) {
        return /^\d+$/.test(s);
    }

    function toEnglishDigits(input) {
        return input
            .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 1776)
            .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632);
    }

    const checkPhone = (phone) => {
        phone = toEnglishDigits(phone);
        if ((String(phone).startsWith("09") | String(phone).startsWith("989")) & isDigitsOnly(phone)){
            
            return true

        }else{
            return false
        }
    }

    const buttonOnclick = (e) => {
        if (state == 'send-phone'){
            if (checkPhone(phone)){

                localStorage.setItem("loginState","verify-otp");
                setState("verify-otp");


                api.post('/accounts/api/v1/send-verify-code/', {phone: phone}).then((res)=>{
                    console.log(res);
                    setTypeAlert("success")
                    setMessage("کد تایید به شماره شما ارسال شد")
                }).catch((error)=>{
                    console.log(error);
                    setTypeAlert("error");
                    setMessage("مشکلی درارسال کد بوجود آمد دقایقی دیگر تلاش کنید")
                })
            }else{
                setTypeAlert("error");
                setMessage("فرمت شماره وارد شده نادرست است")
            };

        }else{

            api.post('/accounts/api/v1/login-otp/',{"phone":phone,"otp_code":code}).then((res)=>{
                localStorage.removeItem("loginState");
                setState('send-phone');

                localStorage.setItem("accessToken", res.data.access);
                localStorage.setItem("refreshToken", res.data.refresh);

                api.get("/accounts/api/v1/user/").then((resUser)=>{

                    const user = {phone:phone, full_name:resUser.data.full_name, id:resUser.data.id, email:resUser.data.email};
                    localStorage.setItem("user", JSON.stringify(user));
                    
                    setUser(user);
                    setIsAuthenticated(true);

                }).catch((error)=>{
                    // Debugging an Error
                    console.log(error);
                    
                    setTypeAlert("error");
                    setMessage("مشکلی در دریافت اطلاعات شما پیش آمد مجدد وارد شوبد");

                })

                setTypeAlert("success");
                setMessage("با موفقیت وارد شدید");

                setCode("");
                setPhone("");

                navigate("/");

            }).catch((error)=>{
                setTypeAlert("error");

                if (error.response.data.details[0] == 'code expired'){
                    setMessage("کد ارسال شده منقضی شده")
                }else{
                    setMessage("کد ارسال شده نادرست است")
                }
            })
        }
    }

    return <>
    <Helmet>
        <title>ورود | Prime Shop</title>
        <meta name="description" content="وارد شوید یا ثبت نام کنید تا از امکانات سفارش و تخفیف‌های اختصاصی استفاده کنید." />
    </Helmet>
    <div className="min-h-screen grid grid-cols-12 px-2 place-content-center">
        <div className="col-span-4 overflow-hidden col-start-5 col-end-9 bg-gray-50  max-lg:col-span-6 max-lg:col-start-4 max-lg:col-end-10 max-md:col-span-8 max-md:col-start-3 max-md:col-end-11 max-sm:col-span-12 felx flex-col rounded-md shadow-lg p-2">
            <h1 className=" justify-start w-full inline-flex items-center gap-1">ورود <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            </h1>
            <div className={`duration-200 ${state != 'send-phone' ? 'translate-x-full w-0 h-0 overflow-hidden' : 'translate-x-0 '}`} >
                <h2 className="text-center text-2xl">شماره موبایل  خود را وارد کنید</h2>

                <div className="flex justify-center my-5">
                    <input type="text" onChange={(e)=>setPhone(e.target.value)} placeholder="09123....." name="phone" maxLength={11} className="w-60 h-12 text-lg bg-gray-100 rounded-b-none rounded-md focus:border-b-2 focus:outline-0 border-gray-700 p-1 " dir="ltr" />
                </div>

                <div className=" flex justify-center mb-5">
                    <button onClick={buttonOnclick} className="px-4 inline-flex items-center rounded-md bg-indigo-600 text-white cursor-pointer py-2 text-lg">
                        ارسال کد
                    </button>
                </div>
            </div>
            <div className={`duration-200 ${state == 'send-phone' ? '-translate-x-full w-0 h-0 overflow-hidden' : 'translate-x-0'}`} >
                <h2 className="text-center text-2xl">کد ارسال شده را وارد کنید</h2>

                <div className="flex justify-center my-5">
                    <input type="text" onChange={(e)=>setCode(e.target.value)} placeholder="123456" name="code" maxLength={6} min={6} className="w-60 h-12 text-lg bg-gray-100 rounded-b-none rounded-md focus:border-b-2 focus:outline-0 border-gray-700 p-1 " dir="ltr" />
                </div>

                <div className=" flex gap-1 justify-center mb-5">
                    <button onClick={buttonOnclick} className="px-4 inline-flex items-center rounded-md bg-green-700 text-white cursor-pointer py-2 text-lg">ورود <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    </button>
                    <button onClick={(e)=>{setState('send-phone');localStorage.setItem("loginState",'send-phone')}} className="bg-blue-400 p-1 px-3 rounded cursor-pointer">
                        <img src={editImage} className="w-4 h-4" alt="edit-phone" />
                    </button>
                </div>
            </div>
            

        </div>
    </div>
    </>
};

export default Login;
