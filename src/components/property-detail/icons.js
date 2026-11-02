import {
  AirVent,
  ArrowUpDown,
  BadgeCheck,
  Camera,
  Car,
  Cctv,
  CircleCheck,
  Coffee,
  Dumbbell,
  Droplets,
  Flame,
  Gamepad2,
  Heart,
  MapPin,
  Presentation,
  Printer,
  Refrigerator,
  Share2,
  Shirt,
  ShieldCheck,
  Sparkles,
  Trees,
  Tv,
  Users,
  Utensils,
  Waves,
  WashingMachine,
  Wifi,
  Zap,
} from "lucide-react";

export function PinIcon({ className }) {
  return <MapPin className={className} aria-hidden />;
}

export function ShareIcon({ className }) {
  return <Share2 className={className} aria-hidden />;
}

export function HeartIcon({ className, filled }) {
  return <Heart className={`${className} ${filled ? "fill-current" : ""}`} aria-hidden />;
}

export function CheckIcon({ className }) {
  return <BadgeCheck className={className} aria-hidden />;
}

export function CameraIcon({ className }) {
  return <Camera className={className} aria-hidden />;
}

const AMENITY_ICON_MAP = {
  "Wi-Fi": Wifi,
  WiFi: Wifi,
  "Internet/WiFi": Wifi,
  AC: AirVent,
  "Air-Conditioning": AirVent,
  "Air Conditioning": AirVent,
  Meals: Utensils,
  Refrigerator: Refrigerator,
  TV: Tv,
  "Power Backup": Zap,
  "Washing Machine": WashingMachine,
  "RO Water": Droplets,
  "Water Supply": Droplets,
  Housekeeping: Sparkles,
  Gym: Dumbbell,
  "Indoor Games": Gamepad2,
  "Game Zone": Gamepad2,
  Security: ShieldCheck,
  "24x7 Security": Cctv,
  "CCTV Security": Cctv,
  Parking: Car,
  Lift: ArrowUpDown,
  Laundry: Shirt,
  Garden: Trees,
  "Club House": Users,
  "Swimming Pool": Waves,
  Cafeteria: Coffee,
  Cafe: Coffee,
  Terrace: Trees,
  "Smart Home": Zap,
  Intercom: Tv,
  "Meeting Rooms": Presentation,
  "Printer & Scanner": Printer,
  "Gas Pipeline": Flame,
};

export function AmenityIcon({ name, className = "h-5 w-5" }) {
  const Icon = AMENITY_ICON_MAP[name] || CircleCheck;
  return <Icon className={className} aria-hidden />;
}

export const AMENITY_ICONS = AMENITY_ICON_MAP;
