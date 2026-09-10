import { PinIcon } from "./icons";

function InfoCell({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-dark">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted">{label}</p>
        <p className="truncate text-sm font-semibold capitalize text-ink">{value}</p>
      </div>
    </div>
  );
}

function HouseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 20V10l8-6 8 6v10H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 18c0-2.5 2.2-4 5-4s5 1.5 5 4M13 18c0-2 1.5-3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function PropertyQuickInfoBar({ property, layout }) {
  let col2Label = "Configuration";
  let col2Value = "—";

  if (layout.isPG) {
    col2Label = "Suitable For";
    col2Value = property.suitableFor || "Unisex";
  } else if (layout.isCommercial) {
    col2Label = "Area";
    col2Value = property.area || "—";
  } else if (layout.isLand) {
    col2Label = "Plot Size";
    col2Value = property.area || "—";
  } else if (layout.isSell && property.propertyAge) {
    col2Label = "Property Age";
    col2Value = property.propertyAge;
  } else if (property.beds != null) {
    col2Label = "Configuration";
    col2Value = `${property.beds} BHK${property.area ? ` · ${property.area}` : ""}`;
  } else if (property.area) {
    col2Value = property.area;
  }

  const typeLabel = layout.isPG ? "PG / Co-living" : property.category;

  return (
    <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
      <div className="grid grid-cols-2 divide-x divide-line rounded-2xl border border-line bg-white sm:grid-cols-4">
        <InfoCell icon={<HouseIcon className="h-5 w-5" />} label="Property Type" value={typeLabel} />
        <InfoCell icon={<PeopleIcon className="h-5 w-5" />} label={col2Label} value={col2Value} />
        <InfoCell icon={<PinIcon className="h-5 w-5" />} label="Location" value={`${property.locality}, ${property.city}`} />
        <InfoCell icon={<CalendarIcon className="h-5 w-5" />} label="Availability" value={property.availability} />
      </div>
    </div>
  );
}
