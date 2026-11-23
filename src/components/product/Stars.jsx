import { Star } from "lucide-react";
import { toPersianDigits } from "../../lib/phone";

export default function Stars({ value = 0, size = 16, className = "" }) {
  const rating = Math.max(0, Math.min(5, Math.round(Number(value) || 0)));

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`امتیاز ${toPersianDigits(rating)} از ۵`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          aria-hidden="true"
          className={index < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
        />
      ))}
    </span>
  );
}
