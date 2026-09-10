"use client";

import { useMemo, useState } from "react";
import data from "@/data/data.json";

const PROPERTY_CATEGORIES = [
  { id: "residential", label: "Residential", desc: "Flats, houses, villas & PG" },
  { id: "commercial", label: "Commercial", desc: "Offices, shops & warehouses" },
  { id: "land", label: "Land / Plot", desc: "Residential or commercial plots" },
];

const LISTING_TYPES = {
  residential: [
    { id: "rent", label: "Rent" },
    { id: "sell", label: "Resale" },
    { id: "pg", label: "PG / Hostel" },
    { id: "flatmates", label: "Flatmates" },
  ],
  commercial: [
    { id: "rent", label: "Rent" },
    { id: "sell", label: "Resale" },
  ],
  land: [{ id: "sell", label: "Resale" }],
};

const RESIDENTIAL_TYPES = [
  "Apartment",
  "Independent House",
  "Villa",
  "Builder Floor",
  "Studio Apartment",
  "Farm House",
  "Serviced Apartment",
];

const COMMERCIAL_TYPES = [
  "Office Space",
  "Retail Shop",
  "Showroom",
  "Warehouse",
  "Industrial Shed",
  "Co-working Space",
];

const LAND_TYPES = ["Residential Plot", "Commercial Plot", "Agricultural Land"];

const BHK_OPTIONS = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const FURNISHING = ["Unfurnished", "Semi-Furnished", "Fully Furnished"];
const AMENITIES = [
  "Lift",
  "Power Backup",
  "Parking",
  "Security",
  "Gym",
  "Swimming Pool",
  "Club House",
  "Gas Pipeline",
  "Air Conditioning",
  "Internet/WiFi",
];

const INITIAL = {
  category: "",
  listingType: "",
  propertyType: "",
  city: "",
  locality: "",
  address: "",
  bhk: "",
  bathrooms: "",
  carpetArea: "",
  floor: "",
  totalFloors: "",
  furnishing: "",
  propertyAge: "",
  facing: "",
  price: "",
  deposit: "",
  maintenance: "",
  amenities: [],
  description: "",
  ownerName: "",
  mobile: "",
  email: "",
};

export default function ListPropertyForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 6;
  const listingOptions = form.category ? LISTING_TYPES[form.category] : [];
  const propertyTypes =
    form.category === "commercial"
      ? COMMERCIAL_TYPES
      : form.category === "land"
        ? LAND_TYPES
        : RESIDENTIAL_TYPES;

  const localitiesForCity = useMemo(
    () => data.localities.filter((l) => l.city === form.city),
    [form.city]
  );

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const toggleAmenity = (item) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(item)
        ? prev.amenities.filter((a) => a !== item)
        : [...prev.amenities, item],
    }));
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return form.category && form.listingType;
      case 2:
        return form.propertyType && form.city && form.locality.trim();
      case 3:
        return (
          form.carpetArea.trim() &&
          (form.category === "land" || form.bhk) &&
          form.furnishing
        );
      case 4:
        return form.price.trim() && form.ownerName.trim() && form.mobile.trim();
      case 5:
        return true;
      default:
        return false;
    }
  };

  const next = () => {
    if (!canContinue()) return;
    if (step === 5) {
      setSubmitted(true);
      return;
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const reset = () => {
    setForm(INITIAL);
    setStep(1);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-lg shadow-brand/5">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-light text-brand-dark">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-ink">Property submitted!</h2>
        <p className="mt-2 text-sm text-muted">
          Your listing is under review. Our team will verify details and publish it within 24 hours.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-darker"
        >
          Post another property
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white shadow-lg shadow-brand/5">
      <div className="border-b border-line px-6 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-dark">
              Step {step} of {totalSteps}
            </p>
            <h2 className="mt-1 text-xl font-bold text-ink">{stepTitles[step]}</h2>
          </div>
          <span className="hidden rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark sm:inline">
            100% Free · Zero Brokerage
          </span>
        </div>
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition ${
                i < step ? "bg-brand-dark" : "bg-brand-light"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8 sm:py-8">
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Property category</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {PROPERTY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      update({ category: cat.id, listingType: "", propertyType: "" })
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      form.category === cat.id
                        ? "border-brand-dark bg-brand-soft ring-2 ring-brand-dark/20"
                        : "border-line hover:border-brand/40 hover:bg-brand-soft/40"
                    }`}
                  >
                    <p className="font-bold text-ink">{cat.label}</p>
                    <p className="mt-1 text-xs text-muted">{cat.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {form.category && (
              <div>
                <p className="mb-3 text-sm font-semibold text-ink">Listing type</p>
                <div className="flex flex-wrap gap-2">
                  {listingOptions.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => update({ listingType: type.id, propertyType: "" })}
                      className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                        form.listingType === type.id
                          ? "bg-brand-dark text-white shadow-md shadow-brand-dark/25"
                          : "border border-line bg-white text-ink hover:border-brand/40"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Property type" className="sm:col-span-2">
              <select
                value={form.propertyType}
                onChange={(e) => update({ propertyType: e.target.value })}
                className={inputClass}
              >
                <option value="">Select type</option>
                {propertyTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <select
                value={form.city}
                onChange={(e) => update({ city: e.target.value, locality: "" })}
                className={inputClass}
              >
                <option value="">Select city</option>
                {data.cities.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </Field>
            <Field label="Locality / Sector">
              {localitiesForCity.length > 0 ? (
                <select
                  value={form.locality}
                  onChange={(e) => update({ locality: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select locality</option>
                  {localitiesForCity.map((l) => (
                    <option key={l.name} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={form.locality}
                  onChange={(e) => update({ locality: e.target.value })}
                  placeholder="Enter locality or sector"
                  className={inputClass}
                />
              )}
            </Field>
            <Field label="Full address" className="sm:col-span-2">
              <textarea
                rows={3}
                value={form.address}
                onChange={(e) => update({ address: e.target.value })}
                placeholder="Building name, street, landmark..."
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {form.category !== "land" && (
              <Field label="BHK / Configuration">
                <select
                  value={form.bhk}
                  onChange={(e) => update({ bhk: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select BHK</option>
                  {BHK_OPTIONS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
            )}
            {form.category !== "land" && (
              <Field label="Bathrooms">
                <select
                  value={form.bathrooms}
                  onChange={(e) => update({ bathrooms: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            <Field label="Carpet area (sq.ft)">
              <input
                type="number"
                min="0"
                value={form.carpetArea}
                onChange={(e) => update({ carpetArea: e.target.value })}
                placeholder="e.g. 1200"
                className={inputClass}
              />
            </Field>
            {form.category !== "land" && (
              <>
                <Field label="Floor no.">
                  <input
                    type="text"
                    value={form.floor}
                    onChange={(e) => update({ floor: e.target.value })}
                    placeholder="e.g. 3"
                    className={inputClass}
                  />
                </Field>
                <Field label="Total floors">
                  <input
                    type="text"
                    value={form.totalFloors}
                    onChange={(e) => update({ totalFloors: e.target.value })}
                    placeholder="e.g. 12"
                    className={inputClass}
                  />
                </Field>
              </>
            )}
            <Field label="Furnishing">
              <select
                value={form.furnishing}
                onChange={(e) => update({ furnishing: e.target.value })}
                className={inputClass}
              >
                <option value="">Select furnishing</option>
                {FURNISHING.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </Field>
            <Field label="Property age">
              <select
                value={form.propertyAge}
                onChange={(e) => update({ propertyAge: e.target.value })}
                className={inputClass}
              >
                <option value="">Select age</option>
                {["Under Construction", "0-1 years", "1-5 years", "5-10 years", "10+ years"].map(
                  (a) => (
                    <option key={a}>{a}</option>
                  )
                )}
              </select>
            </Field>
            <Field label="Facing" className="sm:col-span-2">
              <select
                value={form.facing}
                onChange={(e) => update({ facing: e.target.value })}
                className={inputClass}
              >
                <option value="">Select facing (optional)</option>
                {["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"].map(
                  (f) => (
                    <option key={f}>{f}</option>
                  )
                )}
              </select>
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={form.listingType === "sell" ? "Expected price (₹)" : "Monthly rent (₹)"}
              className="sm:col-span-2"
            >
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => update({ price: e.target.value })}
                placeholder={form.listingType === "sell" ? "e.g. 8500000" : "e.g. 25000"}
                className={inputClass}
              />
            </Field>
            {form.listingType === "rent" && (
              <>
                <Field label="Security deposit (₹)">
                  <input
                    type="number"
                    min="0"
                    value={form.deposit}
                    onChange={(e) => update({ deposit: e.target.value })}
                    placeholder="Optional"
                    className={inputClass}
                  />
                </Field>
                <Field label="Maintenance (₹/month)">
                  <input
                    type="number"
                    min="0"
                    value={form.maintenance}
                    onChange={(e) => update({ maintenance: e.target.value })}
                    placeholder="Optional"
                    className={inputClass}
                  />
                </Field>
              </>
            )}
            <Field label="Your name" className="sm:col-span-2">
              <input
                type="text"
                value={form.ownerName}
                onChange={(e) => update({ ownerName: e.target.value })}
                placeholder="Full name"
                className={inputClass}
              />
            </Field>
            <Field label="Mobile number">
              <input
                type="tel"
                value={form.mobile}
                onChange={(e) => update({ mobile: e.target.value })}
                placeholder="10-digit mobile"
                className={inputClass}
              />
            </Field>
            <Field label="Email (optional)">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="you@email.com"
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <Field label="Property description">
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update({ description: e.target.value })}
                placeholder="Highlight key features, nearby landmarks, public transport..."
                className={inputClass}
              />
            </Field>
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      form.amenities.includes(item)
                        ? "bg-brand-dark text-white"
                        : "border border-line bg-white text-ink hover:border-brand/40"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-brand/30 bg-brand-soft/50 p-4">
              <p className="text-sm font-semibold text-ink">Photos</p>
              <p className="mt-1 text-xs text-muted">
                Photo upload will be enabled after verification call. Our team will help you add
                high-quality images for better visibility.
              </p>
            </div>
            <SummaryCard form={form} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-8">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canContinue()}
          className="rounded-xl bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-dark/25 transition hover:bg-brand-darker disabled:cursor-not-allowed disabled:opacity-50"
        >
          {step === 5 ? "Submit listing" : "Continue"}
        </button>
      </div>
    </div>
  );
}

const stepTitles = {
  1: "What are you listing?",
  2: "Where is your property?",
  3: "Property details",
  4: "Pricing & contact",
  5: "Amenities & review",
  6: "Done",
};

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-dark focus:ring-2 focus:ring-brand/15";

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

function SummaryCard({ form }) {
  const rows = [
    ["Category", form.category],
    ["Listing", form.listingType],
    ["Type", form.propertyType],
    ["Location", [form.locality, form.city].filter(Boolean).join(", ")],
    ["Area", form.carpetArea ? `${form.carpetArea} sq.ft` : ""],
    ["Price", form.price ? `₹ ${Number(form.price).toLocaleString("en-IN")}` : ""],
  ].filter(([, v]) => v);

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-sm font-bold text-ink">Listing summary</p>
      <dl className="mt-3 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-sm">
            <dt className="text-muted">{k}</dt>
            <dd className="font-medium capitalize text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12l5 5L20 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
