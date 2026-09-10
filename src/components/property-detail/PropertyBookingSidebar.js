"use client";

import Link from "next/link";
import { useState } from "react";
import InquiryForm from "@/components/InquiryForm";
import { CheckIcon } from "./icons";

export default function PropertyBookingSidebar({ property, layout, callHref, waHref, nearby = [] }) {
  const [showForm, setShowForm] = useState(false);
  const roomOptions = Array.isArray(property.roomOptions) ? property.roomOptions : [];
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]?.name || "");

  const selectedPrice = roomOptions.find((r) => r.name === selectedRoom)?.price ?? property.rawPrice;
  const displayPrice =
    layout.showSharing && selectedPrice
      ? `₹ ${Number(selectedPrice).toLocaleString("en-IN")}`
      : property.price;

  return (
    <div id="booking" className="space-y-4 lg:sticky lg:top-20">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
        <div className="border-b border-line p-5">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
              alt=""
              className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-mint"
            />
            <div>
              <p className="text-sm font-bold text-ink">Rahul Mehta</p>
              <p className="text-xs text-muted">Owner · Property Rent Wala</p>
            </div>
          </div>
          <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-mint px-2.5 py-1 text-[11px] font-semibold text-brand-dark">
            <CheckIcon className="h-3 w-3" />
            Verified Owner
          </span>
        </div>

        <div className="p-5">
          {showForm ? (
            <>
              <p className="mb-3 text-xs text-muted">Fill the form and we will contact you shortly.</p>
              <InquiryForm propertyId={property.id} propertyTitle={property.title} compact />
              <button type="button" onClick={() => setShowForm(false)} className="mt-3 text-xs font-semibold text-brand-dark hover:underline">
                ← Back
              </button>
            </>
          ) : (
            <>
              {layout.showSharing && roomOptions.length > 0 && (
                <div className="mb-4 space-y-2">
                  <p className="text-xs font-semibold text-ink">Select Sharing Type</p>
                  {roomOptions.map((room) => (
                    <label
                      key={room.name}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-sm ${
                        selectedRoom === room.name ? "border-brand-dark bg-brand-soft/50" : "border-line"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="sharing"
                          checked={selectedRoom === room.name}
                          onChange={() => setSelectedRoom(room.name)}
                          className="accent-brand-dark"
                        />
                        {room.name}
                      </span>
                      <span className="font-bold text-brand-dark">₹ {Number(room.price).toLocaleString("en-IN")}</span>
                    </label>
                  ))}
                </div>
              )}

              <p className="mb-4 text-xl font-bold text-brand-dark">
                {displayPrice}
                {property.priceSuffix && layout.isRent && (
                  <span className="text-sm font-medium text-muted"> {property.priceSuffix}</span>
                )}
              </p>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="flex w-full items-center justify-center rounded-xl bg-brand-dark py-3 text-sm font-bold text-white transition hover:bg-brand-darker"
                >
                  Request a Visit
                </button>
                <a
                  href={callHref}
                  className="flex w-full items-center justify-center rounded-xl border-2 border-brand-dark py-3 text-sm font-semibold text-brand-dark transition hover:bg-brand-soft"
                >
                  Call Now
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-line py-3 text-sm font-semibold text-ink transition hover:bg-brand-soft/50"
                >
                  <WhatsAppDot />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-4 rounded-lg bg-brand-mint px-3 py-2.5 text-center text-xs font-semibold text-brand-dark">
                No Brokerage — Direct contact with owner
              </div>
            </>
          )}
        </div>
      </div>

      {nearby.length > 0 && (
        <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-ink">Similar Properties by Owner</h3>
          <ul className="mt-4 space-y-3">
            {nearby.slice(0, 3).map((p) => (
              <li key={p.id}>
                <Link href={`/property/${p.slug}`} className="group flex items-center gap-3 rounded-xl p-1 transition hover:bg-brand-soft/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" className="h-14 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-ink">{p.title}</p>
                    <p className="text-xs text-muted">
                      {p.locality}, {p.city}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-brand-dark">
                      {p.price}
                      {p.priceSuffix && <span className="text-xs font-medium text-muted"> {p.priceSuffix}</span>}
                    </p>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-dark text-sm text-white opacity-0 transition group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl border border-line bg-brand-soft/50 p-5">
        <h3 className="text-sm font-bold text-ink">Ready to Move In?</h3>
        <p className="mt-1 text-xs text-muted">Schedule a visit or call the owner directly.</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex-1 rounded-xl bg-brand-dark py-2.5 text-xs font-bold text-white hover:bg-brand-darker"
          >
            Request a Visit
          </button>
          <a href={callHref} className="flex-1 rounded-xl border border-brand-dark py-2.5 text-center text-xs font-bold text-brand-dark hover:bg-white">
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

function WhatsAppDot() {
  return (
    <svg className="h-4 w-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
