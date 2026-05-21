import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProdectDetail from "./pages/ProductDetail";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DetailTicket from "./pages/DetailTicket";

import Cart from "./pages/Cart";
import OrderDetail from "./pages/OrderDetail";
import { AlertProvider } from "./context/Alert";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { CartContextProvider } from "./context/CartContext";
import Page404 from "./pages/Page404";


function App() {

  return (
    <AlertProvider>
        <CartContextProvider>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<AppLayout />}>
                            <Route index element={<Home />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/product/:id" element={<ProdectDetail />} />

                            <Route path="/cart" element={<Cart />} />

                            <Route path="/login" element={<Login />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/dashboard/ticket/:ticket_id" element={<DetailTicket />} />

                                <Route path="/dashboard/order/:order_id" element={<OrderDetail />} />
                            </Route>
                            <Route path="*" element={<Page404 />}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </CartContextProvider>
    </AlertProvider>
  )
}

export default App
