import { useState } from "react";
import { Link } from "react-router-dom";
import { AtSign, Camera, Globe, Mail, Play, Send } from "lucide-react";
import Logo from "../../assets/images/Logo.png";

const shopLinks = [
  { label: "همه محصولات", to: "/shop" },
  { label: "بیشترین تخفیف‌ها", to: "/shop?ordering=-discount" },
  { label: "جدیدترین‌ها", to: "/shop?ordering=added_at" },
  { label: "سبد خرید", to: "/cart" },
];

const companyLinks = [
  { label: "درباره ما", to: "/about" },
  { label: "تماس با ما", to: "/contact-us" },
  { label: "حساب کاربری", to: "/dashboard" },
  { label: "ورود", to: "/login" },
];

const socials = [
  { label: "اینستاگرام", icon: Camera, href: "#" },
  { label: "شبکه‌های اجتماعی", icon: AtSign, href: "#" },
  { label: "آپارات و ویدیو", icon: Play, href: "#" },
  { label: "وب‌سایت", icon: Globe, href: "#" },
];

export default function LandingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="پرایم شاپ">
              <img src={Logo} alt="" className="size-9 rounded-xl object-cover" />
              <span className="text-base font-bold tracking-tight text-white">
                پرایم<span className="text-indigo-400"> شاپ</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7">
              فروشگاهی مدرن برای کسانی که به کیفیت، طراحی و قیمت منصفانه اهمیت می‌دهند.
            </p>

            <ul className="mt-6 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                      <Icon size={17} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-labelledby="footer-shop">
            <h2 id="footer-shop" className="text-sm font-bold text-white">
              فروشگاه
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="text-sm font-bold text-white">
              شرکت
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold text-white">در ارتباط بمانید</h2>
            <p className="mt-5 text-sm leading-7">
              محصولات جدید و پیشنهادهای ویژه را مستقیم در ایمیل خود دریافت کنید.
            </p>

            {subscribed ? (
              <p className="mt-4 text-sm font-bold text-emerald-400">عضویت شما ثبت شد. خوش آمدید!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <label htmlFor="footer-email" className="sr-only">
                  ایمیل
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5 transition focus-within:border-indigo-400/60">
                  <Mail size={16} aria-hidden="true" className="ms-2 shrink-0 text-slate-400" />
                  <input
                    id="footer-email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    aria-label="عضویت در خبرنامه"
                    className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-slate-900 transition hover:bg-slate-200"
                  >
                    <Send size={15} aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© ۱۴۰۵ پرایم شاپ. تمامی حقوق محفوظ است.</p>
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="transition hover:text-white">
                قوانین
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                حریم خصوصی
              </a>
            </li>
            <li>
              <Link to="/contact-us" className="transition hover:text-white">
                پشتیبانی
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
