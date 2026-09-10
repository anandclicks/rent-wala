import Link from "next/link";
import { getMapsUrl } from "@/lib/property-utils";
import { CheckIcon, PinIcon } from "./icons";

function SpecBox({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-line bg-gray-50/90 px-3 py-4 text-center">
      <span className="mb-2 grid h-9 w-9 place-items-center text-brand-dark">{icon}</span>
      <p className="text-sm font-bold leading-tight text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted">{label}</p>
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
    specs.push({ icon: <BedIcon />, label: "Bedrooms", value: `${property.beds} Beds` });
  }
  if (property.baths != null && property.baths > 0) {
    specs.push({ icon: <BathIcon />, label: "Bathrooms", value: `${property.baths} Baths` });
  }
  if (property.area) {
    specs.push({ icon: <AreaIcon />, label: "Super Built-up Area", value: property.area.replace(" Sq.Ft", " sq.ft") });
  }
  if (property.facing) {
    specs.push({ icon: <CompassIcon />, label: "Facing", value: property.facing });
  }
  if (property.furnishing) {
    specs.push({ icon: <ChairIcon />, label: "Furnishing", value: property.furnishing });
  }
  if (layout.isPG) {
    specs.push({ icon: <PeopleIcon />, label: "Suitable For", value: property.suitableFor || "Unisex" });
  }
  specs.push({
    icon: <BuildingIcon />,
    label: "Property Type",
    value: layout.isPG ? "PG / Hostel" : property.category,
  });

  const displaySpecs = specs.slice(0, 6);

  return (
    <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
      <div className="flex flex-wrap items-start gap-2">
        <h1 className="text-2xl font-bold text-ink sm:text-[1.65rem]">{property.title}</h1>
        {property.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold text-brand-dark">
            <CheckIcon className="h-3.5 w-3.5" />
            Verified Property
          </span>
        )}
      </div>

      <p className="mt-1.5 text-sm text-muted">{subtitle}</p>

      <p className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <PinIcon className="h-4 w-4 shrink-0 text-brand" />
        <span>{property.address || `${property.locality}, ${property.city}`}</span>
        <Link href={mapUrl} target="_blank" className="font-semibold text-brand-dark hover:underline">
          View on Map
        </Link>
      </p>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-bold text-brand-dark">
            {property.price}
            {property.priceSuffix && (
              <span className="text-base font-medium text-muted"> {property.priceSuffix}</span>
            )}
          </p>
          {deposit && <p className="mt-1 text-sm text-muted">{deposit}</p>}
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-dark">
            <CalendarIcon />
          </span>
          <div>
            <p className="text-[11px] font-medium text-muted">Available from</p>
            <p className="text-sm font-bold text-ink">{property.availability || "Ready to Move"}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {displaySpecs.map((s) => (
          <SpecBox key={s.label} icon={s.icon} label={s.label} value={s.value} />
        ))}
      </div>
    </div>
  );
}

function BedIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12V7a1 1 0 011-1h16a1 1 0 011 1v5M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function BathIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3zM7 12V6a2 2 0 012-2 2 2 0 012 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function AreaIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ChairIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 10h12v6H6v-6zM8 10V7a2 2 0 012-2h4a2 2 0 012 2v3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 21V4h9v17M14 21V9h5v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 18c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
