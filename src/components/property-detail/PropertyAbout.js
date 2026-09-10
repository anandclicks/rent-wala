export default function PropertyAbout({ property }) {
  const desc = property.description || "";
  const quote =
    property.highlights?.[1] ||
    property.highlights?.[0] ||
    "A perfect blend of comfort, convenience, and modern living.";

  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <h2 className="text-lg font-bold text-ink">Overview</h2>
      {desc && <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>}

      <blockquote className="relative mt-5 rounded-xl border border-brand-mint bg-brand-mint/80 px-5 py-4 pl-12">
        <span className="absolute left-4 top-3 text-2xl leading-none text-brand/60" aria-hidden>
          &ldquo;
        </span>
        <p className="text-sm italic leading-relaxed text-brand-dark">{quote}</p>
      </blockquote>
    </section>
  );
}
