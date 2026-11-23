import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "ارسال رایگان",
    description: "برای سفارش‌های بالای ۵۰۰٬۰۰۰ تومان، تحویل تا ۴۸ ساعت در سراسر کشور.",
  },
  {
    icon: ShieldCheck,
    title: "پرداخت امن",
    description: "درگاه بانکی معتبر با رمزنگاری کامل و تضمین بازگشت وجه در صورت مشکل.",
  },
  {
    icon: RotateCcw,
    title: "بازگشت آسان",
    description: "تا ۷ روز فرصت دارید بدون هیچ پرسشی کالا را مرجوع کنید.",
  },
];

export default function TrustBar() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="تضمین‌های خرید" className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="-mt-10 rounded-3xl border border-slate-900/5 bg-white/80 p-2 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:p-3">
        <ul className="grid gap-2 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.li
                key={feature.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 rounded-2xl p-5 transition hover:bg-slate-50"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-900 text-white">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{feature.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
