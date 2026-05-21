import React, { useState } from "react";

function Star({ filled, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`text-2xl ${filled ? 'text-yellow-400' : 'text-gray-200'} focus:outline-none`} aria-label="rate">
      ★
    </button>
  );
}

function AddComment({ onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const item = {
      content: text.trim(),
      rating: Number(rating),
      creaetd_at: new Date().toLocaleDateString(),
    };
    onSubmit && onSubmit(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        className="relative z-10 w-full max-w-xl bg-white rounded-xl p-6 shadow-2xl border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold">نوشتن نظر درباره محصول</h3>
            <p className="text-sm text-gray-500">لطفاً تجربه‌ی خود را با دیگران به اشتراک بگذارید.</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 cursor-pointer hover:text-gray-700 p-2 rounded-full">✕</button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex gap-3 items-center">
            {/* <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="flex-1 border border-gray-200 px-3 py-2 rounded-lg focus:ring-1 focus:ring-sky-200"
              placeholder="نام شما (اختیاری)"
              dir="rtl"
            /> */}

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">امتیاز</div>
              <div className="flex items-center">
                {[1,2,3,4,5].map((i)=> (
                  <Star key={i} filled={i<=rating} onClick={()=>setRating(i)} />
                ))}
              </div>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="w-full border border-gray-200 p-3 rounded-lg min-h-[140px] focus:ring-1 focus:ring-sky-200"
            dir="rtl"
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-gradient-to-r from-sky-500 cursor-pointer to-indigo-500 text-white rounded-lg shadow">ارسال نظر</button>
              <button type="button" onClick={onClose} className="px-4 py-2 border cursor-pointer rounded-lg">لغو</button>
            </div>

            <div className="text-sm text-gray-500">نظر شما پس از بررسی منتشر خواهد شد.</div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
