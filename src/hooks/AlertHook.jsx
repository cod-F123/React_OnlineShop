import { useContext } from "react";
import AlertContext from "../context/Alert";


function useAlert(){
    return useContext(AlertContext);
};

export default useAlert;