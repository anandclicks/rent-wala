"use client";

import { useRef } from "react";

export default function Carousel({ children, className = "" }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand-dark shadow-md transition hover:bg-brand-mint lg:grid"
      >
        <ChevronIcon className="h-5 w-5 rotate-180" />
      </button>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand-dark shadow-md transition hover:bg-brand-mint lg:grid"
      >
        <ChevronIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
