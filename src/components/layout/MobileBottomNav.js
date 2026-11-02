"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, Compass, House, Menu, Plus } from "lucide-react";

const ITEMS = [
  { label: "Home", href: "/", icon: House, isActive: (p) => p === "/" },
  { label: "Explore", href: "/search?listingType=RENT", icon: Compass, isActive: (p) => p === "/search" },
  { label: "Post", href: "/list-your-property", icon: Plus, center: true, isActive: (p) => p === "/list-your-property" },
  { label: "PG/Hostel", href: "/search?category=PG", icon: BedDouble, isActive: () => false },
];

/** Hidden on detail pages, which render their own contact bar in this slot. */
export function hasBottomNav(pathname) {
  return !pathname.startsWith("/property/") && !pathname.startsWith("/admin");
}

/** OLX-style app tab bar for phones and small tablets. */
export default function MobileBottomNav({ onMenu }) {
  const pathname = usePathname();
  if (!hasBottomNav(pathname)) return null;

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-xl grid-cols-5">
        {ITEMS.map((item) => {
          const active = item.isActive(pathname);
          const Icon = item.icon;
          if (item.center) {
            return (
              <li key={item.label} className="relative grid place-items-center">
                <Link
                  href={item.href}
                  aria-label="Post property"
                  className="absolute -top-5 grid h-14 w-14 place-items-center rounded-full bg-[conic-gradient(from_180deg,var(--brand),var(--accent),#23e5db,var(--brand))] p-[3px] shadow-lg shadow-brand/20 transition active:scale-95"
                >
                  <span className="grid h-full w-full place-items-center rounded-full bg-white text-ink">
                    <Icon className="h-6 w-6" />
                  </span>
                </Link>
                <span className="mt-7 text-[11px] font-medium text-ink/70">{item.label}</span>
              </li>
            );
          }
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
                  active ? "text-brand" : "text-ink/60 hover:text-ink"
                }`}
              >
                <Icon className="h-[22px] w-[22px]" />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={onMenu}
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-[11px] font-medium text-ink/60 transition hover:text-ink"
          >
            <Menu className="h-[22px] w-[22px]" />
            Menu
          </button>
        </li>
      </ul>
    </nav>
  );
}
