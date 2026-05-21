import React, { useState } from "react";
import api from "../service/api";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";
import useAlert from "../hooks/AlertHook";
import useAuth from "../hooks/AuthHook";


function CommentList({ comments, setComments, setIsLoading, productId }){;
    const [open, setOpen] = useState(false);
    const {setMessage, setTypeAlert} = useAlert();
    const {isAuthenticated} = useAuth();

    const addComment = (c) => {
        const item = { id: Date.now(), ...c };
        setComments((s)=>[item, ...s]);
    }

    const onSubmit = (c)=>{

        setIsLoading(true);

        api.post('/shop/api/v1/comment/create/',{product : productId, content: c.content, rating:c.rating}).then((res)=>{
            addComment(res.data);
        
        }).catch((error)=>{
            console.log(error)
            
            setTypeAlert("error");
            setMessage("مشکلی در پردازش پیش آمد");

        }).finally(()=>{
            setIsLoading(false);
        })

        setOpen(false);
    }

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-end">
            {isAuthenticated ? <><button onClick={()=>setOpen(true)} className="px-3 py-1 cursor-pointer bg-sky-600 text-white rounded">نظر دادن</button></> : <></>}
          
        </div>

        {comments.length > 0 ? <>{comments.map(c => <CommentItem key={c.id} comment={c} />)}</> : <><div className="text-center text-gray-500">کامنتی یافت نشد</div></>}

        {open && (
          <AddComment onClose={() => setOpen(false)} onSubmit={onSubmit} />
        )}
      </div>
    )
};

export default CommentList;