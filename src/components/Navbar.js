"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "Buy", href: "#" },
  { label: "Rent", href: "#" },
  { label: "PG", href: "#" },
  { label: "Commercial", href: "#" },
  { label: "Land", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Services", href: "#" },
  { label: "About Us", href: "#" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-lg font-extrabold tracking-tight text-white">
          PROPERTY
        </span>
        <span className="block text-[10px] font-semibold tracking-[0.3em] text-white/80">
          RENT WALA
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-brand text-white shadow-sm">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-4 py-3 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav className="mx-auto hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative py-1 text-sm font-medium transition hover:text-white ${
                link.active ? "text-white" : "text-white/85"
              }`}
            >
              {link.label}
              {link.active && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-white" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <button className="flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white">
            <HeartIcon className="h-5 w-5" />
            Shortlist
          </button>
          <button className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-light">
            <PlusIcon className="h-4 w-4" />
            Post Property
          </button>
          <button className="flex items-center gap-2 rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
            <UserIcon className="h-4 w-4" />
            Sign In / Register
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto grid h-10 w-10 place-items-center rounded-md border border-white/40 text-white transition hover:bg-white/10 lg:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="lg:hidden">
          <div className="border-t border-white/15 bg-brand px-4 pb-5 pt-2">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition hover:bg-white/10 ${
                    link.active ? "text-white" : "text-white/85"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/15 pt-4">
              <button
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-md border border-white/50 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <UserIcon className="h-4 w-4" />
                Sign In / Register
              </button>
              <button
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-light"
              >
                <PlusIcon className="h-4 w-4" />
                Post Property
              </button>
              <button
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                <HeartIcon className="h-5 w-5" />
                Shortlist
              </button>
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
      <path
        d="M12 20s-7-4.35-9.33-8.4C1.1 8.9 2.3 5.5 5.6 5.5c1.9 0 3.2 1.2 4.4 2.6 1.2-1.4 2.5-2.6 4.4-2.6 3.3 0 4.5 3.4 2.93 6.1C19 15.65 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
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
