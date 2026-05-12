import { Link } from "react-router-dom"

function OrderItem({order}){
    return <>
        <li
            className=""
          >
            <Link className="flex justify-between gap-3 p-4 hover:shadow duration-75 rounded-lg border border-gray-100 items-center" >
                <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                </div>
                <div className="text-right">
                    <div className="font-medium">{order.total}</div>
                    <div className="text-sm text-gray-500">{order.status}</div>
                </div>
            </Link>
        </li>
    </>
};

export default OrderItem