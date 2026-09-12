"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "Buy", href: "/search?listingType=SELL&city=Noida" },
  { label: "Rent", href: "/search?listingType=RENT&city=Noida" },
  { label: "PG/Hostel", href: "/search?category=PG&city=Noida" },
  { label: "Commercial", href: "/search?category=COMMERCIAL&city=Noida" },
  { label: "Independent House", href: "/search?category=INDEPENDENT_HOUSE&city=Noida" },
  { label: "Agents", href: "#" },
];

function NavbarSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?location=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <form onSubmit={submit} className="hidden lg:block">
      <label className="relative flex items-center">
        <span className="sr-only">Search location, property or landmark</span>
        <SearchIcon className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location, property or landmark"
          className="h-10 w-[220px] rounded-full border border-line bg-brand-soft/40 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:bg-white xl:w-[280px]"
        />
      </label>
    </form>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  const isHome = pathname === "/";
  const showSearch = !isHome;

  const linkClass = isHome
    ? "text-sm font-medium text-white/85 transition hover:text-white"
    : "text-sm font-medium text-ink/70 transition hover:text-brand-dark";

  return (
    <header
      className={
        isHome
          ? "sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur-md"
          : "sticky top-0 z-50 border-b border-line bg-white shadow-sm"
      }
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center gap-4 px-4 lg:px-8">
        <Logo variant="brand" />

        <nav className="mx-auto hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <button type="button" className={`flex items-center gap-1 ${linkClass}`}>
            More
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          {showSearch && <NavbarSearch />}
          <button
            type="button"
            aria-label="Shortlisted properties"
            className={`grid h-10 w-10 place-items-center rounded-full transition ${
              isHome
                ? "text-white/85 hover:bg-white/10 hover:text-white"
                : "text-ink/60 hover:bg-brand-soft hover:text-brand-dark"
            }`}
          >
            <HeartIcon className="h-5 w-5" />
          </button>
          {!showSearch && (
            <Link
              href="/list-your-property"
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                isHome
                  ? "border-white/40 text-white hover:border-white hover:bg-white/10"
                  : "border-line text-ink hover:border-brand-dark hover:text-brand-dark"
              }`}
            >
              List Property
            </Link>
          )}
          <button
            type="button"
            aria-label="Account"
            className={`grid h-10 w-10 place-items-center rounded-full transition ${
              isHome
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-brand-soft text-brand-dark hover:bg-brand-light"
            }`}
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`ml-auto grid h-10 w-10 place-items-center rounded-full border transition lg:hidden ${
            isHome
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-line text-ink hover:bg-brand-soft"
          }`}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="px-4 pb-5 pt-3">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 transition hover:bg-brand-soft hover:text-brand-dark"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-line pt-4">
              <Link
                href="/list-your-property"
                onClick={close}
                className="flex items-center justify-center rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand-dark"
              >
                List Property
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20s-7-4.35-9.33-8.4C1.1 8.9 2.3 5.5 5.6 5.5c1.9 0 3.2 1.2 4.4 2.6 1.2-1.4 2.5-2.6 4.4-2.6 3.3 0 4.5 3.4 2.93 6.1C19 15.65 12 20 12 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 19c1.2-3 4-4.5 7-4.5s5.8 1.5 7 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
