"use client";

import { useEffect, useRef, useState } from "react";
import { LocateFixed, X } from "lucide-react";
import { markNearbyPromptAnswered, requestCoords } from "@/lib/geo";

/**
 * Asks before triggering the browser's location permission, so visitors know why.
 * Bottom sheet on phones, centred card on larger screens.
 */
export default function NearbyPrompt({ what = "properties", onCoords, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | asking | error
  const [error, setError] = useState("");
  const allowRef = useRef(null);

  useEffect(() => {
    allowRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    markNearbyPromptAnswered("dismissed");
    onClose();
  }

  async function allow() {
    setStatus("asking");
    try {
      const coords = await requestCoords();
      markNearbyPromptAnswered("allowed");
      onCoords(coords);
      onClose();
    } catch (e) {
      markNearbyPromptAnswered("blocked");
      setError(e.message);
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[96] flex items-end justify-center sm:items-center sm:px-4">
      <button
        type="button"
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 animate-fade-in bg-navy/50 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nearby-title"
        className="relative w-full animate-sheet-up rounded-t-2xl bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 text-center shadow-pop sm:max-w-sm sm:animate-scale-in sm:rounded-2xl sm:pb-6"
      >
        <button type="button" onClick={dismiss} aria-label="Close" className="icon-btn absolute right-2 top-2">
          <X className="h-5 w-5" />
        </button>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-light text-brand">
          <LocateFixed className="h-7 w-7" />
        </span>
        <h2 id="nearby-title" className="mt-3 text-lg font-bold text-ink">
          See {what} near you?
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Allow location and we&apos;ll show the nearest {what} first. You can still search any other area.
        </p>

        {status === "error" ? (
          <>
            <p role="alert" className="mt-4 rounded-lg bg-surface px-3 py-2.5 text-sm text-ink/80">
              {error}
            </p>
            <button type="button" onClick={onClose} className="btn btn-primary mt-4 w-full">
              OK
            </button>
          </>
        ) : (
          <div className="mt-5 flex flex-col gap-2">
            <button
              ref={allowRef}
              type="button"
              onClick={allow}
              disabled={status === "asking"}
              className="btn btn-primary w-full"
            >
              {status === "asking" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <LocateFixed className="h-4 w-4" />
              )}
              {status === "asking" ? "Finding you…" : "Allow location"}
            </button>
            <button type="button" onClick={dismiss} className="btn btn-ghost w-full">
              Not now
            </button>
          </div>
        )}
        <p className="mt-3 text-[11px] text-muted">Your location stays on this device.</p>
      </div>
    </div>
  );
}
