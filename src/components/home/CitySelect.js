"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ART_CIRCLE_STYLE, CATEGORY_ART } from "@/components/CategoryIllustrations";
import { DelhiArt, GorakhpurArt, GurugramArt, NoidaArt } from "@/components/CityIllustrations";
import { PROPERTY_CATEGORIES } from "@/data/categories";
import CityCategoryBrowser from "@/components/home/CityCategoryBrowser";

const CITIES = [
  { name: "Delhi", Art: DelhiArt },
  { name: "Gurugram", Art: GurugramArt },
  { name: "Noida", Art: NoidaArt },
  { name: "Gorakhpur", Art: GorakhpurArt },
];

/** Phone-only "Select City" row. Tapping a city opens a popup with every category for that city. */
export default function CitySelect() {
  const [openCity, setOpenCity] = useState(null);
  // Category picked in the city popup; when set, the full-screen category browser is shown.
  const [browseKey, setBrowseKey] = useState(null);

  const closeAll = useCallback(() => {
    setBrowseKey(null);
    setOpenCity(null);
  }, []);
  const backToCity = useCallback(() => setBrowseKey(null), []);

  // Lock page scroll while the popup or the browser is open.
  const isOpen = Boolean(openCity);
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <div className="mb-8 md:hidden">
      <h2 className="mb-3 text-lg font-bold text-ink">Select City</h2>
      <ul className="grid grid-cols-4 gap-3">
        {CITIES.map((city) => (
          <li key={city.name}>
            <button
              type="button"
              onClick={() => setOpenCity(city)}
              aria-haspopup="dialog"
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full ring-1 outline-none transition active:scale-95 focus-visible:ring-4"
              style={ART_CIRCLE_STYLE}
            >
              <city.Art style={{ width: "52%", height: "52%" }} />
              <span className="text-[11px] font-semibold leading-none text-ink">{city.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {openCity && !browseKey && (
        <CityCategoriesDialog city={openCity} onClose={closeAll} onPick={setBrowseKey} />
      )}
      {openCity && browseKey && (
        <CityCategoryBrowser
          city={openCity}
          activeKey={browseKey}
          onSelect={setBrowseKey}
          onBack={backToCity}
          onNavigate={closeAll}
        />
      )}
    </div>
  );
}

function CityCategoriesDialog({ city, onClose, onPick }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const titleId = `city-dialog-${city.name.toLowerCase()}`;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-navy/50 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-sm animate-scale-in rounded-2xl bg-white px-4 pb-6 pt-14 shadow-pop"
      >
        <span
          className="absolute left-1/2 top-0 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ring-4 ring-white"
          style={{ ...ART_CIRCLE_STYLE, "--tw-ring-color": "#fff" }}
        >
          <city.Art style={{ width: "62%", height: "62%" }} />
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="icon-btn absolute right-2 top-2"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 id={titleId} className="text-center text-base font-bold text-ink">
          Find the Best Spaces in <span className="uppercase text-brand">{city.name}</span>
        </h2>

        <ul className="mt-5 grid grid-cols-3 gap-x-2 gap-y-4">
          {PROPERTY_CATEGORIES.map((category) => {
            const Art = CATEGORY_ART[category.key];
            return (
              <li key={category.key}>
                <button
                  type="button"
                  onClick={() => onPick(category.key)}
                  className="group flex w-full cursor-pointer flex-col items-center gap-1.5 text-center outline-none"
                >
                  <span
                    className="grid h-16 w-16 place-items-center rounded-full ring-1 transition group-hover:-translate-y-0.5 group-focus-visible:ring-4"
                    style={ART_CIRCLE_STYLE}
                  >
                    <Art style={{ width: "60%", height: "60%" }} />
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-ink/80 group-hover:text-brand">
                    {category.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
