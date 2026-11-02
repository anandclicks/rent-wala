"use client";

import Link from "next/link";
import { Bath, BadgeCheck, BedDouble, Heart, MapPin, Ruler, Users } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";

function statusLabel(property) {
  if (property.categoryEnum === "PG") return "PG / Hostel";
  if (property.status === "FOR SALE") return "For Sale";
  return "For Rent";
}

export function ShortlistButton({ id, className = "" }) {
  const { has, toggle } = useWishlist();
  const saved = has(id);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from shortlist" : "Add to shortlist"}
      aria-pressed={saved}
      onClick={() => toggle(id)}
      className={`grid h-9 w-9 place-items-center rounded-full bg-white shadow-md shadow-black/10 transition duration-200 hover:scale-110 active:scale-90 ${
        saved ? "text-red-500" : "text-ink/70 hover:text-red-500"
      } ${className}`}
    >
      <Heart key={String(saved)} className={`h-[18px] w-[18px] ${saved ? "animate-scale-in fill-current" : ""}`} />
    </button>
  );
}

export default function PropertyCard({ property }) {
  const href = property.slug ? `/property/${property.slug}` : "#";
  const showBeds = property.beds != null && property.beds > 0;
  const showBaths = property.baths != null && property.baths > 0;
  const isPG = property.categoryEnum === "PG";

  return (
    <article className="card card-interactive group relative flex h-full flex-col overflow-hidden">
      <Link href={href} className="flex flex-1 flex-col outline-none focus-visible:ring-4 focus-visible:ring-brand/20">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.image}
            alt={`${property.title} in ${property.locality}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
          {property.featured ? (
            <span className="badge badge-featured absolute left-3 top-3 shadow-sm">Featured</span>
          ) : null}
          <span className="badge badge-dark absolute bottom-3 left-3">{statusLabel(property)}</span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-lg font-bold leading-tight text-ink sm:text-xl">
            {property.price}
            {property.priceSuffix && (
              <span className="text-sm font-medium text-muted"> {property.priceSuffix}</span>
            )}
          </p>
          <h3 className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-ink/80">
            <span className="line-clamp-1">{property.title}</span>
            {property.verified && (
              <BadgeCheck className="h-4 w-4 text-brand" aria-label="Verified listing" />
            )}
          </h3>

          {(showBeds || showBaths || property.area || isPG) && (
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-muted">
              {showBeds && (
                <span className="flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4" />
                  {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
                </span>
              )}
              {showBaths && (
                <span className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4" />
                  {property.baths} {property.baths === 1 ? "Bath" : "Baths"}
                </span>
              )}
              {property.area && (
                <span className="flex items-center gap-1.5">
                  <Ruler className="h-4 w-4" />
                  {property.area.replace(" Sq.Ft", " sq.ft")}
                </span>
              )}
              {isPG && !property.beds && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {property.suitableFor || "Co-living"}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto pt-3.5">
            <p className="flex items-center gap-1.5 border-t border-line pt-3 text-[11px] font-medium uppercase tracking-wide text-muted">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">
                {property.locality ? `${property.locality}, ` : ""}
                {property.city}
              </span>
            </p>
          </div>
        </div>
      </Link>

      <ShortlistButton id={property.id} className="absolute right-3 top-3" />
    </article>
  );
}
