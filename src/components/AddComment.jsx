import { useState } from "react";
import { motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { toPersianDigits } from "../lib/phone";

const easing = [0.22, 1, 0.36, 1];

function AddComment({ onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const item = {
      content: text.trim(),
      rating: Number(rating),
    };
    onSubmit && onSubmit(item);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      <motion.form
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.28, ease: easing }}
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-comment-title"
        className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="add-comment-title" className="text-base font-bold text-slate-900">
              نوشتن نظر درباره محصول
            </h3>
            <p className="mt-1 text-xs text-slate-500">لطفاً تجربه‌ی خود را با دیگران به اشتراک بگذارید.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="grid size-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-slate-800">امتیاز شما</p>
          <div className="mt-1.5 flex items-center gap-1" role="group" aria-label="انتخاب امتیاز">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`امتیاز ${toPersianDigits(value)} از ۵`}
                aria-pressed={value <= rating}
                className="rounded-lg p-1 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <Star
                  size={26}
                  aria-hidden="true"
                  className={value <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="comment-text" className="sr-only">
            متن نظر
          </label>
          <textarea
            id="comment-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="نظر خود را بنویسید…"
            className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              ارسال نظر
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              لغو
            </button>
          </div>

          <p className="text-xs text-slate-500">نظر شما پس از بررسی منتشر خواهد شد.</p>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default AddComment;
