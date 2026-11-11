/** Replace URLs with /public/kayanat/... when client assets are available. */
import { categoryHref, getCategory } from "@/data/categories";

export const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
];

export const CATEGORY_CARD_IMAGES = {
  apartment:
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  pg: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
  coworking:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
  commercial:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
};

export const DUAL_CTA_IMAGES = {
  listProperty:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  explore:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
};

export const OFFERS = [
  {
    id: "o1",
    title: "First month 10% off",
    subtitle: "On select PG & coliving stays",
    badge: "PG OFFER",
    href: categoryHref(getCategory("pg")),
  },
  {
    id: "o2",
    title: "Zero brokerage",
    subtitle: "List or rent with no hidden fees",
    badge: "FREE",
    href: "/list-your-property",
  },
  {
    id: "o3",
    title: "Festive move-in",
    subtitle: "Special rates on verified flats",
    badge: "LIMITED",
    href: categoryHref(getCategory("flats")),
  },
  {
    id: "o4",
    title: "Coworking trial",
    subtitle: "Day passes on select spaces",
    badge: "NEW",
    href: categoryHref(getCategory("coworking")),
  },
];
