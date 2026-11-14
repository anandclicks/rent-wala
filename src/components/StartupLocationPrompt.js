"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NearbyPrompt from "@/components/NearbyPrompt";

// The search page asks on its own (with the picked category); admin never needs it.
const SKIP_PREFIXES = ["/search", "/admin"];

// Answered once per page load: moving between pages inside the site doesn't ask again,
// but every fresh visit (opening or reloading the site) does.
let answeredThisLoad = false;

/**
 * Asks for the visitor's location every time they open the site (phone and laptop),
 * whatever they answered on earlier visits.
 */
export default function StartupLocationPrompt() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const skip = SKIP_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (skip || answeredThisLoad) return;
    // Deferred so the state update doesn't run synchronously inside the effect.
    const t = setTimeout(() => setOpen(true), 0);
    return () => clearTimeout(t);
  }, [skip]);

  const close = () => {
    answeredThisLoad = true;
    setOpen(false);
  };

  if (!open || skip) return null;
  return <NearbyPrompt onCoords={() => {}} onClose={close} />;
}
