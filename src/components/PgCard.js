function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function PgCard({ pg }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pg.image}
          alt={`${pg.name} in ${pg.locality}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
          {pg.type}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-ink">{pg.name}</h3>
          <span className="shrink-0 rounded-full bg-brand-light px-2 py-0.5 text-[11px] font-medium text-brand">
            {pg.sharing}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <PinIcon className="h-4 w-4 text-brand" />
          {pg.locality}, {pg.city}
        </p>

        <p className="mt-3 text-lg font-bold text-brand">
          {pg.price}
          <span className="text-sm font-medium text-muted"> {pg.priceSuffix}</span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
          {pg.amenities.map((a) => (
            <span
              key={a}
              className="rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-muted"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
