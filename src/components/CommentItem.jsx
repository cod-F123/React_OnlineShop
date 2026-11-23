import Stars from "./product/Stars";
import { formatPersianDate } from "../lib/format";

function CommentItem({ comment }){

  const fullName = comment?.user?.full_name || "کاربر مهمان";
  const initial = fullName.trim().slice(0, 1);
  const createdAt = formatPersianDate(comment?.created_at);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700" aria-hidden="true">
          {initial}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-slate-900">{fullName}</p>
            {createdAt && <span className="text-xs text-slate-500">{createdAt}</span>}
          </div>

          <Stars value={comment?.rating} size={15} className="mt-1.5" />

          <p className="mt-3 text-sm leading-7 text-slate-700">{comment?.content}</p>
        </div>
      </div>
    </article>
  )
}

export default CommentItem;
