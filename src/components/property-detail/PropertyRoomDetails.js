import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function PropertyRoomDetails({ roomOptions, propertySlug }) {
  if (!roomOptions?.length) return null;

  return (
    <section className="card-section">
      <h2 className="text-lg font-bold text-ink">Room Details</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {roomOptions.map((room) => (
          <article key={room.name} className="card card-interactive group flex flex-col overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={room.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80"}
                alt={room.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-3.5">
              <div className="flex-1">
                <p className="text-sm font-bold text-ink">{room.name}</p>
                <p className="mt-0.5 text-xs text-muted">Starting from</p>
                <p className="text-base font-bold text-ink">
                  ₹ {Number(room.price).toLocaleString("en-IN")}
                  <span className="text-xs font-medium text-muted">/month</span>
                </p>
                {room.furniture?.length > 0 && (
                  <ul className="mt-2 space-y-1 text-xs text-muted">
                    {room.furniture.map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Link
                href={`/property/${propertySlug}#booking`}
                className="btn btn-secondary btn-sm mt-3 w-full"
                aria-label={`Enquire about ${room.name}`}
              >
                Enquire
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
