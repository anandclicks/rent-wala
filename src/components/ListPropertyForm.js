"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, CircleCheck, House, ImagePlus, LandPlot, Send } from "lucide-react";
import data from "@/data/data.json";
import { categoryLabelsForGroup } from "@/data/categories";

const PROPERTY_CATEGORIES = [
  { id: "residential", label: "Residential", desc: "Rooms, flats, villas, houses & PG", icon: House },
  { id: "commercial", label: "Commercial", desc: "Co-working, offices & shops", icon: Building2 },
  { id: "land", label: "Lands / Plots", desc: "Residential or commercial plots", icon: LandPlot },
];

const LISTING_TYPES = {
  residential: [
    { id: "rent", label: "Rent" },
    { id: "sell", label: "Resale" },
    { id: "pg", label: "PG / Hostels" },
    { id: "flatmates", label: "Flatmates" },
  ],
  commercial: [
    { id: "rent", label: "Rent" },
    { id: "sell", label: "Resale" },
  ],
  land: [{ id: "sell", label: "Resale" }],
};

// Property types are the site's categories (data/categories.js), split by form group.
const RESIDENTIAL_TYPES = categoryLabelsForGroup("residential");
const COMMERCIAL_TYPES = categoryLabelsForGroup("commercial");
const LAND_TYPES = categoryLabelsForGroup("land");

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
      <div className="card animate-scale-in p-8 text-center shadow-card">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
          <CircleCheck className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-ink">Property submitted!</h2>
        <p className="mt-2 text-sm text-muted">
          Your listing is under review. Our team will verify details and publish it within 24 hours.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn btn-primary mt-6"
        >
          Post another property
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-card">
      <div className="border-b border-line px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand">
              Step {step} of {totalSteps}
            </p>
            <h2 className="mt-1 text-xl font-bold text-ink">{stepTitles[step]}</h2>
          </div>
          <span className="badge badge-success hidden normal-case tracking-normal sm:inline-flex">
            100% Free · Zero Brokerage
          </span>
        </div>
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                i < step ? "bg-brand" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>

      <div key={step} className="animate-fade-up px-5 py-6 sm:px-8 sm:py-8">
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
                    aria-pressed={form.category === cat.id}
                    className={`group cursor-pointer rounded-xl border p-4 text-left transition duration-200 active:scale-[0.98] ${
                      form.category === cat.id
                        ? "border-brand bg-brand-soft ring-4 ring-brand/10"
                        : "border-line hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
                    }`}
                  >
                    <span
                      className={`mb-3 grid h-10 w-10 place-items-center rounded-lg transition ${
                        form.category === cat.id ? "bg-brand text-white" : "bg-brand-light text-brand"
                      }`}
                    >
                      <cat.icon className="h-5 w-5" />
                    </span>
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
                      aria-pressed={form.listingType === type.id}
                      className={`chip h-10 px-5 text-sm ${form.listingType === type.id ? "chip-active" : ""}`}
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
                    aria-pressed={form.amenities.includes(item)}
                    className={`chip ${form.amenities.includes(item) ? "chip-active" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-dashed border-brand/30 bg-brand-soft p-4">
              <ImagePlus className="h-5 w-5 text-brand" />
              <div>
                <p className="text-sm font-semibold text-ink">Photos</p>
                <p className="mt-1 text-xs text-muted">
                  Photo upload will be enabled after verification call. Our team will help you add
                  high-quality images for better visibility.
                </p>
              </div>
            </div>
            <SummaryCard form={form} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="btn btn-outline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canContinue()}
          className="btn btn-primary"
        >
          {step === 5 ? "Submit listing" : "Continue"}
          {step === 5 ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
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

const inputClass = "input";

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
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
    <div className="rounded-xl border border-line bg-surface p-4">
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
