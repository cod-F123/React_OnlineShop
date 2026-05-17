function Alert({ message, alertType = 'success', onClose }) {
    if (!message) return null

    const base = "fixed left-1/2 transform -translate-x-1/2 top-4 z-50 flex items-center gap-3 min-w-[260px] max-w-[90vw] px-4 py-2 rounded-lg shadow-lg font-semibold"
    const variants = {
        success: "bg-emerald-50 text-emerald-700",
        error: "bg-rose-50 text-rose-700",
        info: "bg-sky-50 text-sky-700",
        warning: "bg-amber-50 text-amber-800",
    }

    return (
        <div className={`${base} ${variants[alertType] || variants.success}`} role="status" aria-live="polite">
            <div className="flex-1 text-center">{message}</div>
            <button
                className="text-xl leading-none p-1 rounded hover:bg-black/5"
                onClick={onClose}
                aria-label="بستن"
            >
                ×
            </button>
        </div>
    )
}

export default Alert