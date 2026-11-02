"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { CameraIcon } from "./icons";

function statusLabel(property) {
  if (property?.categoryEnum === "PG") return "PG / Hostel";
  if (property?.status === "FOR SALE") return "For Sale";
  return "For Rent";
}

const navBtn =
  "grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/95 text-ink shadow-md transition duration-200 hover:scale-105 hover:bg-white active:scale-95";

export default function PropertyGallery({ images, title, property }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const count = images.length;

  const prev = () => setActive((i) => (i - 1 + count) % count);
  const next = () => setActive((i) => (i + 1) % count);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox, count]);

  if (count === 0) return null;

  const gridImages = images.slice(1, 5);
  const remaining = Math.max(0, count - 5);

  return (
    <>
      <div className="container-page">
        <div className="grid h-[250px] grid-cols-1 gap-2 sm:h-[380px] lg:h-[440px] lg:grid-cols-[1.6fr_1fr]">
          <div className="group relative overflow-hidden rounded-2xl bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={images[active]}
              src={images[active]}
              alt={title}
              className="h-full w-full animate-fade-in cursor-zoom-in object-cover"
              onClick={() => setLightbox(true)}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute left-4 top-4 flex gap-2">
              {property?.featured && <span className="badge badge-featured shadow-sm">Featured</span>}
              <span className="badge badge-brand shadow-sm">{statusLabel(property)}</span>
            </div>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className={`${navBtn} absolute left-4 top-1/2 -translate-y-1/2 opacity-90 lg:opacity-0 lg:group-hover:opacity-100`}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={`${navBtn} absolute right-4 top-1/2 -translate-y-1/2 opacity-90 lg:opacity-0 lg:group-hover:opacity-100`}
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <CameraIcon className="h-3.5 w-3.5" />
              {active + 1}/{count}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute bottom-4 right-4 flex h-8 cursor-pointer items-center gap-1.5 rounded-md bg-white/95 px-3 text-xs font-semibold text-ink shadow-sm transition hover:bg-white"
            >
              <Expand className="h-3.5 w-3.5" />
              View all
            </button>
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
                  aria-label={isLast ? `View all ${count} photos` : `Show photo ${idx + 1}`}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl bg-surface outline-none transition ${
                    active === idx && !isLast ? "ring-[3px] ring-brand ring-inset" : ""
                  } focus-visible:ring-4 focus-visible:ring-brand/40`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {isLast && (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 text-sm font-bold text-white transition group-hover:bg-black/65">
                      <Images className="h-5 w-5" />+{remaining} Photos
                    </span>
                  )}
                </button>
              );
            })}
            {gridImages.length < 4 &&
              Array.from({ length: 4 - gridImages.length }).map((_, i) => (
                <div key={`ph-${i}`} className="rounded-xl bg-surface" />
              ))}
          </div>
        </div>

        {count > 1 && (
          <div className="no-scrollbar mt-2 flex snap-x gap-2 overflow-x-auto lg:hidden">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`h-14 w-20 shrink-0 snap-start overflow-hidden rounded-lg transition ${
                  active === i ? "ring-2 ring-brand ring-offset-1" : "opacity-75 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photos`}
          className="fixed inset-0 z-[200] flex animate-fade-in flex-col bg-black/95"
          onClick={() => setLightbox(false)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="flex items-center gap-1.5 text-sm text-white/80">
              <CameraIcon className="h-4 w-4" />
              {active + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close gallery"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-white transition hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
            {count > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className={`${navBtn} absolute left-4 z-10`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={images[active]}
              src={images[active]}
              alt={title}
              className="max-h-[80vh] max-w-full animate-scale-in rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {count > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className={`${navBtn} absolute right-4 z-10`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
          {count > 1 && (
            <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 pb-4" onClick={(e) => e.stopPropagation()}>
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-md transition ${
                    active === i ? "ring-2 ring-white" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
