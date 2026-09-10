"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const NAV = [
  { href: "/admin/properties", label: "Listings" },
  { href: "/admin/properties/new", label: "Add Listing" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminShell({ children }) {
  const { user, ready, openAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      openAuth("signin");
      setChecking(false);
      return;
    }
    if (user.role !== "ADMIN") {
      router.replace("/");
      return;
    }
    setChecking(false);
  }, [user, ready, openAuth, router]);

  if (!ready || checking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted">
        Loading admin...
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-lg font-bold text-ink">Admin access required</p>
        <p className="mt-2 text-sm text-muted">
          Sign in with the admin email ({process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@propertyrentwala.com"}).
        </p>
        <button
          type="button"
          onClick={() => openAuth("signin")}
          className="mt-4 rounded-xl bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-dark">Admin Panel</p>
            <p className="text-sm text-muted">Property Rent Wala</p>
          </div>
          <Link href="/" className="text-sm font-semibold text-brand-dark hover:underline">
            ← Back to site
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-8 lg:grid-cols-[220px_1fr] lg:px-8">
        <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-brand-dark text-white"
                  : "bg-white text-ink hover:bg-brand-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
