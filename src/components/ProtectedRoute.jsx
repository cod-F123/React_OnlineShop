import { useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/AuthHook";
import useAlert from "../hooks/AlertHook";
import { useEffect } from "react";


function ProtectedRoute(){
    const {setUser, setIsAuthenticated} = useAuth();
    const {setMessage, setTypeAlert} = useAlert();
    const navigate = useNavigate()

    useEffect(()=>{
        const user = localStorage.getItem("user");

        if (user){
            setUser(JSON.parse(user));
            setIsAuthenticated(true);
        }else{
            setTypeAlert("erorr");
            setMessage("ابتدا وارد حساب کاربری خود شوید")
            navigate("/login")
        }
    },[])

    return <Outlet/>;
};

export default ProtectedRoute;
