"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const arrowClass =
  "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-ink shadow-card-hover transition duration-200 hover:scale-105 hover:text-brand active:scale-95 disabled:pointer-events-none disabled:opacity-0 lg:grid";

export default function Carousel({ children, className = "" }) {
  const ref = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 300), behavior: "smooth" });
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={edges.start}
        aria-label="Scroll left"
        className={`${arrowClass} -left-5`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Vertical padding keeps card hover shadows from being clipped by the scroll container */}
      <div
        ref={ref}
        onScroll={measure}
        className="no-scrollbar -mx-4 -my-3 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 py-3 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-5 lg:px-0"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={edges.end}
        aria-label="Scroll right"
        className={`${arrowClass} -right-5`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
