import {
  BedDouble,
  Building,
  Building2,
  ChefHat,
  House,
  KeyRound,
  LandPlot,
  Castle,
} from "lucide-react";

/** Primary category links shown in the header bar and the mobile menu. */
export const NAV_LINKS = [
  { label: "Rent", href: "/search?listingType=RENT", icon: KeyRound, match: { listingType: "RENT" } },
  { label: "PG/Hostel", href: "/search?category=PG", icon: BedDouble, match: { category: "PG" } },
  { label: "Commercial", href: "/search?category=COMMERCIAL", icon: Building2, match: { category: "COMMERCIAL" } },
  {
    label: "Independent House",
    href: "/search?category=INDEPENDENT_HOUSE",
    icon: House,
    match: { category: "INDEPENDENT_HOUSE" },
  },
];

/** Secondary links grouped under "More". */
export const MORE_LINKS = [
  { label: "Flats / Apartments", href: "/search?category=APARTMENT", icon: Building, match: { category: "APARTMENT" } },
  { label: "Villas", href: "/search?category=VILLA", icon: Castle, match: { category: "VILLA" } },
  { label: "Lands & Plots", href: "/search?category=LAND", icon: LandPlot, match: { category: "LAND" } },
  { label: "Kitchen Flats", href: "/search?kitchen=1&listingType=RENT", icon: ChefHat, match: { kitchen: "1" } },
];

export const CITIES = ["Delhi", "Gurugram", "Noida"];

export const SUPPORT = {
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "support@propertyrentwala.com",
  address: "B-120, Sector 63, Noida, Uttar Pradesh - 201301",
};

export function isLinkActive(link, pathname, params) {
  if (pathname !== "/search" || !params || !link.match) return false;
  return Object.entries(link.match).every(([k, v]) => params.get(k) === v);
}
