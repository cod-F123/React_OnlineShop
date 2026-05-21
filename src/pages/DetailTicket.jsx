import React, { useMemo, useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import Loading from "../components/Loading";
import Page404 from "./Page404";
import MessageBubble from "../components/MessageBubble";

function DetailTicket() {
    const [ticket, setTicket] = useState({});
    const [messages, setMessages] = useState([]);

    const [reply, setReply] = useState("");
    const [attach, setAttach] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    const {setMessage, setTypeAlert} = useAlert();
    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        setIsLoading(true);

        const ticket_id = params.ticket_id;

        api.get(`/tickets/api/v1/ticket/${ticket_id}/`).then((res)=>{
            setTicket(res.data);
            setMessages(res.data.replies);
            
        }).catch((error)=>{
                console.log(error);

                setTypeAlert("error");

                const status = error?.response?.status ?? error?.status
                if (status === 404){
                    // show 404 page inside this route
                    setIsNotFound(true);
                }else{
                    setMessage("دریافت اطلاعات با خطا مواجه شد")
                    navigate("/");
                }
                
            }).finally(()=>{
                setIsLoading(false);
            })

    },[])

    const submit = async (e) => {
        e.preventDefault();
        if (!reply.trim() && !attach) return;

        setIsLoading(true);
        try {
            const form = new FormData();
            form.append('ticket', ticket.id);
            form.append('content', reply);
            if (attach) form.append('attach', attach);

            // don't manually set Content-Type; axios will add the correct boundary
            const res = await api.post('/tickets/api/v1/reply-ticket/', form);

            // prepend new reply returned by backend to messages
            setMessages((prev) => [...prev,res.data]);
            setTypeAlert('success');
            setMessage('پاسخ با موفقیت ارسال شد');

            // reset form
            setReply('');
            setAttach(null);
            const el = document.getElementById('attachFile');
            if (el) el.value = null;

        } catch (error) {
            console.log(error.response?.data || error);
            setTypeAlert('error');
            setMessage('عملیات با خطا مواجهه شد');
        } finally {
            setIsLoading(false);
        }
    };



    return isLoading ? <Loading /> : isNotFound ? <Page404 /> :  <>
        <div dir="rtl" className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <div>
            <div className="text-sm text-gray-500">تیکت {ticket.ticket_id}#</div>
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
            <div className="text-sm text-gray-500 mt-1">ایجاد شده: {ticket.created_at}</div>
            </div>

            <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">{ticket.status == "Open" ? "باز" : "بسته"}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' : ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{ticket.priority == "High" ? "بالا" : ticket.priority == "Medium" ? "متوسط" : ticket.priority == "Low" ? "پایین" : ""}</span>
            {/* <button className="px-3 py-1 border cursor-pointer rounded text-sm">بستن تیکت</button> */}
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="text-sm text-gray-600">جزئیات تیکت</div>
            <div className="mt-2 text-gray-700">{ticket.content}</div>
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
                <label htmlFor="attachFile" className="px-3 py-2 border rounded cursor-pointer text-sm flex items-center gap-2">📎 پیوست
                    {attach ? <span className="text-sm text-slate-600">{attach.name}</span> : null}
                </label>
                <input id="attachFile" type="file" className="hidden" onChange={(e)=>{ setAttach(e.target.files?.[0] ?? null) }} />
                {attach ? <button type="button" onClick={()=>{ setAttach(null); const el=document.getElementById('attachFile'); if(el) el.value=null }} className="text-sm cursor-pointer text-rose-600">حذف</button> : null}
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">ارسال پاسخ</button>
            </div>

            <div className="text-sm text-gray-500">پاسخ شما به تیم پشتیبانی ارسال خواهد شد.</div>
            </div>
        </form>
        </div>
    </>;
}

export default DetailTicket;