"use client";

import { useState } from "react";
import data from "@/data/data.json";

const TABS = ["Rent", "Buy", "PG", "Land", "Commercial"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Independent House", "Plot", "PG / Hostel", "Office Space"];
const PRICES = ["₹5,000", "₹10,000", "₹25,000", "₹50,000", "₹1 Lakh+"];

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState("Rent");

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:p-5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 rounded-xl bg-gray-50 p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-brand text-white shadow"
                : "text-ink hover:bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="mt-4 rounded-xl border border-line p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_auto]">
          <Field label="City">
            <div className="flex items-center gap-2">
              <PinIcon className="h-4 w-4 text-muted" />
              <input
                list="localities"
                placeholder="Enter city or locality"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
              <SearchIcon className="h-4 w-4 text-muted" />
            </div>
            <datalist id="localities">
              {data.localities.map((l) => (
                <option key={l.name} value={`${l.name}, ${l.city}`} />
              ))}
            </datalist>
          </Field>

          <Field label="Property Type">
            <select className="w-full bg-transparent text-sm text-ink outline-none">
              <option value="">Select property type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Min Price">
            <select className="w-full bg-transparent text-sm text-ink outline-none">
              <option value="">Min Price</option>
              {PRICES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>

          <Field label="Max Price">
            <select className="w-full bg-transparent text-sm text-ink outline-none">
              <option value="">Max Price</option>
              {PRICES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>

          <div className="flex items-end">
            <button className="flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark lg:w-auto">
              <SearchIcon className="h-4 w-4" />
              <span className="whitespace-nowrap">Search Properties</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popular searches */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-ink">Popular Searches:</span>
        {data.popularSearches.map((term) => (
          <button
            key={term}
            className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted transition hover:border-brand hover:text-brand"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <div className="rounded-lg border border-line px-3 py-2.5">{children}</div>
    </label>
  );
}
