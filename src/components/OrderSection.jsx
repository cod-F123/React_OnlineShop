import { useState, useEffect } from "react";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import OrderItem from "./OrderItem";
import Loading from "./Loading";

function OrdersSection() {
    
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {setMessage, setTypeAlert} = useAlert();

    useEffect(()=>{
        setIsLoading(true);
        api.get("/payment/api/v1/order/").then((res)=>{
            setOrders(res.data);

        }).catch((error)=>{

            console.log(error.res.data);
            setTypeAlert("error");
            setMessage("دریافت اطلاعات با خطا مواجه شد");
            
        }).finally(()=>{

            setIsLoading(false);
        })
    }, [])

    return (
        <>{
            isLoading ? <><Loading /> </> : 
            <>
            <div>
                <h2 className="text-lg font-semibold mb-3">سفارش‌های من</h2>
                <ul className="space-y-3">
                    {orders.map((o) => (
                    <OrderItem key={o.order_id} order={o} />
                    ))}
                </ul>
                {orders.length === 0 && <p className="text-gray-600 mt-3">شما هنوز سفارشی ثبت نکرده‌اید.</p>}
            </div>
            </>
        }
        </>
    );
};

export default OrdersSection;