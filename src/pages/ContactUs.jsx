import { useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../service/api";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "نام و نام خانوادگی را وارد کنید";
    if (!email.trim()) nextErrors.email = "ایمیل را وارد کنید";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) nextErrors.email = "ایمیل معتبر نیست";
    if (!message.trim()) nextErrors.message = "متن پیام را وارد کنید";
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");
    setErrorMsg("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    const payload = { name, email, subject, message };

    try {
      await api.post("/contact/", payload);
      setSuccess("پیام شما با موفقیت ثبت شد. متشکریم!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setErrorMsg("ارسال پیام با خطا مواجه شد. لطفاً بعداً دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    const setters = {
      name: setName,
      email: setEmail,
      subject: setSubject,
      message: setMessage,
    };
    setters[field]?.(value);
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccess("");
    setErrorMsg("");
  };

  return (
    <>
      <Helmet>
        <title>تماس با ما | پرایم شاپ</title>
        <meta
          name="description"
          content="با تیم پرایم شاپ در تماس باشید. پرسش‌های خود را از طریق فرم تماس، ایمیل یا تلفن با ما در میان بگذارید؛ پاسخ‌گویی در کمتر از یک روز کاری."
        />
        <meta property="og:title" content="تماس با ما | پرایم شاپ" />
        <meta
          property="og:description"
          content="پرسشی درباره سفارش، محصول یا همکاری دارید؟ تیم پشتیبانی پرایم شاپ آماده پاسخ‌گویی است."
        />
        <link rel="canonical" href="/contact-us" />
      </Helmet>

      <div dir="rtl" lang="fa" className="min-h-screen w-full bg-white pb-16">
        <ContactHero />

        <section
          aria-label="اطلاعات تماس و فرم ارسال پیام"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20"
        >
          <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div className="order-2 lg:order-1">
              <ContactInfo />
            </div>

            <div className="order-1 lg:order-2">
              <ContactForm
                values={{ name, email, subject, message }}
                errors={errors}
                loading={loading}
                success={success}
                errorMsg={errorMsg}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ContactUs;
