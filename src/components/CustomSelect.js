"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PANEL_MAX_HEIGHT = 260;
const PANEL_GAP = 8;
const PANEL_MIN_WIDTH = 200;

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Any",
  ariaLabel,
  variant = "default",
  align = "left",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [panelStyle, setPanelStyle] = useState({});
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const panelWidth = Math.max(rect.width, variant === "inline" ? 220 : PANEL_MIN_WIDTH);
    let left = align === "right" ? rect.right - panelWidth : rect.left;
    left = Math.max(8, Math.min(left, window.innerWidth - panelWidth - 8));

    const spaceBelow = window.innerHeight - rect.bottom - PANEL_GAP;
    const spaceAbove = rect.top - PANEL_GAP;
    const openUp = spaceBelow < PANEL_MAX_HEIGHT && spaceAbove > spaceBelow;

    const top = openUp
      ? Math.max(8, rect.top - PANEL_GAP - Math.min(PANEL_MAX_HEIGHT, spaceAbove))
      : rect.bottom + PANEL_GAP;

    setPanelStyle({
      position: "fixed",
      top,
      left,
      width: panelWidth,
      maxHeight: openUp ? Math.min(PANEL_MAX_HEIGHT, spaceAbove) : Math.min(PANEL_MAX_HEIGHT, spaceBelow),
      zIndex: 9999,
    });
  }, [align, variant]);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const label = selected?.label ?? placeholder;
  const hasValue = selected != null && selected.value !== "" && selected.value !== undefined;

  const triggerClass =
    variant === "inline"
      ? "flex w-full items-center justify-between gap-2 bg-transparent py-0.5 text-left text-sm outline-none"
      : "flex w-full items-center justify-between gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-left text-sm outline-none transition hover:border-brand/35 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/15 lg:min-w-[150px]";

  const panel =
    open && mounted
      ? createPortal(
          <ul
            ref={panelRef}
            role="listbox"
            aria-label={ariaLabel}
            style={panelStyle}
            className="overflow-y-auto rounded-xl border border-line bg-white py-1.5 shadow-xl shadow-black/10 ring-1 ring-black/5"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li key={String(opt.value)} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? "bg-brand-soft font-semibold text-brand-dark"
                        : "text-ink hover:bg-brand-soft/50"
                    }`}
                  >
                    {isSelected && <CheckIcon className="h-3.5 w-3.5 shrink-0 text-brand-dark" />}
                    <span className={isSelected ? "" : "pl-[22px]"}>{opt.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body
        )
      : null;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) requestAnimationFrame(updatePosition);
        }}
        className={triggerClass}
      >
        <span className={`truncate ${hasValue ? "font-medium text-ink" : "text-muted"}`}>{label}</span>
        <ChevronIcon
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {panel}
    </div>
  );
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
