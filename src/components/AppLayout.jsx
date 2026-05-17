import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import AlertHub from "./AlertHub";


function AppLayout(){

    return <>

    <main className="flex-col min-h-screen flex items-center" >
        <AlertHub />
        <Nav />
        <div className="container mt-5">
                <Outlet />
        </div>
        <Footer />
    </main>
    </>
};

export default AppLayout;