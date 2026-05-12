import React from 'react';

function CommentItem({ comment }){
  const { author = 'کاربر ناشناس', text = '', rating = 5, date = '' } = comment || {};

  return (
    <div className="flex gap-3 items-start bg-white p-4 rounded-lg shadow-sm">
      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">{(author||'').slice(0,1)}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-900">{author}</div>
          <div className="text-xs text-slate-500">{date}</div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {Array.from({length:5}).map((_,i)=> (
            <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.999 2.619c-.784.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L1.999 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
            </svg>
          ))}
        </div>
        <p className="mt-2 text-sm text-slate-700">{text}</p>
      </div>
    </div>
  )
}

export default CommentItem;