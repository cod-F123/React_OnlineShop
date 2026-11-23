export default function SpecificationsList({ specifications = [] }) {
  if (!specifications.length) {
    return (
      <p className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
        مشخصات فنی برای این محصول ثبت نشده است.
      </p>
    );
  }

  return (
    <dl className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      {specifications.map((specification, index) => (
        <div
          key={specification.id ?? `${specification.key}-${index}`}
          className={`grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-6 ${
            index % 2 ? "bg-slate-50/70" : "bg-white"
          }`}
        >
          <dt className="text-sm font-bold text-slate-900">{specification.key}</dt>
          <dd className="text-sm leading-7 text-slate-600">{specification.value}</dd>
        </div>
      ))}
    </dl>
  );
}
