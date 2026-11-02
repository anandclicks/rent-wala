"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarCheck, ChevronRight, Phone, ShieldCheck, Star } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import { CheckIcon } from "./icons";

/** Hash the mobile contact bar links to; opening it reveals the inquiry form. */
export const ENQUIRE_HASH = "#enquire";

export default function PropertyBookingSidebar({ property, layout, callHref, waHref, nearby = [] }) {
  const [showForm, setShowForm] = useState(false);
  const roomOptions = Array.isArray(property.roomOptions) ? property.roomOptions : [];
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]?.name || "");

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash !== ENQUIRE_HASH) return;
      setShowForm(true);
      // Clear the hash so tapping "Enquire" again still triggers.
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const selectedPrice = roomOptions.find((r) => r.name === selectedRoom)?.price ?? property.rawPrice;
  const displayPrice =
    layout.showSharing && selectedPrice
      ? `₹ ${Number(selectedPrice).toLocaleString("en-IN")}`
      : property.price;

  return (
    <div id="booking" className="scroll-mt-32 space-y-4 lg:sticky lg:top-[8.5rem]">
      <div id="enquire" className="card scroll-mt-32 overflow-hidden shadow-card">
        <div className="border-b border-line p-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Posted by</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
                alt=""
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-card"
              />
              <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand text-white ring-2 ring-white">
                <CheckIcon className="h-3 w-3" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">Rahul Mehta</p>
              <p className="text-xs text-muted">Owner · Property Rent Wala</p>
            </div>
            <span className="flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs font-semibold text-ink">
              <Star className="h-3.5 w-3.5 fill-current text-accent-dark" />
              4.8
            </span>
          </div>
          <span className="badge badge-success mt-3 normal-case tracking-normal">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Owner
          </span>
        </div>

        <div className="p-5">
          {showForm ? (
            <div className="animate-fade-up">
              <p className="mb-3 text-sm font-semibold text-ink">Request a visit</p>
              <p className="mb-4 text-xs text-muted">Fill the form and we will contact you shortly.</p>
              <InquiryForm propertyId={property.id} propertyTitle={property.title} compact />
              <button type="button" onClick={() => setShowForm(false)} className="link mt-3 text-xs">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            </div>
          ) : (
            <>
              {layout.showSharing && roomOptions.length > 0 && (
                <fieldset className="mb-4 space-y-2">
                  <legend className="mb-2 text-xs font-semibold text-ink">Select Sharing Type</legend>
                  {roomOptions.map((room) => (
                    <label
                      key={room.name}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition duration-200 ${
                        selectedRoom === room.name
                          ? "border-brand bg-brand-soft ring-2 ring-brand/10"
                          : "border-line hover:border-slate-300"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sharing"
                          checked={selectedRoom === room.name}
                          onChange={() => setSelectedRoom(room.name)}
                          className="h-4 w-4 accent-brand"
                        />
                        {room.name}
                      </span>
                      <span className="font-bold text-ink">₹ {Number(room.price).toLocaleString("en-IN")}</span>
                    </label>
                  ))}
                </fieldset>
              )}

              <p className="mb-4 text-2xl font-extrabold tracking-tight text-ink">
                {displayPrice}
                {property.priceSuffix && layout.isRent && (
                  <span className="text-sm font-medium text-muted"> {property.priceSuffix}</span>
                )}
              </p>

              <div className="space-y-2.5">
                <button type="button" onClick={() => setShowForm(true)} className="btn btn-primary btn-lg w-full">
                  <CalendarCheck className="h-[18px] w-[18px]" />
                  Request a Visit
                </button>
                <a href={callHref} className="btn btn-outline-brand btn-lg w-full">
                  <Phone className="h-[18px] w-[18px]" />
                  Call Now
                </a>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg w-full">
                  <WhatsAppGlyph className="h-[18px] w-[18px]" />
                  Chat on WhatsApp
                </a>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-success/10 px-3 py-2.5 text-center text-xs font-semibold text-success">
                <ShieldCheck className="h-4 w-4" />
                No Brokerage — Direct contact with owner
              </p>
            </>
          )}
        </div>
      </div>

      {nearby.length > 0 && (
        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink">Similar Properties by Owner</h3>
          <ul className="mt-3 space-y-1">
            {nearby.slice(0, 3).map((p) => (
              <li key={p.id}>
                <Link
                  href={`/property/${p.slug}`}
                  className="group -mx-2 flex items-center gap-3 rounded-xl p-2 transition hover:bg-surface"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" className="h-14 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-ink transition group-hover:text-brand">{p.title}</p>
                    <p className="line-clamp-1 text-xs text-muted">
                      {p.locality}, {p.city}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-ink">
                      {p.price}
                      {p.priceSuffix && <span className="text-xs font-medium text-muted"> {p.priceSuffix}</span>}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted transition group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="card bg-brand-soft p-5">
        <h3 className="text-sm font-bold text-ink">Ready to Move In?</h3>
        <p className="mt-1 text-xs text-muted">Schedule a visit or call the owner directly.</p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => setShowForm(true)} className="btn btn-primary btn-sm flex-1">
            Request a Visit
          </button>
          <a href={callHref} className="btn btn-outline-brand btn-sm flex-1">
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

export function WhatsAppGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
