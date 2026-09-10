"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORIES = [
  "APARTMENT",
  "VILLA",
  "INDEPENDENT_HOUSE",
  "BUILDER_FLOOR",
  "PG",
  "COMMERCIAL",
  "LAND",
  "STUDIO",
  "PENTHOUSE",
];

const emptyForm = {
  title: "",
  description: "",
  category: "APARTMENT",
  listingType: "RENT",
  city: "",
  locality: "",
  address: "",
  price: "",
  beds: "",
  baths: "",
  areaSqft: "",
  furnishing: "",
  suitableFor: "",
  badges: "",
  amenities: "",
  images: "",
  roomOptionsJson: "",
  availability: "Ready to Move",
  featureTags: "",
  highlights: "",
  nearbyLocationsJson: "",
  featured: false,
  verified: true,
  status: "PUBLISHED",
};

export default function NewPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let roomOptions;
    let nearbyLocations;
    if (form.category === "PG" && form.roomOptionsJson.trim()) {
      try {
        roomOptions = JSON.parse(form.roomOptionsJson);
      } catch {
        setError("Room options must be valid JSON array");
        setLoading(false);
        return;
      }
    }
    if (form.nearbyLocationsJson.trim()) {
      try {
        nearbyLocations = JSON.parse(form.nearbyLocationsJson);
      } catch {
        setError("Nearby locations must be valid JSON array");
        setLoading(false);
        return;
      }
    }

    const payload = {
      title: form.title,
      description: form.description || undefined,
      category: form.category,
      listingType: form.listingType,
      city: form.city,
      locality: form.locality,
      address: form.address || undefined,
      price: Number(form.price),
      beds: form.beds ? Number(form.beds) : null,
      baths: form.baths ? Number(form.baths) : null,
      areaSqft: form.areaSqft ? Number(form.areaSqft) : null,
      furnishing: form.furnishing || undefined,
      suitableFor: form.suitableFor || undefined,
      badges: form.badges
        ? form.badges.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      amenities: form.amenities
        ? form.amenities.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      images: form.images
        ? form.images.split("\n").map((s) => s.trim()).filter(Boolean)
        : [],
      roomOptions: form.category === "PG" ? roomOptions : undefined,
      availability: form.availability || undefined,
      featureTags: form.featureTags
        ? form.featureTags.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      highlights: form.highlights
        ? form.highlights.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      nearbyLocations,
      featured: form.featured,
      verified: form.verified,
      status: form.status,
    };

    try {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create");
      router.push("/admin/properties");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/admin/properties" className="text-sm font-semibold text-brand-dark hover:underline">
        ← Back to listings
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-ink">Add New Listing</h1>
      <p className="mt-1 text-sm text-muted">
        PG, Villa, Independent House, Commercial — rent or sell. Published listings appear on the
        website.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-6 rounded-2xl border border-line bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title *">
            <input required value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Price (₹) *">
            <input required type="number" value={form.price} onChange={(e) => set("price", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Category *">
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Listing type *">
            <select value={form.listingType} onChange={(e) => set("listingType", e.target.value)} className={inputClass}>
              <option value="RENT">Rent</option>
              <option value="SELL">Sell</option>
            </select>
          </Field>
          <Field label="City *">
            <input required value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass} placeholder="Noida" />
          </Field>
          <Field label="Locality *">
            <input required value={form.locality} onChange={(e) => set("locality", e.target.value)} className={inputClass} placeholder="Sector 62" />
          </Field>
          <Field label="Beds (BHK count)">
            <input type="number" value={form.beds} onChange={(e) => set("beds", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Baths">
            <input type="number" value={form.baths} onChange={(e) => set("baths", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Area (Sq.Ft)">
            <input type="number" value={form.areaSqft} onChange={(e) => set("areaSqft", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Furnishing">
            <input value={form.furnishing} onChange={(e) => set("furnishing", e.target.value)} className={inputClass} placeholder="Semi-Furnished" />
          </Field>
          {form.category === "PG" && (
            <Field label="Suitable for (PG)">
              <input value={form.suitableFor} onChange={(e) => set("suitableFor", e.target.value)} className={inputClass} placeholder="Unisex" />
            </Field>
          )}
          <Field label="Availability">
            <input value={form.availability} onChange={(e) => set("availability", e.target.value)} className={inputClass} placeholder="Ready to Move" />
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputClass}>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>
          </Field>
        </div>

        <Field label="Address">
          <input value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass} />
        </Field>

        <Field label="Description">
          <textarea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className={inputClass} />
        </Field>

        <Field label="Badges (comma separated)">
          <input value={form.badges} onChange={(e) => set("badges", e.target.value)} className={inputClass} placeholder="FEATURED, VERIFIED, POPULAR" />
        </Field>

        <Field label="Amenities (comma separated)">
          <input value={form.amenities} onChange={(e) => set("amenities", e.target.value)} className={inputClass} placeholder="Wi-Fi, Meals, Parking, Gym" />
        </Field>

        <Field label="Feature tags for About section (comma separated)">
          <input value={form.featureTags} onChange={(e) => set("featureTags", e.target.value)} className={inputClass} placeholder="All Meals Included, High-Speed Wi-Fi" />
        </Field>

        <Field label="Highlights (comma separated)">
          <input value={form.highlights} onChange={(e) => set("highlights", e.target.value)} className={inputClass} placeholder="Close to Metro, No Brokerage" />
        </Field>

        <Field label="Nearby locations (JSON array)">
          <textarea
            rows={3}
            value={form.nearbyLocationsJson}
            onChange={(e) => set("nearbyLocationsJson", e.target.value)}
            className={inputClass}
            placeholder='[{"name":"Amity University","distance":"6.8 km"}]'
          />
        </Field>

        <Field label="Image URLs (one per line)">
          <textarea rows={3} value={form.images} onChange={(e) => set("images", e.target.value)} className={inputClass} placeholder="https://..." />
        </Field>

        {form.category === "PG" && (
          <Field label="PG Room options (JSON array)">
            <textarea
              rows={4}
              value={form.roomOptionsJson}
              onChange={(e) => set("roomOptionsJson", e.target.value)}
              className={inputClass}
              placeholder='[{"name":"Private Room","price":12899,"image":"https://...","furniture":["Bed","Wardrobe"]}]'
            />
          </Field>
        )}

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={form.verified} onChange={(e) => set("verified", e.target.checked)} />
            Verified badge
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-dark px-8 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "Saving..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand/15";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
