import { getMapsUrl } from "@/lib/property-utils";

export default function PropertyNearbyLocations({ property, nearbyLocations }) {
  const mapUrl = getMapsUrl(property);

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-ink">Nearby Locations</h2>
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand-dark hover:underline">
          View on Map
        </a>
      </div>
      {nearbyLocations?.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {nearbyLocations.map((loc) => (
            <li key={loc.name} className="flex items-center justify-between text-sm">
              <span className="text-ink">{loc.name}</span>
              <span className="font-semibold text-muted">{loc.distance}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">Explore the area on the map.</p>
      )}
    </section>
  );
}
