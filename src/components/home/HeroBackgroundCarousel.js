"use client";

import { useEffect, useState } from "react";
import { HERO_SLIDES } from "@/data/home-assets";

export default function HeroBackgroundCarousel({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 1000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className={`relative h-full min-h-[220px] w-full overflow-hidden rounded-2xl bg-brand-soft sm:min-h-[280px] lg:min-h-full ${className}`}>
      {HERO_SLIDES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}
