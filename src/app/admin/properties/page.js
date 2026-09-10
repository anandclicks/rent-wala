"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/properties")
      .then((r) => r.json())
      .then((d) => setProperties(d.properties || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const remove = async (id) => {
    if (!confirm("Delete this listing?")) return;
    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    load();
  };

  const toggleStatus = async (p) => {
    const status = p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await fetch(`/api/admin/properties/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-ink">All Listings</h1>
        <Link
          href="/admin/properties/new"
          className="rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white"
        >
          + Add Listing
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-muted">Loading...</p>
      ) : properties.length === 0 ? (
        <p className="mt-8 text-muted">No listings yet. Add your first property.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-line bg-gray-50 text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">
                    {p.title}
                    {p.featured && (
                      <span className="ml-2 rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold text-brand-dark">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {p.locality}, {p.city}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted">
                    {p.category.replace(/_/g, " ").toLowerCase()} · {p.listingType}
                  </td>
                  <td className="px-4 py-3">₹ {p.price.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        p.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {p.status === "PUBLISHED" && (
                        <Link
                          href={`/property/${p.slug}`}
                          className="text-brand-dark hover:underline"
                          target="_blank"
                        >
                          View
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleStatus(p)}
                        className="text-brand-dark hover:underline"
                      >
                        {p.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
