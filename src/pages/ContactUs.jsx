import React, { useState } from "react";
import api, { BASEURL } from "../service/api";

function ContactUs(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = "نام شما لازم است";
        if (!email.trim()) e.email = "ایمیل لازم است";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "ایمیل معتبر نیست";
        if (!message.trim()) e.message = "پیام نمی‌تواند خالی باشد";
        return e;
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setSuccess("");
        setErrorMsg("");
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length) return;

        setLoading(true);
        const payload = { name, email, subject, message };

        try {
            await api.post('/contact/', payload);
            setSuccess('پیام شما با موفقیت ثبت شد. متشکریم!');
            setName(''); setEmail(''); setSubject(''); setMessage('');
        } catch (err) {
            
            setErrorMsg('ارسال پیام با خطا مواجه شد. لطفا بعدا دوباره تلاش کنید');

        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="max-w-6xl mx-auto py-12 px-6 text-gray-800">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-r-4 border-blue-600 pr-4 inline-block">تماس با ما</h1>
                <p className="text-lg text-gray-600">مشتاق شنیدن صدای شما هستیم! از طریق فرم زیر یا راه‌های ارتباطی می‌توانید با ما در تماس باشید.</p>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 p-6 bg-gradient-to-b from-blue-50 to-white">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">راه‌های ارتباطی</h2>
                        <p className="text-gray-600 mb-6">آدرس، شماره تماس و ایمیل ما را اینجا ببینید. در ساعات کاری معمولاً ظرف چند ساعت پاسخ می‌دهیم.</p>

                        <div className="space-y-4 text-gray-700">
                            <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <div className="text-sm font-medium">ایمیل</div>
                                    <div className="text-sm text-gray-600">support@p-shop.ir</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l2 5 4 2 4-2 2-5h2" />
                                </svg>
                                <div>
                                    <div className="text-sm font-medium">تلفن</div>
                                    <div className="text-sm text-gray-600">+98 21 1234 5678</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                </svg>
                                <div>
                                    <div className="text-sm font-medium">آدرس</div>
                                    <div className="text-sm text-gray-600">تهران، خیابان مثال، پلاک ۱۲۳</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3 p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">نام</label>
                                    <input dir="rtl" value={name} onChange={e=>setName(e.target.value)} className={`mt-1 block text-right w-full rounded-md h-10 px-2 border-gray-200 border outline-0 focus:border-blue-500 focus:ring-blue-500 ${errors.name ? 'border-red-400' : ''}`} aria-invalid={errors.name ? 'true' : 'false'} />
                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                                    <input value={email} onChange={e=>setEmail(e.target.value)} className={`mt-1 block w-full rounded-md h-10 px-2 border-gray-200 border outline-0 focus:border-blue-500 focus:ring-blue-500 ${errors.email ? 'border-red-400' : ''}`} aria-invalid={errors.email ? 'true' : 'false'} />
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">موضوع (اختیاری)</label>
                                <input value={subject} onChange={e=>setSubject(e.target.value)} className="mt-1 block w-full rounded-md h-10 px-2 border-gray-200 border outline-0 focus:border-blue-500 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">پیام</label>
                                <textarea value={message} onChange={e=>setMessage(e.target.value)} rows="5" className={`mt-1 block w-full rounded-md px-2 border-gray-200 border outline-0 focus:border-blue-500 focus:ring-blue-500 ${errors.message ? 'border-red-400' : ''}`} aria-invalid={errors.message ? 'true' : 'false'} />
                                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                            </div>

                            <div className="flex items-center gap-3">
                                <button type="submit" className="inline-flex cursor-pointer items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none" disabled={loading}>
                                    {loading ? 'در حال ارسال...' : 'ارسال پیام'}
                                </button>
                                {success && <p className="text-sm text-green-600">{success}</p>}
                                {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ContactUs;