"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NearbyPrompt from "@/components/NearbyPrompt";
import { locationPermission, readSavedCoords, requestCoords, wasNearbyPromptAnswered } from "@/lib/geo";

// The search page asks on its own (with the picked category); admin never needs it.
const SKIP_PREFIXES = ["/search", "/admin"];

/**
 * Asks for the visitor's location as soon as they open the site (phone and laptop).
 * - Already allowed in the browser: picks up the location quietly, no popup.
 * - Blocked in the browser: never nags.
 * - Otherwise: shows the prompt right away; "Not now" hides it for this visit only.
 */
export default function StartupLocationPrompt() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const skip = SKIP_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (skip || readSavedCoords()) return;
    let cancelled = false;
    locationPermission().then((state) => {
      if (cancelled) return;
      if (state === "granted") requestCoords().catch(() => {});
      else if (state === "prompt" && !wasNearbyPromptAnswered()) setOpen(true);
    });
    return () => {
      cancelled = true;
    };
  }, [skip]);

  if (!open || skip) return null;
  return <NearbyPrompt onCoords={() => {}} onClose={() => setOpen(false)} />;
}
