"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Heart, MapPin, Menu, Plus, Search, UserRound, Check } from "lucide-react";
import Logo from "@/components/Logo";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import MobileMenu from "@/components/layout/MobileMenu";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { CITIES, MORE_LINKS, NAV_LINKS, isLinkActive } from "@/components/layout/nav-config";
import { useWishlist } from "@/lib/wishlist";

function NavbarSearch({ className = "", initial = "" }) {
  const router = useRouter();
  const [query, setQuery] = useState(initial);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <form onSubmit={submit} role="search" className={className}>
      <label className="group flex h-11 items-stretch overflow-hidden rounded-lg border-2 border-ink/85 bg-white transition focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
        <span className="sr-only">Search location, property or landmark</span>
        <span className="grid place-items-center pl-3.5 text-muted">
          <Search className="h-[18px] w-[18px]" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location, property or landmark"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-muted/80"
        />
        <button
          type="submit"
          aria-label="Search"
          className="hidden w-12 place-items-center bg-ink/90 text-white transition hover:bg-brand sm:grid"
        >
          <Search className="h-5 w-5" />
        </button>
      </label>
    </form>
  );
}

function NavbarSearchWithParams(props) {
  const params = useSearchParams();
  const q = params.get("q") || "";
  // Remount when the URL query changes so the field reflects the current search.
  return <NavbarSearch key={q} {...props} initial={q} />;
}

function CityPicker({ params, compact = false }) {
  const router = useRouter();
  const current = params?.get("city") || "";
  const label = current || "Delhi NCR";

  return (
    <Dropdown
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="menu"
          className={`flex h-11 items-center gap-2 rounded-lg text-sm font-medium text-ink transition hover:bg-surface ${
            compact ? "max-w-[150px] px-2" : "min-w-[170px] border border-line px-3"
          }`}
        >
          <MapPin className="h-[18px] w-[18px] text-brand" />
          <span className="truncate">{label}</span>
          <ChevronDown
            className={`ml-auto h-4 w-4 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}
    >
      {({ close }) => (
        <div role="menu">
          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-muted">
            Choose city
          </p>
          {CITIES.map((city) => (
            <DropdownItem
              key={city}
              icon={MapPin}
              active={city === current}
              onClick={() => {
                close();
                router.push(`/search?city=${encodeURIComponent(city)}`);
              }}
            >
              <span className="flex-1">{city}</span>
              {city === current && <Check className="h-4 w-4" />}
            </DropdownItem>
          ))}
        </div>
      )}
    </Dropdown>
  );
}

function CityPickerWithParams(props) {
  const params = useSearchParams();
  return <CityPicker {...props} params={params} />;
}

function CategoryBar({ params }) {
  const pathname = usePathname();
  const moreActive = MORE_LINKS.some((l) => isLinkActive(l, pathname, params));

  return (
    <nav aria-label="Property categories" className="flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const active = isLinkActive(link, pathname, params);
        const Icon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
              active ? "text-brand" : "text-ink/75 hover:bg-surface hover:text-ink"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" />
            {link.label}
            {active && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />}
          </Link>
        );
      })}
      <Dropdown
        trigger={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-haspopup="menu"
            className={`flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition ${
              moreActive || open ? "text-brand" : "text-ink/75 hover:bg-surface hover:text-ink"
            }`}
          >
            More
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      >
        {({ close }) => (
          <div role="menu">
            {MORE_LINKS.map((link) => (
              <DropdownItem
                key={link.label}
                as={Link}
                href={link.href}
                icon={link.icon}
                active={isLinkActive(link, pathname, params)}
                onClick={close}
              >
                {link.label}
              </DropdownItem>
            ))}
          </div>
        )}
      </Dropdown>
    </nav>
  );
}

function CategoryBarWithParams() {
  const params = useSearchParams();
  return <CategoryBar params={params} />;
}

function WishlistButton({ className = "" }) {
  const { count } = useWishlist();
  return (
    <span className={`relative ${className}`}>
      <button type="button" aria-label={`Shortlisted properties (${count})`} className="icon-btn">
        <Heart className="h-[22px] w-[22px]" />
      </button>
      {count > 0 && (
        <span className="pointer-events-none absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] animate-scale-in place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white ring-2 ring-white">
          {count}
        </span>
      )}
    </span>
  );
}

/** OLX-style "Sell" pill: white button wrapped in a two-tone ring. */
export function PostPropertyButton({ className = "" }) {
  return (
    <Link
      href="/list-your-property"
      className={`group relative rounded-full bg-[conic-gradient(from_180deg,var(--brand),var(--accent),#23e5db,var(--brand))] p-[3px] shadow-sm transition hover:shadow-md active:scale-[0.98] ${className}`}
    >
      <span className="flex h-[38px] items-center gap-1.5 rounded-full bg-white px-4 text-sm font-bold tracking-wide text-ink">
        <Plus className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-90" />
        POST PROPERTY
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close the drawer whenever navigation happens.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_20px_-12px_rgb(15_23_42/0.25)]" : ""
        }`}
      >
        {/* Row 1 — logo, location, search, actions */}
        <div className="container-page flex h-16 items-center gap-3 lg:h-[4.5rem] lg:gap-5">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="icon-btn -ml-2 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Logo variant="brand" />

          <div className="hidden lg:block">
            <Suspense fallback={<CityPicker params={null} />}>
              <CityPickerWithParams />
            </Suspense>
          </div>

          <Suspense fallback={<NavbarSearch className="hidden flex-1 lg:block" />}>
            <NavbarSearchWithParams className="hidden flex-1 lg:block" />
          </Suspense>

          <div className="ml-auto flex items-center gap-1 lg:ml-0 lg:gap-2">
            <div className="lg:hidden">
              <Suspense fallback={<CityPicker params={null} compact />}>
                <CityPickerWithParams compact />
              </Suspense>
            </div>
            <WishlistButton />
            <button type="button" aria-label="Account" className="icon-btn hidden lg:grid">
              <UserRound className="h-[22px] w-[22px]" />
            </button>
            <PostPropertyButton className="ml-2 hidden lg:inline-flex" />
          </div>
        </div>

        {/* Row 2 — mobile search */}
        <div className="container-page pb-3 lg:hidden">
          <Suspense fallback={<NavbarSearch />}>
            <NavbarSearchWithParams />
          </Suspense>
        </div>

        {/* Row 2 — desktop category bar */}
        <div className="hidden border-t border-line lg:block">
          <div className="container-page flex items-center justify-between">
            <Suspense fallback={<CategoryBar params={null} />}>
              <CategoryBarWithParams />
            </Suspense>
            <p className="hidden items-center gap-1.5 text-xs font-medium text-muted xl:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Verified listings · Zero brokerage
            </p>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileBottomNav onMenu={() => setMenuOpen(true)} />
    </>
  );
}
