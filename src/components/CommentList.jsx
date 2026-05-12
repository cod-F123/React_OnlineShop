import React, { useState } from "react";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";

const demoComments = [
  { id:1, author: 'مهدی', text: 'کیفیت عالی و ارسال سریع.', rating: 5, date: '۱۴۰۲/۱۲/۰۵' },
  { id:2, author: 'سارا', text: 'خیلی راضی‌ام، ظاهر شیک ولی بسته‌بندی بهتر می‌تونست باشه.', rating: 4, date: '۱۴۰۲/۱۱/۲۳' }
]

function CommentList({ comments: initialComments = demoComments }){
    const [comments, setComments] = useState(initialComments);
    const [open, setOpen] = useState(false);

    const addComment = (c) => {
        const item = { id: Date.now(), ...c };
        setComments((s)=>[item, ...s]);
    }

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-end">
          <button onClick={()=>setOpen(true)} className="px-3 py-1 bg-sky-600 text-white rounded">نظر دادن</button>
        </div>

        {comments.map(c => <CommentItem key={c.id} comment={c} />)}

        {open && (
          <AddComment onClose={() => setOpen(false)} onSubmit={(c)=>{ addComment(c); setOpen(false); }} />
        )}
      </div>
    )
};

export default CommentList;