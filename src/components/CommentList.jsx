import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MessageSquarePlus, PenLine } from "lucide-react";
import api from "../service/api";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";
import useAlert from "../hooks/AlertHook";
import useAuth from "../hooks/AuthHook";


function CommentList({ comments, setComments, setIsLoading, productId }){
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
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-900">نظرات کاربران</h3>

            {isAuthenticated ? (
                <button
                    type="button"
                    onClick={()=>setOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    <PenLine size={15} aria-hidden="true" />
                    ثبت نظر جدید
                </button>
            ) : (
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                    <PenLine size={15} aria-hidden="true" />
                    برای ثبت نظر وارد شوید
                </Link>
            )}
        </div>

        {comments.length > 0 ? (
            <ul className="space-y-3">
                {comments.map(c => (
                    <li key={c.id}>
                        <CommentItem comment={c} />
                    </li>
                ))}
            </ul>
        ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                <MessageSquarePlus size={26} aria-hidden="true" className="mx-auto text-slate-400" />
                <p className="mt-3 text-sm font-bold text-slate-700">هنوز نظری برای این محصول ثبت نشده است.</p>
                <p className="mt-1 text-xs text-slate-500">تجربه‌ی خود را با دیگران به اشتراک بگذارید.</p>
            </div>
        )}

        <AnimatePresence>
            {open && (
                <AddComment onClose={() => setOpen(false)} onSubmit={onSubmit} />
            )}
        </AnimatePresence>
      </div>
    )
};

export default CommentList;
