
function MessageBubble({ m }) {
  const isUser = !m.is_systemReply;
  return (
    // swapped alignment: user messages now appear on the left, support on the right
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[78%] flex ${isUser ? "justify-start" : "justify-end"}`}> 
        {isUser && (
          <div className="ml-3 hidden sm:block">
            <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sm">U</div>
          </div>
        )}

        <div className={`${isUser ? "bg-sky-50 text-right" : "bg-gray-100 text-left"} p-3 rounded-lg shadow-sm`}> 
          <div className="text-sm text-gray-800 whitespace-pre-wrap">{m.content}</div>
          {m.attach && (
            <div className="mt-2">
              <a href={m.attach} download={true} pa className="text-sky-600 text-sm">📎 فایل</a>
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2">{m.created_at}</div>
        </div>
        {!isUser && (
          <div className="mr-3 hidden sm:block">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm">S</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble