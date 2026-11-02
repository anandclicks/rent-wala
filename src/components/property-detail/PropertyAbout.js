import { Quote } from "lucide-react";

export default function PropertyAbout({ property }) {
  // Scraped descriptions arrive as HTML; show them as plain text.
  const desc = (property.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  const quote =
    property.highlights?.[1] ||
    property.highlights?.[0] ||
    "A perfect blend of comfort, convenience, and modern living.";

  return (
    <section className="card-section">
      <h2 className="text-lg font-bold text-ink">Overview</h2>
      {desc && <p className="mt-3 text-sm leading-relaxed text-ink/70">{desc}</p>}

      <blockquote className="relative mt-5 rounded-xl border-l-4 border-brand bg-brand-soft px-5 py-4 pl-12">
        <Quote className="absolute left-4 top-4 h-5 w-5 text-brand/60" aria-hidden />
        <p className="text-sm italic leading-relaxed text-ink/80">{quote}</p>
      </blockquote>
    </section>
  );
}
