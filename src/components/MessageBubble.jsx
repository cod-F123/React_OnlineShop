import { motion, useReducedMotion } from "framer-motion";
import { LifeBuoy, Paperclip, UserRound } from "lucide-react";

function formatMessageTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function isSystemMessage(message) {
  return Boolean(message?.is_system || message?.is_system_message || message?.type === "system");
}

function MessageBubble({ m }) {
  const reduceMotion = useReducedMotion();
  const isSystem = isSystemMessage(m);
  const isUser = !m.is_systemReply;
  const timestamp = formatMessageTime(m.created_at);

  if (isSystem) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="flex justify-center px-3 py-1"
      >
        <div className="max-w-[90%] rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-center shadow-sm">
          <p className="text-[11px] leading-5 text-slate-600">{m.content}</p>
          {timestamp && <time className="mt-0.5 block text-[9px] text-slate-400">{timestamp}</time>}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12, x: isUser ? 8 : -8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${isUser ? "justify-start" : "justify-end"}`}
    >
      {isUser && (
        <span aria-hidden="true" className="mb-5 hidden size-8 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-700 sm:grid">
          <UserRound size={15} />
        </span>
      )}

      <div className={`flex max-w-[88%] flex-col sm:max-w-[76%] ${isUser ? "items-start" : "items-end"}`}>
        <p className={`mb-1.5 px-1 text-[10px] font-bold ${isUser ? "text-indigo-700" : "text-slate-500"}`}>
          {isUser ? "شما" : "پشتیبانی پرایم شاپ"}
        </p>
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "rounded-es-md bg-indigo-600 text-white shadow-indigo-900/10"
            : "rounded-ee-md border border-slate-200 bg-white text-slate-800"
        }`}>
          <p className="whitespace-pre-wrap break-words text-xs leading-7">{m.content}</p>
          {m.attach && (
            <a
              href={m.attach}
              download
              target="_blank"
              rel="noreferrer"
              className={`mt-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-bold transition ${
                isUser ? "bg-white/15 text-white hover:bg-white/25" : "bg-slate-100 text-indigo-700 hover:bg-indigo-50"
              }`}
            >
              <Paperclip size={13} aria-hidden="true" />
              مشاهده فایل پیوست
            </a>
          )}
        </div>
        {timestamp && (
          <time className="mt-1.5 px-1 text-[9px] text-slate-400" dateTime={m.created_at}>
            {timestamp}
          </time>
        )}
      </div>

      {!isUser && (
        <span aria-hidden="true" className="mb-5 hidden size-8 shrink-0 place-items-center rounded-xl bg-slate-200 text-slate-600 sm:grid">
          <LifeBuoy size={15} />
        </span>
      )}
    </motion.div>
  );
}

export default MessageBubble;
