import Link from "next/link";
import { getMapsUrl } from "@/lib/property-utils";
import { Bath, BedDouble, Building2, CalendarCheck, Compass, ExternalLink, Ruler, Sofa, Users } from "lucide-react";
import { CheckIcon, PinIcon } from "./icons";

function SpecBox({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 transition duration-200 hover:border-brand/30 hover:shadow-card">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-light text-brand">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-muted">{label}</p>
        <p className="truncate text-sm font-semibold capitalize leading-tight text-ink">{value}</p>
      </div>
    </div>
  );
}

export default function PropertyTitleSection({ property, layout }) {
  const mapUrl = getMapsUrl(property);
  const subtitle = property.highlights?.[0] || "Modern living with great connectivity";
  const deposit =
    layout.isRent && property.rawPrice
      ? `₹ ${Math.round(property.rawPrice * 7).toLocaleString("en-IN")} Security Deposit`
      : null;

  const specs = [];
  if (property.beds != null && property.beds > 0) {
    specs.push({ icon: BedDouble, label: "Bedrooms", value: `${property.beds} Beds` });
  }
  if (property.baths != null && property.baths > 0) {
    specs.push({ icon: Bath, label: "Bathrooms", value: `${property.baths} Baths` });
  }
  if (property.area) {
    specs.push({ icon: Ruler, label: "Super Built-up Area", value: property.area.replace(" Sq.Ft", " sq.ft") });
  }
  if (property.facing) {
    specs.push({ icon: Compass, label: "Facing", value: property.facing });
  }
  if (property.furnishing) {
    specs.push({ icon: Sofa, label: "Furnishing", value: property.furnishing });
  }
  if (layout.isPG) {
    specs.push({ icon: Users, label: "Suitable For", value: property.suitableFor || "Unisex" });
  }
  specs.push({
    icon: Building2,
    label: "Property Type",
    value: layout.isPG ? "PG / Hostel" : property.category?.toLowerCase(),
  });

  const displaySpecs = specs.slice(0, 6);

  return (
    <div className="container-page">
      <div className="card p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">{property.title}</h1>
              {property.verified && (
                <span className="badge badge-soft normal-case tracking-normal">
                  <CheckIcon className="h-3.5 w-3.5" />
                  Verified Property
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink/75">
              <PinIcon className="h-4 w-4 text-brand" />
              <span>{property.address || `${property.locality}, ${property.city}`}</span>
              <Link href={mapUrl} target="_blank" className="link text-sm">
                View on Map
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-stretch gap-3 border-t border-line pt-4 lg:flex-col lg:items-end lg:border-0 lg:pt-0 lg:text-right">
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {property.price}
                {property.priceSuffix && (
                  <span className="text-base font-medium text-muted"> {property.priceSuffix}</span>
                )}
              </p>
              {deposit && <p className="mt-0.5 text-sm text-muted">{deposit}</p>}
            </div>
            <div className="ml-auto flex items-center gap-2.5 rounded-lg bg-success/10 px-3 py-2 text-left lg:ml-0">
              <CalendarCheck className="h-5 w-5 text-success" />
              <div>
                <p className="text-[11px] text-muted">Available from</p>
                <p className="text-sm font-semibold text-ink">{property.availability || "Ready to Move"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-line pt-5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-6">
          {displaySpecs.map((s) => (
            <SpecBox key={s.label} icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
