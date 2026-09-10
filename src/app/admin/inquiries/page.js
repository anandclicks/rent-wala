"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((r) => r.json())
      .then((d) => setInquiries(d.inquiries || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Property Inquiries</h1>
      <p className="mt-1 text-sm text-muted">Leads from interested buyers and tenants.</p>

      {loading ? (
        <p className="mt-8 text-muted">Loading...</p>
      ) : inquiries.length === 0 ? (
        <p className="mt-8 text-muted">No inquiries yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {inquiries.map((inq) => (
            <article key={inq.id} className="rounded-2xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-ink">{inq.name}</p>
                  <p className="text-sm text-muted">
                    +91 {inq.mobile}
                    {inq.email ? ` · ${inq.email}` : ""}
                  </p>
                </div>
                <time className="text-xs text-muted">
                  {new Date(inq.createdAt).toLocaleString("en-IN")}
                </time>
              </div>
              {inq.property && (
                <p className="mt-2 text-sm">
                  Property:{" "}
                  <Link
                    href={`/property/${inq.property.slug}`}
                    className="font-semibold text-brand-dark hover:underline"
                  >
                    {inq.property.title}
                  </Link>{" "}
                  ({inq.property.locality}, {inq.property.city})
                </p>
              )}
              {inq.message && (
                <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-muted">{inq.message}</p>
              )}
              <a
                href={`tel:+91${inq.mobile}`}
                className="mt-3 inline-block text-sm font-semibold text-brand-dark hover:underline"
              >
                Call lead →
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
