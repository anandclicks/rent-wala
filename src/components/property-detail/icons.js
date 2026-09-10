export function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ShareIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ className, filled }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden>
      <path d="M12 20s-7-4.35-9.33-8.4C1.1 8.9 2.3 5.5 5.6 5.5c1.9 0 3.2 1.2 4.4 2.6 1.2-1.4 2.5-2.6 4.4-2.6 3.3 0 4.5 3.4 2.93 6.1C19 15.65 12 20 12 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CameraIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8h3l2-2h6l2 2h3v11H4V8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function WifiIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12.5a14 14 0 0114 0M8.5 16a9 9 0 016 0M12 20h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function AcIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MealsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 3v8a2 2 0 004 0V3M8 11v10M16 3v18M18 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function FridgeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="3" width="12" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 10h12M9 6.5v1M9 13.5v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function TvIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PowerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2v8M8.5 4.5a7 7 0 101.5 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function WasherIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function WaterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21c4-4 6-7.5 6-10.5a6 6 0 10-12 0C6 13.5 8 17 12 21z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function HousekeepingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GymIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6.5 9.5v5M17.5 9.5v5M4 11h3M17 11h3M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="7.5" y="8" width="2" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14.5" y="8" width="2" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function GamesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="8" width="16" height="8" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 12h2M10 11v2M16 11.5v.01M18 13.5v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CctvIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8h4l2-2h4l2 2h4v10H4V8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ParkingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8h3a2 2 0 010 4h-3V8zM10 12v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LiftIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="3" width="12" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v10M9 10l3-3 3 3M9 14l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SecurityIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PoolIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2M4 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GardenIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21V10M12 10C12 6 8 4 5 6c0 4 3 6 7 4M12 10c0-4 4-6 7-4-1 4-4 6-7 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LaundryIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ClubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 20V8l8-5 8 5v12H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function DefaultAmenityIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const AMENITY_ICON_MAP = {
  "Wi-Fi": WifiIcon,
  WiFi: WifiIcon,
  AC: AcIcon,
  Meals: MealsIcon,
  Refrigerator: FridgeIcon,
  TV: TvIcon,
  "Power Backup": PowerIcon,
  "Washing Machine": WasherIcon,
  "RO Water": WaterIcon,
  "Water Supply": WaterIcon,
  Housekeeping: HousekeepingIcon,
  Gym: GymIcon,
  "Indoor Games": GamesIcon,
  Security: SecurityIcon,
  "24x7 Security": CctvIcon,
  "CCTV Security": CctvIcon,
  Parking: ParkingIcon,
  Lift: LiftIcon,
  Laundry: LaundryIcon,
  Garden: GardenIcon,
  "Club House": ClubIcon,
  "Swimming Pool": PoolIcon,
  Cafeteria: MealsIcon,
  Terrace: GardenIcon,
  "Smart Home": AcIcon,
  Intercom: TvIcon,
};

export function AmenityIcon({ name, className = "h-5 w-5" }) {
  const Icon = AMENITY_ICON_MAP[name] || DefaultAmenityIcon;
  return <Icon className={className} />;
}

export const AMENITY_ICONS = AMENITY_ICON_MAP;
