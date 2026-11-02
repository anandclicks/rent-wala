"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Headphones, House, Mail, Plus, Search, X } from "lucide-react";
import Logo from "@/components/Logo";
import { MORE_LINKS, NAV_LINKS, SUPPORT } from "@/components/layout/nav-config";

function MenuRow({ href, icon: Icon, children, onClick, external }) {
  const content = (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-brand">
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex-1 text-[15px] font-medium text-ink">{children}</span>
      <ChevronRight className="h-5 w-5 text-muted/70 transition-transform group-hover:translate-x-0.5" />
    </>
  );
  const cls = "group flex items-center gap-3.5 rounded-xl px-3 py-3 transition hover:bg-surface active:bg-brand-soft";
  if (external) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={cls}>
      {content}
    </Link>
  );
}

function Group({ title, children }) {
  return (
    <div className="border-b border-line px-3 py-3 last:border-0">
      {title && <p className="px-3 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wider text-muted">{title}</p>}
      {children}
    </div>
  );
}

/** Slide-in drawer for small screens, list layout inspired by Housing.com's menu. */
export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-navy/50 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="absolute inset-y-0 left-0 flex w-[86%] max-w-[360px] animate-slide-in-left flex-col bg-white shadow-pop"
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <Logo variant="brand" asLink={false} />
          <button type="button" onClick={onClose} aria-label="Close menu" className="icon-btn -mr-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Link
              href="/list-your-property"
              onClick={onClose}
              className="btn btn-primary btn-lg w-full"
            >
              <Plus className="h-5 w-5" />
              Post Property — Free
            </Link>
          </div>

          <Group>
            <MenuRow href="/" icon={House} onClick={onClose}>
              Home
            </MenuRow>
            <MenuRow href="/search?listingType=RENT" icon={Search} onClick={onClose}>
              Explore all properties
            </MenuRow>
          </Group>

          <Group title="Browse">
            {NAV_LINKS.map((l) => (
              <MenuRow key={l.label} href={l.href} icon={l.icon} onClick={onClose}>
                {l.label}
              </MenuRow>
            ))}
          </Group>

          <Group title="More categories">
            {MORE_LINKS.map((l) => (
              <MenuRow key={l.label} href={l.href} icon={l.icon} onClick={onClose}>
                {l.label}
              </MenuRow>
            ))}
          </Group>

          <Group title="Help">
            <MenuRow href={SUPPORT.phoneHref} icon={Headphones} external>
              Call support · {SUPPORT.phone}
            </MenuRow>
            <MenuRow href={`mailto:${SUPPORT.email}`} icon={Mail} external>
              Email us
            </MenuRow>
          </Group>
        </div>
      </aside>
    </div>
  );
}
