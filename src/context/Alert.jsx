import { useState, createContext } from "react";

const AlertContext = createContext()


export function AlertProvider({children}){
    const  [typeAlert, setTypeAlert] = useState("success");
    const [message, setMessage] = useState("");

    return <>
    <AlertContext.Provider   value={{typeAlert, setTypeAlert, message, setMessage}} >
        {children}
    </AlertContext.Provider>
    </>
};

export default AlertContext;
