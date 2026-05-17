import { act, createContext, useEffect, useState } from "react";


const CartContext = createContext()

export function CartContextProvider({children}){

    const [cart, setCart] = useState(()=>{
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :  [];
    });

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotalPrice();
    }, [cart])

    const [totalAmount, setTotalAmount] = useState(0);

    const updateTotalPrice = ()=>{

        let total_amount = 0;
        
        cart.map((cartItem)=>{
            total_amount += (cartItem.price * cartItem.qty);
        })

        setTotalAmount(total_amount);
    }

    const addCartItem = (proId, proTitle, price,ProImage, qty=1) => {
        setCart((prev=>[{id: proId, title:proTitle, image: ProImage, qty:qty, price:price}, ...prev]));
    };

    const deleteCartItem = (prodId)=>{
        setCart(prev=>{
            return prev.filter(item=>item.id !== prodId);
        });
    };

    const updateCartItem = (prodId, qty)=>{
        setCart(prev=>{
            return prev.map(item=>{
                if(item.id == prodId){
                    return {...item, qty:qty}
                }

                return item
            })
        })
    };

    const checkCart = (prodId) => {
        let flag = false
        return cart.filter((item)=>{
            return item.id == prodId;
        }).length > 0 ? true : false;
    };


    return <CartContext.Provider value={{cart, totalAmount, updateTotalPrice, addCartItem, deleteCartItem, updateCartItem, checkCart}}>
        {children}
    </CartContext.Provider>
};

export default CartContext;