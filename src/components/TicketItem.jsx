import { Link } from "react-router-dom";

function TicketItem({ticket}){
    return <>
    <li
            className=""
          >
            <Link className="flex justify-between gap-3 p-4 hover:shadow duration-75 rounded-lg border border-gray-100 items-center" >
                <div>
                    <div className="font-medium">{ticket.id}</div>
                    <div className="text-sm text-gray-500">{ticket.date}</div>
                </div>
                <div className="text-right">
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-sm text-gray-500">{ticket.status}</div>
                    <div className="flex flex-col items-end mt-1">
                        <div className={`text-xs px-2 py-1 rounded-full ${ticket.priority === 'بالا' ? 'bg-red-100 text-red-700' : ticket.priority === 'متوسط' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {ticket.priority}
                        </div>
                    </div>
                </div>
                
            </Link>
        </li>
    </>
};

export default TicketItem;