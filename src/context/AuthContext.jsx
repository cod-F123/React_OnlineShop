import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({children}){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({phone:"", full_name:"",id:"",email:""});

    useEffect(()=>{

        const user = localStorage.getItem("user");

        if (user){
            setUser(JSON.parse(user));
            setIsAuthenticated(true);
        }
    }, []);


    const logout = ()=>{
        setUser({phone:"", full_name:"",id:"",email:""});
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    return <>
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    </>
};

export default AuthContext;