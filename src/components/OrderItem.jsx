import { Link } from "react-router-dom"

function OrderItem({order}){

    let status = ""

    switch(order.status){
        
        case "Payed":
            status = "درحال پردازش";
            break;
        
        case "ُSent":
            status = "ارسال شده";
            break;
        

        default:
            status = "در انتظار پرداخت";
            break;
        
    }

    return <>
        <li
            className=""
          >
            <Link to={`/dashboard/order/${order.order_id}`} className="flex justify-between gap-3 p-4 hover:shadow duration-75 rounded-lg border border-gray-100 items-center" >
                <div>
                    <div className="font-medium">#{order.order_id}</div>
                    <div className="text-sm text-gray-500">{order.created_at}</div>
                </div>
                <div className="text-right">
                    <div className="font-medium" dir="rtl">{new Intl.NumberFormat("fa-IR").format(order.total_amount)} تومان</div>
                    <div className="text-sm text-gray-500">{status}</div>
                </div>
            </Link>
        </li>
    </>
};

export default OrderItem