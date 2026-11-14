"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MapPin } from "lucide-react";
import { ART_CIRCLE_STYLE, CATEGORY_ART } from "@/components/CategoryIllustrations";
import { CATEGORY_SUBTYPES, PROPERTY_CATEGORIES, categoryQuery, getCategory } from "@/data/categories";

const RAIL_BG = "#e6f4fb";

function searchHref(city, category, extra = {}) {
  return `/search?${new URLSearchParams({ city, ...categoryQuery(category), ...extra }).toString()}`;
}

/**
 * Phone-only full-screen category browser (OLX style): every category in a left rail,
 * the picked category's options on the right. Opened from a city's category popup.
 */
export default function CityCategoryBrowser({ city, activeKey, onSelect, onBack, onNavigate }) {
  const backRef = useRef(null);
  const railRef = useRef(null);
  const panelRef = useRef(null);
  const category = getCategory(activeKey) || PROPERTY_CATEGORIES[0];
  const activeIndex = PROPERTY_CATEGORIES.indexOf(category);
  const subtypes = CATEGORY_SUBTYPES[category.key] || [];
  const Art = CATEGORY_ART[category.key];

  useEffect(() => {
    backRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onBack();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onBack]);

  // Keep the picked category visible in the rail and start its panel at the top.
  useEffect(() => {
    railRef.current
      ?.querySelector(`[data-key="${category.key}"]`)
      ?.scrollIntoView({ block: "center" });
    panelRef.current?.scrollTo({ top: 0 });
  }, [category.key]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-browser-title"
      className="fixed inset-0 z-[96] flex animate-fade-in flex-col bg-white md:hidden"
    >
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-line px-2">
        <button ref={backRef} type="button" onClick={onBack} aria-label="Back" className="icon-btn">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 id="category-browser-title" className="text-lg font-bold text-ink">
          Categories
        </h2>
        <span className="ml-auto mr-2 inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand">
          <MapPin className="h-3.5 w-3.5" />
          {city.name}
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        <nav aria-label="Categories" className="no-scrollbar w-[92px] shrink-0 overflow-y-auto bg-white" ref={railRef}>
          <ul className="flex min-h-full flex-col">
            {PROPERTY_CATEGORIES.map((c, i) => {
              const ItemArt = CATEGORY_ART[c.key];
              const active = i === activeIndex;
              const corner = i === activeIndex - 1 ? "rounded-br-2xl" : i === activeIndex + 1 ? "rounded-tr-2xl" : "";
              return (
                <li key={c.key} data-key={c.key}>
                  <button
                    type="button"
                    onClick={() => onSelect(c.key)}
                    aria-current={active ? "true" : undefined}
                    className={`relative flex w-full flex-col items-center gap-1 px-1.5 py-3.5 text-center outline-none ${corner}`}
                    style={{ backgroundColor: active ? "#fff" : RAIL_BG }}
                  >
                    {active && <span className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-brand" />}
                    <ItemArt
                      style={{ width: 36, height: 36 }}
                      className={active ? "text-ink" : "text-[#0b4a66]"}
                    />
                    <span
                      className={`text-[11px] leading-tight ${active ? "font-bold text-ink" : "font-medium text-ink/75"}`}
                    >
                      {c.label}
                    </span>
                  </button>
                </li>
              );
            })}
            {/* Fill the rail's tail so the last item's rounded corner sits on blue, not white. */}
            <li
              aria-hidden="true"
              className={`min-h-8 flex-1 ${activeIndex === PROPERTY_CATEGORIES.length - 1 ? "rounded-tr-2xl" : ""}`}
              style={{ backgroundColor: RAIL_BG }} />
          </ul>
        </nav>

        <section ref={panelRef} className="min-w-0 flex-1 overflow-y-auto px-3 pb-8 pt-4">
          <div className="mb-5 flex items-center gap-3">
            <h3 className="shrink-0 text-lg font-bold text-ink">{category.label}</h3>
            <span className="h-px flex-1 bg-line" />
          </div>

          <ul className="grid grid-cols-3 gap-x-1.5 gap-y-5">
            {subtypes.map((sub) => (
              <li key={sub.label}>
                <Link
                  href={searchHref(city.name, category, sub.query)}
                  onClick={onNavigate}
                  className="group flex flex-col items-center gap-2 text-center outline-none"
                >
                  <span
                    className="relative grid h-[68px] w-[68px] place-items-center rounded-full ring-1 transition group-active:scale-95 group-focus-visible:ring-4"
                    style={ART_CIRCLE_STYLE}
                  >
                    <Art style={{ width: "58%", height: "58%" }} />
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-brand px-1.5 py-0.5 text-[8.5px] font-bold uppercase leading-none tracking-wide text-white shadow-sm">
                      {sub.badge}
                    </span>
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-ink/85 group-hover:text-brand">
                    {sub.label}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={searchHref(city.name, category)}
                onClick={onNavigate}
                className="group flex flex-col items-center gap-2 text-center outline-none"
              >
                <span
                  className="grid h-[68px] w-[68px] place-items-center rounded-full ring-1 transition group-active:scale-95 group-focus-visible:ring-4"
                  style={ART_CIRCLE_STYLE}
                >
                  <ChevronRight className="h-7 w-7 text-brand" />
                </span>
                <span className="text-[11px] font-semibold leading-tight text-ink">View All</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
