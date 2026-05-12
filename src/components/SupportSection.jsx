import { useState } from "react";
import TicketItem from "./TicketItem";

function SupportSection(){

    const ticketsDemo = [
        { id: "#1001", date: "2026-04-30", title : "پیگیری مرجوعی", status: "در انتظار برسی", priority: "متوسط" },
        { id: "#1000", date: "2026-03-20", title : "لغو سفارش", status: "درحال برسی", priority: "پایین" }
    ]

    const [tickets , setTickets] = useState(ticketsDemo)
    const [isAddTicket, setIsAddTicket] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [newPriority, setNewPriority] = useState("متوسط");

    const submitNewTicket = (e) => {
        e.preventDefault();
        if(!newTitle.trim()) return;
        const newTicket = {
            id: `#${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            title: newTitle.trim(),
            status: "در انتظار برسی",
            priority: newPriority
        }
        setTickets((t)=>[newTicket, ...t]);
        // reset form and switch back to list
        setNewTitle("");
        setNewBody("");
        setNewPriority("متوسط");
        setIsAddTicket(false);
    }

    return <>
    <div  className={" duration-200 "+ `${isAddTicket ? " translate-0" : " opacity-0 translate-x-full  overflow-hidden h-0 w-0"}`}>
        <h2 className="text-lg font-semibold mb-3">تیکت جدید</h2>
        <form onSubmit={submitNewTicket} className="space-y-3 p-4 rounded-lg border border-gray-100">
            <div className="flex justify-between gap-3 max-sm:flex-col items-center">
                <div className="max-sm:w-full max-sm:px-4">
                    <label className="font-bold mr-2" htmlFor="title">عنوان</label>
                    <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} id="title" type="text" placeholder="پیگیری سفارش" className="border h-10 w-72 px-2 max-md:w-40 max-sm:w-full border-gray-200 rounded focus:outline-gray-300" dir="rtl" name="title" />
                </div>

                <div className="max-sm:w-full max-sm:px-4">
                    <label className="font-bold mr-2" htmlFor="priority">اولویت</label>
                    <select id="priority" value={newPriority} onChange={(e)=>setNewPriority(e.target.value)} className="border h-10 w-44 px-2 max-sm:w-full border-gray-200 rounded" dir="rtl">
                        <option value="پایین">پایین</option>
                        <option value="متوسط">متوسط</option>
                        <option value="بالا">بالا</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-between  gap-3 max-sm:flex-col items-cente ">
                <div className="w-full max-sm:px-4">
                        <textarea value={newBody} onChange={(e)=>setNewBody(e.target.value)} name="address" id="" placeholder="جزئیات تیکت"  className="border w-full px-3 py-2 min-h-28  border-gray-200 rounded focus:outline-gray-300" dir="rtl"></textarea>
                </div>
            </div>
            <div>
              <button type="submit" className="mt-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded">ارسال</button>
              <button type="button" className="mt-4 px-4 py-2 cursor-pointer bg-red-600 text-white rounded ml-2" onClick={(e)=>{setIsAddTicket(~isAddTicket)}}>لغو</button>
            </div>
        </form>
    </div>
    <div className={"duration-200 " + `${~isAddTicket ? " translate-0" : " opacity-0 -translate-x-full  overflow-hidden h-0 w-0"}`}>
      <h2 className="text-lg font-semibold mb-3">پشتیبانی</h2>
      <ul className="space-y-3">
        {tickets.map(t=>{
            return <TicketItem key={t.id} ticket={t} />
        })}
      </ul>
      <button onClick={(e)=>{setIsAddTicket(~isAddTicket)}} className="mt-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded">تیکت جدید</button>
    </div>
    </>
};
export default SupportSection;