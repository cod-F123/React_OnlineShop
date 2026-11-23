import { Outlet, useLocation } from "react-router-dom";
import AlertHub from "./AlertHub";
import LandingNav from "./landing/LandingNav";
import LandingFooter from "./landing/LandingFooter";

function AppLayout(){
    const { pathname } = useLocation();
    const isLandingPage = pathname === "/";

    return <>
        <AlertHub />
        {isLandingPage ? <Outlet /> : (<>
        <LandingNav />
            <main className="flex-col min-h-screen flex items-center" >
                <div className="container mt-5">
                        <Outlet />
                </div>
            </main>
        <LandingFooter />
        </>)}
    </>
};

export default AppLayout;
