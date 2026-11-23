import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { toPersianDigits } from "../../lib/phone";

const easing = [0.22, 1, 0.36, 1];

export default function ProductGallery({
  images = [],
  title = "",
  index = 0,
  onSelect,
  onPrev,
  onNext,
  onTouchStart,
  onTouchEnd,
  tag,
}) {
  const reduceMotion = useReducedMotion();
  const list = images.length ? images : [{ id: "placeholder", img: "" }];
  const activeIndex = Math.min(Math.max(index, 0), list.length - 1);
  const current = list[activeIndex];
  const hasMultiple = list.length > 1;

  const handleKeyDown = (event) => {
    if (!hasMultiple) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onNext?.();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      onPrev?.();
    }
  };

  return (
    <div>
      <div
        role="group"
        aria-roledescription="گالری تصاویر"
        aria-label="تصاویر محصول"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20"
      >
        <div className="relative aspect-square">
          {current?.img ? (
            <div className="absolute inset-0 transition duration-700 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={current.id ?? activeIndex}
                  src={current.img}
                  alt={title}
                  loading="eager"
                  fetchPriority="high"
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: easing }}
                  className="absolute inset-0 size-full object-contain p-4 sm:p-10"
                />
              </AnimatePresence>
            </div>
          ) : (
            <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-300">
              <ImageOff size={56} aria-hidden="true" />
            </span>
          )}
        </div>

        {tag && (
          <span className="absolute start-4 top-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
            {tag}
          </span>
        )}

        {hasMultiple && (
          <span className="absolute end-4 top-4 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            {toPersianDigits(activeIndex + 1)} / {toPersianDigits(list.length)}
          </span>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={onPrev}
              aria-label="تصویر قبلی"
              className="absolute start-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/85 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="تصویر بعدی"
              className="absolute end-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/85 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="hide-scrollbar mt-4 -mx-1 overflow-x-auto px-1">
          <ul className="flex w-max gap-3">
            {list.map((image, position) => (
              <li key={image.id ?? position}>
                <button
                  type="button"
                  onClick={() => onSelect?.(position)}
                  aria-label={`نمایش تصویر ${toPersianDigits(position + 1)}`}
                  aria-current={position === activeIndex}
                  className={`relative size-20 overflow-hidden rounded-2xl border-2 bg-slate-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:size-24 ${
                    position === activeIndex
                      ? "border-indigo-600"
                      : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <img
                    src={image.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
