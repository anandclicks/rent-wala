import Link from "next/link";

export default function PropertyRoomDetails({ roomOptions, propertySlug }) {
  if (!roomOptions?.length) return null;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-base font-bold text-ink">Room Details</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {roomOptions.map((room) => (
          <article key={room.name} className="overflow-hidden rounded-xl border border-line">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={room.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80"}
                alt={room.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-bold text-ink">{room.name}</p>
              <p className="mt-0.5 text-xs text-muted">Starting from</p>
              <p className="text-sm font-bold text-brand-dark">
                ₹ {Number(room.price).toLocaleString("en-IN")}/month
              </p>
              {room.furniture?.length > 0 && (
                <ul className="mt-2 space-y-0.5 text-[11px] text-muted">
                  {room.furniture.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              )}
              <Link
                href={`/property/${propertySlug}#booking`}
                className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-dark text-white"
                aria-label={`View ${room.name}`}
              >
                →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
