import React, { useMemo, useState } from "react";
import MessageBubble from "../components/MessageBubble";

function DetailTicket() {
  const [messages, setMessages] = useState([
    { id: 1, from: "user", text: "سلام، وضعیت تیکت من چگونه است؟", time: "2026-05-10 12:34" },
    { id: 2, from: "support", text: "در حال بررسی هستیم — لطفاً اطلاعات بیشتری ارسال کنید.", time: "2026-05-10 13:01" },
    { id: 3, from: "user", text: "تصویر مشکل را پیوست کردم.", attach: "screenshot.png", time: "2026-05-10 13:05" },
  ]);

  const [reply, setReply] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "user", text: reply.trim(), time: new Date().toLocaleString() },
    ]);
    setReply("");
  };

  const ticketMeta = useMemo(
    () => ({
      id: "#T-2026-1007",
      subject: "مشکل در لاگین با حساب کاربری",
      status: "باز",
      priority: "متوسط",
      created: "2026-05-09 09:12",
    }),
    []
  );

  return (
    <div dir="rtl" className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-gray-500">تیکت {ticketMeta.id}</div>
          <h1 className="text-2xl font-bold">{ticketMeta.subject}</h1>
          <div className="text-sm text-gray-500 mt-1">ایجاد شده: {ticketMeta.created}</div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">{ticketMeta.status}</span>
          <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">{ticketMeta.priority}</span>
          <button className="px-3 py-1 border cursor-pointer rounded text-sm">بستن تیکت</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="text-sm text-gray-600">جزئیات تیکت</div>
        <div className="mt-2 text-gray-700">من هنگام تلاش برای ورود به حساب کاربری با خطای 401 مواجه می‌شوم. لطفاً راهنمایی کنید.</div>
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} />
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 bg-white p-4 rounded-lg shadow-sm">
        <label className="text-sm cursor-pointer text-gray-600">ارسال پاسخ</label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full mt-2 p-3 border rounded resize-y min-h-[90px]"
          placeholder="پیام خود را بنویسید..."
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label className="px-3 py-2 border rounded cursor-pointer text-sm">📎 پیوست</label>
            <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">ارسال پاسخ</button>
          </div>

          <div className="text-sm text-gray-500">پاسخ شما به تیم پشتیبانی ارسال خواهد شد.</div>
        </div>
      </form>
    </div>
  );
}

export default DetailTicket;