import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { LifeBuoy, MessageCircleMore } from "lucide-react";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import Page404 from "./Page404";
import MessageBubble from "../components/MessageBubble";
import TicketChatHeader from "../components/ticket/TicketChatHeader";
import TicketMessageComposer from "../components/ticket/TicketMessageComposer";

function TicketSkeleton() {
  return (
    <div dir="rtl" lang="fa" className="mx-auto flex h-[min(78dvh,54rem)] min-h-[34rem] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_35px_80px_-55px_rgba(15,23,42,0.45)]" aria-busy="true">
      <div className="flex items-center gap-3 border-b border-slate-100 p-5">
        <span className="size-11 animate-pulse rounded-2xl bg-slate-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-28 animate-pulse rounded-full bg-slate-100" />
          <div className="h-4 w-52 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-5 bg-slate-50/70 p-5 sm:p-8">
        <div className="h-20 w-3/5 animate-pulse rounded-2xl bg-slate-100" />
        <div className="ms-auto h-24 w-2/3 animate-pulse rounded-2xl bg-indigo-50" />
        <div className="h-20 w-1/2 animate-pulse rounded-2xl bg-slate-100" />
      </div>
      <div className="h-20 animate-pulse border-t border-slate-100 bg-white" />
      <p className="sr-only">در حال دریافت گفت‌وگو…</p>
    </div>
  );
}

function DetailTicket() {
  const [ticket, setTicket] = useState({});
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [attach, setAttach] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const { setMessage, setTypeAlert } = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const ticket_id = params.ticket_id;

    api.get(`/tickets/api/v1/ticket/${ticket_id}/`).then((res) => {
      setTicket(res.data);
      setMessages(res.data.replies);
    }).catch((error) => {
      console.log(error);
      setTypeAlert("error");

      const status = error?.response?.status ?? error?.status;
      if (status === 404) {
        setIsNotFound(true);
      } else {
        setMessage("دریافت اطلاعات با خطا مواجه شد");
        navigate("/");
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }, [navigate, params.ticket_id, setMessage, setTypeAlert]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages?.length, reduceMotion]);

  const submit = async (e) => {
    e.preventDefault();
    if (!reply.trim() && !attach) return;

    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("ticket", ticket.id);
      form.append("content", reply);
      if (attach) form.append("attach", attach);

      const res = await api.post("/tickets/api/v1/reply-ticket/", form);

      setMessages((prev) => [...prev, res.data]);
      setTypeAlert("success");
      setMessage("پاسخ با موفقیت ارسال شد");

      setReply("");
      setAttach(null);
      const input = document.getElementById("attachFile");
      if (input) input.value = null;
    } catch (error) {
      console.log(error.response?.data || error);
      setTypeAlert("error");
      setMessage("عملیات با خطا مواجه شد");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !ticket.id) return <TicketSkeleton />;
  if (isNotFound) return <Page404 />;

  const ticketMessages = Array.isArray(messages) ? messages : [];

  return (
    <>
      <Helmet>
        <title>تیکت #{ticket.ticket_id} | پشتیبانی پرایم شاپ</title>
        <meta name="description" content={ticket.title || "گفت‌وگو با پشتیبانی پرایم شاپ"} />
      </Helmet>

      <motion.main
        dir="rtl"
        lang="fa"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-[min(78dvh,54rem)] min-h-[34rem] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_35px_80px_-55px_rgba(15,23,42,0.45)]"
      >
        <TicketChatHeader ticket={ticket} />

        <section aria-label="گفت‌وگوی تیکت" aria-live="polite" className="hide-scrollbar flex-1 overflow-y-auto bg-[#f7f8fb] px-3 py-5 sm:px-6 sm:py-7">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <span aria-hidden="true" className="h-px w-8 bg-slate-200" />
              <span>شروع گفت‌وگو</span>
              <span aria-hidden="true" className="h-px w-8 bg-slate-200" />
            </div>

            {ticket.content && (
              <MessageBubble
                m={{
                  id: `ticket-${ticket.id}`,
                  content: ticket.content,
                  created_at: ticket.created_at,
                  is_systemReply: false,
                }}
              />
            )}

            {ticketMessages.map((message, index) => (
              <MessageBubble key={message.id ?? index} m={message} />
            ))}

            {ticketMessages.length === 0 && !ticket.content && (
              <div className="py-12 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
                  <MessageCircleMore size={22} aria-hidden="true" />
                </span>
                <p className="mt-3 text-xs font-bold text-slate-600">هنوز پیامی در این گفت‌وگو ثبت نشده است.</p>
              </div>
            )}

            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        </section>

        <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-[9px] text-slate-400 sm:px-6">
          <LifeBuoy size={13} aria-hidden="true" className="text-indigo-500" />
          کارشناسان پشتیبانی پاسخ شما را در همین گفت‌وگو ارسال می‌کنند.
        </div>
        <TicketMessageComposer
          onSubmit={submit}
          reply={reply}
          setReply={setReply}
          attach={attach}
          setAttach={setAttach}
          isLoading={isLoading}
        />
      </motion.main>
    </>
  );
}

export default DetailTicket;
