function BedIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12V7a1 1 0 011-1h16a1 1 0 011 1v5M3 12h18M3 12v5m18-5v5M6 9h4m4 0h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function BathIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3zM7 12V6a2 2 0 012-2 2 2 0 012 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AreaIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 4h16v16H4V4zm0 6h4m8 0h4M4 14h4m8 0h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20s-7-4.35-9.33-8.4C1.1 8.9 2.3 5.5 5.6 5.5c1.9 0 3.2 1.2 4.4 2.6 1.2-1.4 2.5-2.6 4.4-2.6 3.3 0 4.5 3.4 2.93 6.1C19 15.65 12 20 12 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function PropertyCard({ property }) {
  const isRent = property.status === "FOR RENT";

  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.image}
          alt={`${property.title} in ${property.locality}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold text-white ${
              isRent ? "bg-brand" : "bg-emerald-600"
            }`}
          >
            {property.status}
          </span>
          {property.featured && (
            <span className="rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink">
              Featured
            </span>
          )}
        </div>
        <button
          aria-label="Add to shortlist"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white hover:text-brand"
        >
          <HeartIcon className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-ink">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <PinIcon className="h-4 w-4 text-brand" />
          {property.locality}, {property.city}
        </p>

        <p className="mt-3 text-lg font-bold text-brand">
          {property.price}
          {property.priceSuffix && (
            <span className="text-sm font-medium text-muted"> {property.priceSuffix}</span>
          )}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3 text-sm text-muted">
          {property.beds != null && (
            <span className="flex items-center gap-1.5">
              <BedIcon className="h-4 w-4" /> {property.beds} Beds
            </span>
          )}
          {property.baths != null && (
            <span className="flex items-center gap-1.5">
              <BathIcon className="h-4 w-4" /> {property.baths} Baths
            </span>
          )}
          {property.area && (
            <span className="flex items-center gap-1.5">
              <AreaIcon className="h-4 w-4" /> {property.area}
            </span>
          )}
          {property.facing && (
            <span className="flex items-center gap-1.5">• {property.facing}</span>
          )}
        </div>
      </div>
    </article>
  );
}
