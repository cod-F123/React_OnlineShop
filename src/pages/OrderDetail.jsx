import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import useAlert from "../hooks/AlertHook";
import Loading from "../components/Loading";
import OrderProductItem from "../components/OrderProductItem";
import OrderAddressItem from "../components/OrderAddressItem";
import Page404 from "./Page404";

function OrderDetail(){
    const [order, setOrder] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const {setMessage, setTypeAlert} = useAlert();

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


    useEffect(()=>{
        setIsLoading(true);

        const order_id = params.order_id;

        api.get(`/payment/api/v1/order/${order_id}/`).then((res)=>{
            setOrder(res.data);

            api.get("/accounts/api/v1/address/").then((response)=>{
                setAddresses(response.data);
                setSelectedAddress(response.data.length > 0 ? response.data[0].id : "")

            }).catch((err)=>{
                setTypeAlert("error");
                setMessage("دریافت اطلاعات با خطا مواجه شد")
            });

        }).catch((error)=>{

            setTypeAlert("error");
            const status = error?.response?.status ?? error?.status
            if (status === 404){
                setMessage("سفارش یافت نشد !")
                setIsNotFound(true);
            }else{
                setMessage("دریافت اطلاعات با خطا مواجه شد")
                navigate("/");
            }

        }).finally(()=>{

            setIsLoading(false);
        })

    },[])
    
    return <>{isLoading ? <><Loading /></> : isNotFound ? <Page404 /> : <>
    <div dir="rtl" className="p-6 max-w-5xl min-h-screen mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">سفارش شماره #{order.order_id}</h1>
        <div className="text-sm text-gray-500">{order.items.length} مورد</div>
      </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {order.items.map((it) => (
              <OrderProductItem key={it.id} item={it} />
            ))}
          </div>

          <aside className="felx flex-col h-max-content">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                        <div>جمع محصولات</div>
                        <div>{new Intl.NumberFormat("fa-IR").format(order.total_amount)} تومان</div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <div>هزینه ارسال</div>
                        <div>{new Intl.NumberFormat("fa-IR").format(order.items.length > 0 ? 50000 : 0)} تومان</div>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="flex flex-col justify-between mb-4">
                        <div className="text-gray-700 font-semibold text-right">مجموع قابل پرداخت</div>
                        <div className="text-xl font-bold text-center text-sky-600">{new Intl.NumberFormat("fa-IR").format(order.total_amount + (order.items.length > 0 ? 50000 : 0))} تومان</div>
                    </div>
                    {order.status == "Pending" ?  <>
                        {addresses.length > 0 ? <>
                            <button onClick={()=>{setTypeAlert("warning"); setMessage("در حال حاضر امکان پرداخت وجود ندارد")}} className="w-full px-4 py-3 bg-sky-600 cursor-pointer text-white rounded-lg font-semibold">پرداخت و تسویه</button>
                        </> : <>
                            <button className="w-full px-4 py-3 bg-red-600 cursor-pointer text-white rounded-lg font-semibold">برای ادامه آدرس خودرا اضافه کنید</button>
                        </>}
                    </> : <>
                        <button className="w-full px-4 py-3 bg-sky-600 cursor-pointer text-white rounded-lg font-semibold">{status}</button>
                    </>}
                
                    {/* <Link to={"/shop"} className="w-full block text-center mt-3 px-4 py-3 border-2 cursor-pointer rounded-lg text-sm">ادامه خرید</Link> */}
                </div>
            </div>
            {order.status == 'Pending' ? <>
            <div className="bg-white mt-3 p-4 rounded-lg shadow-sm">
                <div className="flex justify-center text-sm text-gray-600">
                    <div>آدرس موردنظر را انتخاب کنید</div>
                </div>

                <div className="border-t mt-2 pt-4">
                    {addresses.length > 0  ? <>
                    <ul className="space-y-3">
                        {addresses.map((a) => (
                           selectedAddress == a.id ? <OrderAddressItem key={a.id} address={a} isSelected={true}  onClickHandler={setSelectedAddress}/> : <OrderAddressItem key={a.id} address={a} onClickHandler={setSelectedAddress} />
                        ))}
                    </ul>
                    </> :<>
                    <Link to={"/dashboard/"} className="w-full flex justify-center px-4 py-3 bg-sky-600 cursor-pointer text-white rounded-lg font-semibold">
                        افزودن آدرس
                    </Link>
                    </>}
                    
                </div>

            </div>
            </> : ""
            }
          </aside>
        </div>
    </div>
    </>}
    </>
};

export default OrderDetail;