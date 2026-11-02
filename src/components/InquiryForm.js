"use client";

import { useState } from "react";
import { CircleCheck, Loader2, Send } from "lucide-react";

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
      <div role="status" className="animate-scale-in rounded-xl bg-success/10 px-4 py-6 text-center">
        <CircleCheck className="mx-auto h-10 w-10 text-success" />
        <p className="mt-2 font-bold text-ink">Thank you!</p>
        <p className="mt-1 text-sm text-ink/70">
          We received your inquiry for {propertyTitle}. Our team will contact you shortly.
        </p>
      </div>
    );
  }

  const fieldClass = compact ? inputClassCompact : inputClass;

  return (
    <form onSubmit={submit} className={compact ? "space-y-3" : "space-y-4"}>
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
      {error && <p role="alert" className="animate-fade-in text-xs font-medium text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`btn btn-primary w-full ${compact ? "" : "btn-lg"}`}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Submitting..." : "Send Inquiry"}
      </button>
    </form>
  );
}

const inputClass = "input";

const inputClassCompact = "input h-10";

function Field({ label, children, compact }) {
  return (
    <label className="block">
      <span className={`block font-medium text-ink ${compact ? "mb-1 text-xs" : "mb-1.5 text-sm"}`}>{label}</span>
      {children}
    </label>
  );
}
