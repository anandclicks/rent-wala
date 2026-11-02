"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Inbox, LayoutList, Loader2, LockKeyhole, Plus, Settings } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const NAV = [
  { href: "/admin/properties", label: "Listings", icon: LayoutList },
  { href: "/admin/properties/new", label: "Add Listing", icon: Plus },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
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
      <div className="flex min-h-[50vh] items-center justify-center gap-2 text-muted">
        <Loader2 className="h-5 w-5 animate-spin text-brand" />
        Loading admin...
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand-light text-brand">
          <LockKeyhole className="h-6 w-6" />
        </span>
        <p className="text-lg font-bold text-ink">Admin access required</p>
        <p className="mt-2 text-sm text-muted">
          Sign in with the admin email ({process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@propertyrentwala.com"}).
        </p>
        <button
          type="button"
          onClick={() => openAuth("signin")}
          className="btn btn-primary mt-4"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="border-b border-line bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Admin Panel</p>
            <p className="text-sm text-muted">Property Rent Wala</p>
          </div>
          <Link href="/" className="link text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </div>

      <div className="container-page grid gap-6 py-6 lg:grid-cols-[220px_1fr] lg:gap-8 lg:py-8">
        <nav className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-brand text-white shadow-sm shadow-brand/20"
                  : "bg-white text-ink/80 ring-1 ring-line hover:text-brand lg:bg-transparent lg:ring-0 lg:hover:bg-white"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
