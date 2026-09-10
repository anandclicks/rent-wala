"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [callNumber, setCallNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        setCallNumber(d.settings?.callNumber || "");
        setWhatsappNumber(d.settings?.whatsappNumber || "");
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callNumber, whatsappNumber }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setMessage("Settings saved. Call & WhatsApp buttons updated site-wide.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Site Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Configure which number visitors call or WhatsApp from property pages and the site footer.
      </p>

      <form onSubmit={save} className="mt-8 max-w-md space-y-4 rounded-2xl border border-line bg-white p-6">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">Call number</span>
          <input
            required
            value={callNumber}
            onChange={(e) => setCallNumber(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-dark"
            placeholder="+919876543210"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">WhatsApp number</span>
          <input
            required
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-brand-dark"
            placeholder="+919876543210"
          />
        </label>
        {message && (
          <p className={`text-sm ${message.includes("saved") ? "text-emerald-700" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-brand-dark px-6 py-2.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
