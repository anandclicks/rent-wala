import { getMapsUrl } from "@/lib/property-utils";

export default function PropertyMap({ property }) {
  const address = property.address || `${property.locality}, ${property.city}`;
  const mapQuery = encodeURIComponent(address);
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  const openUrl = getMapsUrl(property);

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="border-b border-line px-5 py-4">
        <h2 className="text-lg font-bold text-ink">Location & Map</h2>
        <p className="mt-1 text-sm text-muted">{address}</p>
      </div>
      <div className="relative aspect-[16/9] w-full bg-gray-100">
        <iframe
          title={`Map of ${property.title}`}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <p className="text-xs text-muted">
          {property.locality}, {property.city}
        </p>
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-semibold text-brand-dark transition hover:text-brand-darker"
        >
          Open in Google Maps →
        </a>
      </div>
    </section>
  );
}
