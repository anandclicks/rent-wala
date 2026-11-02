"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { HeartIcon, ShareIcon } from "./icons";

export default function PropertyDetailHeader({ property }) {
  const { has, toggle } = useWishlist();
  const saved = has(property.id);
  const [shareMsg, setShareMsg] = useState("");

  const listingLabel = property.status === "FOR SALE" ? "Buy" : "Rent";
  const typeLabel =
    property.categoryEnum === "PG"
      ? "PG/Hostel"
      : property.category?.replace(/_/g, " ") || "Properties";

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2000);
    } catch {
      setShareMsg("Could not share");
      setTimeout(() => setShareMsg(""), 2000);
    }
  };

  const crumb = "shrink-0 transition hover:text-brand";

  return (
    <div className="border-b border-line bg-white">
      <div className="container-page flex items-center justify-between gap-3 py-2.5">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-xs text-muted">
          <Link href="/" className={crumb}>
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/search?listingType=${property.status === "FOR SALE" ? "SELL" : "RENT"}&city=${property.city}`}
            className={crumb}
          >
            {listingLabel}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/search?city=${property.city}&category=${property.categoryEnum}`} className={`${crumb} capitalize`}>
            {typeLabel.toLowerCase()} in {property.city}
          </Link>
          <ChevronRight className="hidden h-3.5 w-3.5 sm:block" />
          <span className="hidden truncate text-ink sm:inline">{property.title}</span>
        </nav>

        <div className="relative flex shrink-0 items-center gap-1">
          <button type="button" onClick={share} className="btn btn-ghost btn-sm">
            <ShareIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            type="button"
            onClick={() => toggle(property.id)}
            aria-pressed={saved}
            className={`btn btn-sm ${saved ? "bg-red-50 text-red-500 hover:bg-red-100" : "btn-ghost"}`}
          >
            <HeartIcon key={String(saved)} className={`h-4 w-4 ${saved ? "animate-scale-in" : ""}`} filled={saved} />
            <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
          </button>
          {shareMsg && (
            <span
              role="status"
              className="absolute right-0 top-full z-10 mt-1 flex animate-scale-in items-center gap-1.5 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white shadow-pop"
            >
              <Check className="h-3.5 w-3.5" />
              {shareMsg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
