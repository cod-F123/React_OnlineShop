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
            total_amount += (cartItem.price * cartItem.quantity);
        })

        setTotalAmount(total_amount);
    }

    const addCartItem = (proId, proTitle, price,ProImage, qty=1) => {
        setCart((prev=>[{product: proId, title:proTitle, image: ProImage, quantity:qty, price:price}, ...prev]));
    };

    const deleteCartItem = (prodId)=>{
        setCart(prev=>{
            return prev.filter(item=>item.product !== prodId);
        });
    };

    const updateCartItem = (prodId, qty)=>{
        setCart(prev=>{
            return prev.map(item=>{
                if(item.product == prodId){
                    return {...item, quantity:qty}
                }

                return item
            })
        })
    };

    const checkCart = (prodId) => {
        let flag = false
        return cart.filter((item)=>{
            return item.product == prodId;
        }).length > 0 ? true : false;
    };

    const clearCart = ()=>{
        setCart([]);
    }


    return <CartContext.Provider value={{cart, totalAmount, updateTotalPrice, addCartItem, deleteCartItem, updateCartItem, checkCart, clearCart}}>
        {children}
    </CartContext.Provider>
};

export default CartContext;