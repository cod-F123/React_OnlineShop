import { LoaderCircle, Paperclip, Send, X } from "lucide-react";

export default function TicketMessageComposer({
  onSubmit,
  reply,
  setReply,
  attach,
  setAttach,
  isLoading,
}) {
  const clearAttachment = () => {
    setAttach(null);
    const input = document.getElementById("attachFile");
    if (input) input.value = null;
  };

  return (
    <form onSubmit={onSubmit} className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
      {attach && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2">
          <span className="flex min-w-0 items-center gap-2 text-[11px] font-bold text-indigo-800">
            <Paperclip size={14} aria-hidden="true" className="shrink-0" />
            <span className="truncate">{attach.name}</span>
          </span>
          <button type="button" onClick={clearAttachment} aria-label="حذف فایل پیوست" className="grid size-7 shrink-0 place-items-center rounded-lg text-indigo-600 transition hover:bg-white">
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      <label htmlFor="ticket-reply" className="sr-only">متن پیام</label>
      <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50">
        <label
          htmlFor="attachFile"
          aria-label="پیوست فایل"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl text-slate-400 transition hover:bg-white hover:text-indigo-600"
        >
          <Paperclip size={18} aria-hidden="true" />
        </label>
        <input id="attachFile" type="file" className="sr-only" onChange={(event) => setAttach(event.target.files?.[0] ?? null)} />

        <textarea
          id="ticket-reply"
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          rows={1}
          placeholder="پیام خود را بنویسید…"
          className="max-h-32 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-xs leading-6 text-slate-900 outline-none placeholder:text-slate-400"
        />

        <button
          type="submit"
          disabled={isLoading || (!reply.trim() && !attach)}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-3.5 text-xs font-black text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        >
          {isLoading ? <LoaderCircle size={15} aria-hidden="true" className="animate-spin" /> : <Send size={15} aria-hidden="true" />}
          <span className="hidden sm:inline">{isLoading ? "در حال ارسال…" : "ارسال"}</span>
        </button>
      </div>

      <p className="mt-2 px-1 text-[9px] text-slate-400">پیام شما به‌صورت محرمانه برای تیم پشتیبانی ارسال می‌شود.</p>
    </form>
  );
}
