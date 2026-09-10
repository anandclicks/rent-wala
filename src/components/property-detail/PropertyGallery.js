"use client";

import { useState } from "react";
import { CameraIcon } from "./icons";

function statusBadge(property) {
  if (property?.categoryEnum === "PG") return { label: "PG / Hostel", cls: "bg-brand-dark" };
  if (property?.status === "FOR SALE") return { label: "For Sale", cls: "bg-sale" };
  return { label: "For Rent", cls: "bg-brand-dark" };
}

export default function PropertyGallery({ images, title, property }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const count = images.length;
  const badge = statusBadge(property);

  if (count === 0) return null;

  const gridImages = images.slice(1, 5);
  const remaining = Math.max(0, count - 5);

  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);

  return (
    <>
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        <div className="grid h-[260px] grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:h-[380px] lg:grid-cols-[1.55fr_1fr] lg:h-[420px]">
          <div className="relative overflow-hidden rounded-xl bg-gray-100 lg:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active]}
              alt={title}
              className="h-full w-full cursor-pointer object-cover"
              onClick={() => setLightbox(true)}
            />
            <span className={`absolute left-4 top-4 rounded-md px-3 py-1 text-xs font-bold text-white ${badge.cls}`}>
              {badge.label}
            </span>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-lg text-ink shadow-md hover:bg-white"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-lg text-ink shadow-md hover:bg-white"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
            <span className="absolute bottom-4 left-4 rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {active + 1}/{count}
            </span>
          </div>

          <div className="hidden grid-cols-2 grid-rows-2 gap-2 lg:grid">
            {gridImages.map((img, i) => {
              const idx = i + 1;
              const isLast = i === 3 && remaining > 0;
              return (
                <button
                  key={img}
                  type="button"
                  onClick={() => (isLast ? setLightbox(true) : setActive(idx))}
                  className={`relative overflow-hidden rounded-xl bg-gray-100 ${active === idx && !isLast ? "ring-2 ring-brand-dark ring-inset" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  {isLast && (
                    <span className="absolute inset-0 grid place-items-center bg-black/55 text-sm font-bold text-white">
                      +{remaining} Photos
                    </span>
                  )}
                </button>
              );
            })}
            {gridImages.length < 4 &&
              Array.from({ length: 4 - gridImages.length }).map((_, i) => (
                <div key={`ph-${i}`} className="rounded-xl bg-gray-100" />
              ))}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-2 flex gap-1.5 overflow-x-auto lg:hidden">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg ${active === i ? "ring-2 ring-brand-dark" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(false)}>
          <button type="button" onClick={() => setLightbox(false)} className="absolute right-4 top-4 text-2xl text-white">
            ×
          </button>
          {count > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-3xl text-white">‹</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-12 text-3xl text-white">›</button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[active]} alt={title} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <span className="absolute bottom-4 flex items-center gap-1.5 text-sm text-white/80">
            <CameraIcon className="h-4 w-4" />
            {active + 1} / {count}
          </span>
        </div>
      )}
    </>
  );
}
