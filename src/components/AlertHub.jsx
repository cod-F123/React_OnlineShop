import { useContext, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
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

    return (
        <AnimatePresence mode="wait">
            {message ? (
                <Alert
                    key={`${typeAlert}-${message}`}
                    message={message}
                    alertType={typeAlert}
                    onClose={clear}
                />
            ) : null}
        </AnimatePresence>
    )
}

export default AlertHub;
