import { CheckIcon } from "./icons";

export default function PropertyHighlights({ highlights }) {
  if (!highlights?.length) return null;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-base font-bold text-ink">Property Highlights</h2>
      <ul className="mt-3 space-y-2">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-dark">
              <CheckIcon className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
