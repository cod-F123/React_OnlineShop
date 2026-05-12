import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

function AppLayout(){
    return <>

    <main className="flex-col min-h-screen flex items-center" >
        <Nav />
        <div className="container mt-5">
                <Outlet />
        </div>
        <Footer />
    </main>
    </>
};

export default AppLayout;