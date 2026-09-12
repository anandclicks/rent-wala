"use client";

import { useState } from "react";

export default function InquiryForm({ propertyId, propertyTitle, compact = false }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, name, mobile, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl bg-brand-light px-4 py-6 text-center">
        <p className="font-bold text-brand-dark">Thank you!</p>
        <p className="mt-1 text-sm text-brand">
          We received your inquiry for {propertyTitle}. Our team will contact you shortly.
        </p>
      </div>
    );
  }

  const fieldClass = compact ? inputClassCompact : inputClass;

  return (
    <form onSubmit={submit} className={compact ? "space-y-2" : "space-y-3"}>
      <Field label="Name" compact={compact}>
        <input required value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} placeholder="Full name" />
      </Field>
      <Field label="Mobile" compact={compact}>
        <input
          required
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className={fieldClass}
          placeholder="10-digit mobile"
        />
      </Field>
      {!compact && (
        <>
          <Field label="Email (optional)" compact={compact}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} placeholder="you@email.com" />
          </Field>
          <Field label="Message (optional)" compact={compact}>
            <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} className={fieldClass} placeholder="I'm interested..." />
          </Field>
        </>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg bg-brand-dark text-sm font-bold text-white transition hover:bg-brand-darker disabled:opacity-60 ${compact ? "py-2" : "rounded-xl py-3"}`}
      >
        {loading ? "Submitting..." : "Send Inquiry"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand/15";

const inputClassCompact =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand/15";

function Field({ label, children, compact }) {
  return (
    <label className="block">
      <span className={`block font-semibold text-ink ${compact ? "mb-0.5 text-[10px]" : "mb-1 text-xs"}`}>{label}</span>
      {children}
    </label>
  );
}
