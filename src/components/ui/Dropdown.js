"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight popover: click to toggle, closes on outside click, Escape,
 * or when a child calls `close`. Panel animates in with the shared scale-in.
 */
export default function Dropdown({ trigger, children, align = "left", panelClassName = "", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          className={`absolute top-full z-[60] mt-2 min-w-[220px] origin-top animate-scale-in rounded-xl border border-line bg-white p-1.5 shadow-pop ${
            align === "right" ? "right-0" : "left-0"
          } ${panelClassName}`}
        >
          {typeof children === "function" ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ as: Tag = "button", icon: Icon, active, children, className = "", ...props }) {
  return (
    <Tag
      {...(Tag === "button" ? { type: "button" } : {})}
      {...props}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
        active ? "bg-brand-soft font-semibold text-brand" : "text-ink/85 hover:bg-surface hover:text-ink"
      } ${className}`}
    >
      {Icon && <Icon className={`h-[18px] w-[18px] ${active ? "text-brand" : "text-muted"}`} />}
      {children}
    </Tag>
  );
}
