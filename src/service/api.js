import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/AuthHook";

const BASEURL = "http://127.0.0.1:8000";

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const api = axios.create({
    baseURL : BASEURL,
    timeout : 10000,
});

// Request Interceptor: اضافه کردن Access Token به درخواست‌های خروجی
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: مدیریت خطاهای 401 و استفاده از Refresh Token
api.interceptors.response.use(
  (response) => {
    // اگر درخواست موفق بود، همون پاسخ رو برمی‌گردونیم
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // اگر خطای 401 بود و هنوز درخواست ارسال مجدد نشده باشه
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // علامت‌گذاری برای جلوگیری از لوپ بی نهایت

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          // اگر Refresh Token هم نبود، کاربر باید دوباره لاگین کنه
          // اینجا باید یه کاری کنی که کاربر ریدایرکت بشه به صفحه لاگین
          console.error('Refresh Token not found. Redirecting to login.');
          // window.location.href = '/login'; // یا از navigate هوک React Router استفاده کن

          const {setIsAuthenticated, setUser} = useAuth();

          setIsAuthenticated(false);
          setUser({phone:"", full_name:""});

          useNavigate()("/login");
          return Promise.reject(new Error('No refresh token available'));
        }

        // درخواست برای گرفتن Access Token جدید
        const tokenResponse = await axios.post(`${BASEURL}/accounts/api/v1/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = tokenResponse.data.access; // فرض می‌کنیم API این ساختار رو داره
        const newRefreshToken = tokenResponse.data.refresh // ممکنه API Refresh Token جدید هم برگردونه

        // ذخیره توکن‌های جدید
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
           localStorage.setItem('refreshToken', newRefreshToken);
        }

        // تنظیم Authorization هدر برای درخواست اصلی
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // تکرار درخواست اصلی با توکن جدید
        return api(originalRequest);

      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // اگر رفرش توکن هم با شکست مواجه شد، کاربر باید دوباره لاگین کنه
        // window.location.href = '/login';

        localStorage.removeItem("refreshToeken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        const {setIsAuthenticated, setUser} = useAuth();

        setIsAuthenticated(false);
        setUser({phone:"", full_name:""});

        useNavigate()("/login")
        return Promise.reject(refreshError);
      }
    }

    // اگر خطا 401 نبود یا خطای دیگه ای بود، همون خطا رو برمی‌گردونیم
    return Promise.reject(error);
  }
);

export default api;