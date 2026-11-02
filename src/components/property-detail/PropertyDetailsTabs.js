"use client";

import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyLocationSection from "./PropertyLocationSection";
import { CircleCheck, FileImage, SearchX, Star } from "lucide-react";

const TABS = ["Property Details", "Floor Plan", "Location", "Ratings & Reviews", "Similar Properties"];

export default function PropertyDetailsTabs({ property, layout, nearby }) {
  const [active, setActive] = useState("Property Details");

  const detailRows = [];
  detailRows.push({ label: "Property ID", value: property.slug?.slice(0, 12).toUpperCase() || "—" });
  if (property.facing) detailRows.push({ label: "Facing", value: property.facing });
  if (property.floor) detailRows.push({ label: "Floor", value: `${property.floor} of ${property.totalFloors || "—"}` });
  if (property.propertyAge) detailRows.push({ label: "Age of Property", value: property.propertyAge });
  if (property.furnishing) detailRows.push({ label: "Furnishing", value: property.furnishing });
  if (property.beds != null) detailRows.push({ label: "Bedrooms", value: property.beds });
  if (property.baths != null) detailRows.push({ label: "Bathrooms", value: property.baths });
  if (property.areaSqft) detailRows.push({ label: "Super Built-up Area", value: `${property.areaSqft.toLocaleString("en-IN")} sq.ft` });
  detailRows.push({ label: "Listing Type", value: property.status === "FOR SALE" ? "For Sale" : "For Rent" });
  detailRows.push({ label: "Property Type", value: layout.isPG ? "PG / Hostel" : property.category?.toLowerCase() });
  detailRows.push({ label: "City", value: property.city });
  detailRows.push({ label: "Locality", value: property.locality });

  const highlights = property.highlights?.length
    ? property.highlights
    : ["Prime location", "Verified listing", "No brokerage"];

  return (
    <section className="container-page pb-12">
      <div className="border-b border-line">
        <div role="tablist" className="no-scrollbar flex gap-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 cursor-pointer border-b-2 py-3.5 text-sm font-semibold transition duration-200 ${
                active === tab
                  ? "border-brand text-brand"
                  : "border-transparent text-muted hover:border-line hover:text-ink"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="mt-6 animate-fade-up">
        {active === "Property Details" && (
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-6">
            <div className="card-section">
              <h3 className="text-lg font-bold text-ink">Property Details</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {detailRows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 border-b border-dashed border-line py-2 text-sm">
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="text-right font-semibold capitalize text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card-section">
              <h3 className="text-lg font-bold text-ink">Why Choose This Property?</h3>
              <ul className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/85">
                    <CircleCheck className="mt-0.5 h-[18px] w-[18px] text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {active === "Floor Plan" && (
          <div className="card-section overflow-hidden">
            <h3 className="text-lg font-bold text-ink">Floor Plan</h3>
            {property.floorPlan ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={property.floorPlan} alt="Floor plan" className="mt-4 max-h-[480px] w-full rounded-xl object-contain" />
            ) : (
              <div className="mt-4 flex aspect-[16/9] flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface px-6 text-center">
                <FileImage className="mb-3 h-10 w-10 text-muted/60" />
                <p className="text-sm font-semibold text-ink">Floor plan not uploaded yet</p>
                <p className="mt-1 text-xs text-muted">Request a visit to view the layout in person.</p>
              </div>
            )}
          </div>
        )}

        {active === "Location" && (
          <PropertyLocationSection property={property} nearbyLocations={property.nearbyLocations} />
        )}

        {active === "Ratings & Reviews" && (
          <div className="card-section">
            <div className="flex flex-wrap items-center gap-4 border-b border-line pb-5">
              <p className="text-4xl font-extrabold text-ink">4.6</p>
              <div>
                <div className="flex gap-0.5 text-accent-dark">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} filled={i <= 4} />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted">Based on 12 verified reviews</p>
              </div>
            </div>
            <ul className="mt-5 space-y-4">
              {[
                { name: "Priya S.", rating: 5, text: "Great location and well-maintained building. Owner was very responsive." },
                { name: "Arjun K.", rating: 4, text: "Spacious rooms and good amenities. Slightly far from metro but manageable." },
                { name: "Neha M.", rating: 5, text: "Exactly as shown in photos. Smooth move-in process." },
              ].map((review) => (
                <li key={review.name} className="rounded-xl border border-line p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-ink">{review.name}</p>
                    <div className="flex gap-0.5 text-accent-dark">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StarIcon key={i} filled={i <= review.rating} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{review.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "Similar Properties" && (
          <div>
            {nearby?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {nearby.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <p className="card flex flex-col items-center gap-3 px-6 py-12 text-center text-sm text-muted">
                <SearchX className="h-8 w-8 text-muted/60" />
                No similar properties in this area yet.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function StarIcon({ filled, className = "h-4 w-4" }) {
  return <Star className={`${className} ${filled ? "fill-current" : ""}`} aria-hidden />;
}
