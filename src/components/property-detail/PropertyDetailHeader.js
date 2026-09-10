"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartIcon, ShareIcon } from "./icons";

const WISHLIST_KEY = "prw_wishlist";

export default function PropertyDetailHeader({ property }) {
  const [saved, setSaved] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const listingLabel = property.status === "FOR SALE" ? "Buy" : "Rent";
  const typeLabel =
    property.categoryEnum === "PG"
      ? "PG/Hostel"
      : property.category?.replace(/_/g, " ") || "Properties";

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      setSaved(list.includes(property.id));
    } catch {
      setSaved(false);
    }
  }, [property.id]);

  const toggleSave = () => {
    try {
      const list = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      const next = saved ? list.filter((id) => id !== property.id) : [...list, property.id];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setSaved(!saved);
    } catch {
      /* ignore */
    }
  };

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

  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <nav className="text-xs text-muted">
          <Link href="/" className="hover:text-brand-dark">
            Home
          </Link>
          <span className="mx-1.5">›</span>
          <Link href={`/search?listingType=${property.status === "FOR SALE" ? "SELL" : "RENT"}&city=${property.city}`} className="hover:text-brand-dark">
            {listingLabel}
          </Link>
          <span className="mx-1.5">›</span>
          <Link href={`/search?city=${property.city}&category=${property.categoryEnum}`} className="hover:text-brand-dark">
            {typeLabel} in {property.city}
          </Link>
          <span className="mx-1.5">›</span>
          <span className="text-ink">{property.title}</span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={share}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-ink/70 hover:text-brand-dark"
          >
            <ShareIcon className="h-4 w-4" />
            Share
          </button>
          <button
            type="button"
            onClick={toggleSave}
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
              saved ? "text-brand-dark" : "text-ink/70 hover:text-brand-dark"
            }`}
          >
            <HeartIcon className="h-4 w-4" filled={saved} />
            Save
          </button>
        </div>
      </div>
      {shareMsg && <p className="mx-auto max-w-[1280px] px-4 pb-2 text-xs text-brand-dark lg:px-6">{shareMsg}</p>}
    </div>
  );
}
