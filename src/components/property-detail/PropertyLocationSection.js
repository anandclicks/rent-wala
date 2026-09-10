import { getMapsUrl } from "@/lib/property-utils";

function PlaceIcon({ name }) {
  const n = name.toLowerCase();
  const cls = "h-4 w-4 text-brand-dark";
  if (n.includes("mall") || n.includes("market")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 10h16v10H4V10zM7 10V6h10v4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (n.includes("hospital") || n.includes("fortis")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (n.includes("metro")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 16v2M16 16v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function PropertyLocationSection({ property, nearbyLocations }) {
  const address = property.address || `${property.locality}, ${property.city}`;
  const mapQuery = encodeURIComponent(address);
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  const openUrl = getMapsUrl(property);

  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <h2 className="text-lg font-bold text-ink">Location</h2>
      <p className="mt-1 text-sm text-muted">{address}</p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="relative aspect-[4/3] bg-gray-100">
            <iframe
              title={`Map of ${property.title}`}
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="border-t border-line px-4 py-3">
            <a
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-dark hover:underline"
            >
              View on Google Maps →
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-ink">Nearby Places</h3>
          {nearbyLocations?.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {nearbyLocations.map((loc) => (
                <li key={loc.name} className="flex items-center justify-between gap-3 rounded-lg bg-brand-soft/40 px-3 py-2.5">
                  <span className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white">
                      <PlaceIcon name={loc.name} />
                    </span>
                    {loc.name}
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-muted">{loc.distance}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">Explore the neighbourhood on the map.</p>
          )}
        </div>
      </div>
    </section>
  );
}
