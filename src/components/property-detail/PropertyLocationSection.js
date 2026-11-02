import { ExternalLink, Hospital, MapPin, ShoppingBag, TrainFront } from "lucide-react";
import { getMapsUrl } from "@/lib/property-utils";

function PlaceIcon({ name }) {
  const n = name.toLowerCase();
  const cls = "h-4 w-4 text-brand";
  if (n.includes("mall") || n.includes("market")) return <ShoppingBag className={cls} />;
  if (n.includes("hospital") || n.includes("fortis")) return <Hospital className={cls} />;
  if (n.includes("metro")) return <TrainFront className={cls} />;
  return <MapPin className={cls} />;
}

export default function PropertyLocationSection({ property, nearbyLocations }) {
  const address = property.address || `${property.locality}, ${property.city}`;
  const mapQuery = encodeURIComponent(address);
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  const openUrl = getMapsUrl(property);

  return (
    <section className="card-section">
      <h2 className="text-lg font-bold text-ink">Location</h2>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
        <MapPin className="h-4 w-4 text-brand" />
        {address}
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="relative aspect-[4/3] bg-surface">
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
              className="link text-sm"
            >
              View on Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-ink">Nearby Places</h3>
          {nearbyLocations?.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {nearbyLocations.map((loc) => (
                <li key={loc.name} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5 transition hover:border-brand/30 hover:bg-brand-soft">
                  <span className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-light">
                      <PlaceIcon name={loc.name} />
                    </span>
                    {loc.name}
                  </span>
                  <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-ink/70">{loc.distance}</span>
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
