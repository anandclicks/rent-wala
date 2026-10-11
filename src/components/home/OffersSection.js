import Link from "next/link";
import { OFFERS } from "@/data/home-assets";

export default function OffersSection() {
  return (
    <section className="border-b border-line bg-white py-12">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink sm:text-[1.75rem]">Offers &amp; Discounts</h2>
            <p className="mt-1 text-sm text-muted">Save more on your next stay or listing</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((offer) => (
            <Link
              key={offer.id}
              href={offer.href}
              className="group relative overflow-hidden rounded-2xl border border-line bg-brand-soft/30 p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-brand-dark px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
                {offer.badge}
              </span>
              <p className="mt-3 text-lg font-bold text-ink group-hover:text-brand-dark">{offer.title}</p>
              <p className="mt-1 text-sm text-muted">{offer.subtitle}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brand-dark">View offer →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
