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


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/detail" element={<ProdectDetail />} />

                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/ticket/detail" element={<DetailTicket />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="order/detail" element={<OrderDetail />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
