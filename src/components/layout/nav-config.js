import data from "@/data/data.json";
import { KeyRound, Tag } from "lucide-react";
import { CATEGORY_PARAM, PROPERTY_CATEGORIES, categoryHref } from "@/data/categories";

/** Header bar (desktop) and the "Browse" group of the mobile menu: just Rent and Sell. */
export const DESKTOP_NAV_LINKS = [
  { label: "Rent", href: "/search?listingType=RENT", icon: KeyRound, match: { listingType: "RENT" } },
  { label: "Sell", href: "/list-your-property", icon: Tag, path: "/list-your-property" },
];

/** The site's categories (from data/categories.js) as menu links. */
export const CATEGORY_LINKS = PROPERTY_CATEGORIES.map((c) => ({
  label: c.label,
  href: categoryHref(c),
  icon: c.icon,
  match: { [CATEGORY_PARAM]: c.key },
}));

/** Cities the site serves (one list in data.json, shared with hero search and the listing form). */
export const CITIES = data.cities;

export const SUPPORT = {
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "support@propertyrentwala.com",
  address: "B-120, Sector 63, Noida, Uttar Pradesh - 201301",
};

export function isLinkActive(link, pathname, params) {
  if (link.path) return pathname === link.path;
  if (pathname !== "/search" || !params || !link.match) return false;
  return Object.entries(link.match).every(([k, v]) => params.get(k) === v);
}
