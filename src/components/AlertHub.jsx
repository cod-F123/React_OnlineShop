import { useContext, useEffect, useCallback } from "react";
import AlertContext from "../context/Alert";
import Alert from "./Alert";

function AlertHub() {
    const { message, typeAlert, setMessage } = useContext(AlertContext)

    const clear = useCallback(() => setMessage(''), [setMessage])

    useEffect(() => {
        if (!message) return
        const t = setTimeout(() => setMessage(''), 4500)
        return () => clearTimeout(t)
    }, [message, setMessage])

    return <Alert message={message} alertType={typeAlert} onClose={clear} />
}

export default AlertHub;