import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import useAuth from "../hooks/AuthHook";
import AuthCard from "../components/auth/AuthCard";

// Match this with the code length your backend sends (the API used 6 digits before).
const OTP_LENGTH = 6;

function persianError(message){
    const error = new Error(message);
    error.userMessage = message;
    return error;
}

function isExpiredCode(error){
    const details = error?.response?.data?.details;
    const firstDetail = Array.isArray(details) ? details[0] : details;
    return String(firstDetail ?? "").toLowerCase().includes("expired");
}

function Login(){

    const {setMessage, setTypeAlert} = useAlert();
    const {setUser, setIsAuthenticated} = useAuth();

    const navigate = useNavigate();

    const handleSendOTP = async (phone) => {
        try {
            await api.post('/accounts/api/v1/send-verify-code/', {phone});
            setTypeAlert("success");
            setMessage("کد تایید به شماره شما ارسال شد");
        } catch {
            throw persianError("ارسال کد با خطا مواجه شد. دقایقی دیگر دوباره تلاش کنید.");
        }
    };

    const handleVerifyOTP = async ({phone, code}) => {
        try {
            const { data } = await api.post('/accounts/api/v1/login-otp/', {phone, otp_code: code});
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
        } catch (error) {
            throw persianError(
                isExpiredCode(error)
                    ? "کد ارسال شده منقضی شده است. کد جدید دریافت کنید."
                    : "کد ارسال شده نادرست است."
            );
        }

        try {
            const { data: profile } = await api.get("/accounts/api/v1/user/");
            const user = {phone, full_name: profile.full_name, id: profile.id, email: profile.email};
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            setIsAuthenticated(true);
        } catch {
            throw persianError("ورود انجام شد اما دریافت اطلاعات حساب ناموفق بود. دوباره وارد شوید.");
        }

        setTypeAlert("success");
        setMessage("با موفقیت وارد شدید");
    };

    return <>
    <Helmet>
        <title>ورود | Prime Shop</title>
        <meta name="description" content="وارد شوید یا ثبت نام کنید تا از امکانات سفارش و تخفیف‌های اختصاصی استفاده کنید." />
    </Helmet>
    <AuthCard
        otpLength={OTP_LENGTH}
        onSendOTP={handleSendOTP}
        onVerifyOTP={handleVerifyOTP}
        onSuccess={()=> navigate("/")}
    />
    </>
};

export default Login;
