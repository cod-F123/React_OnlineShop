import { useState, useEffect } from "react";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import Loading from "./Loading";
import TicketItem from "../components/TicketItem";

function SupportSection(){

    const {setMessage, setTypeAlert} = useAlert();

    const [tickets , setTickets] = useState([]);
    const [isAddTicket, setIsAddTicket] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [newPriority, setNewPriority] = useState("Low");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        setIsLoading(true);

        api.get('/tickets/api/v1/ticket/').then((res)=>{
            setTickets(res.data);

        }).catch((error)=>{
            console.log(error)
            setTypeAlert("error");
            setMessage("دریافت اطلاعات با خطا مواجه شد");
            
        }).finally(()=>{
            setIsLoading(false);
        });

    },[])

    const submitNewTicket = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(!newTitle.trim()) return;
        if(!newBody.trim()) return;

        api.post('/tickets/api/v1/ticket/', {title: newTitle, content : newBody, priority: newPriority}).then((res)=>{
            setTickets(prev=>[res.data,...prev]);

        }).catch((error)=>{
            console.log(error.response.data)
            setTypeAlert("error");
            setMessage("عملیات با خطا مواجه شد");
            
        }).finally(()=>{
            setNewTitle("");
            setNewBody("");
            setNewPriority("متوسط");
            setIsAddTicket(false);
            setIsLoading(false);
        });
        
        
    }

    return isLoading ? <Loading /> : <>
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
                        <option value="Low">پایین</option>
                        <option value="Medium">متوسط</option>
                        <option value="High">بالا</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-between  gap-3 max-sm:flex-col items-cente ">
                <div className="w-full max-sm:px-4">
                        <textarea value={newBody} onChange={(e)=>setNewBody(e.target.value)} name="content" id="" placeholder="جزئیات تیکت"  className="border w-full px-3 py-2 min-h-28  border-gray-200 rounded focus:outline-gray-300" dir="rtl"></textarea>
                </div>
            </div>
            <div>
              <button type="button" onClick={submitNewTicket}  className="mt-4 px-4 py-2 cursor-pointer bg-sky-600 text-white rounded">ارسال</button>
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