import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("done");
  };

  return (
    <section aria-labelledby="newsletter-heading" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(38rem_22rem_at_50%_-20%,rgba(99,102,241,0.55),transparent_65%),radial-gradient(28rem_18rem_at_50%_120%,rgba(56,189,248,0.35),transparent_70%)]"
          />

          <div className="relative mx-auto max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
              <Mail size={13} aria-hidden="true" />
              ۱۰٪ تخفیف اولین خرید
            </span>

            <h2 id="newsletter-heading" className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              به خبرنامه پرایم شاپ بپیوندید
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              اول از همه از محصولات جدید و تخفیف‌های ویژه باخبر شوید. یک کد تخفیف ۱۰٪ هم به عنوان خوش‌آمدگویی برایتان می‌فرستیم.
            </p>

            {status === "done" ? (
              <p className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-500/15 px-5 py-4 text-sm font-bold text-emerald-300">
                <CheckCircle2 size={18} aria-hidden="true" />
                عضویت شما ثبت شد. کد تخفیف به ایمیل‌تان ارسال می‌شود.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    ایمیل
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "newsletter-error" : undefined}
                    className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    عضویت
                    <Send size={16} aria-hidden="true" />
                  </button>
                </div>

                {status === "error" && (
                  <p id="newsletter-error" role="alert" className="mt-3 text-sm font-bold text-rose-300">
                    لطفاً یک ایمیل معتبر وارد کنید.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
