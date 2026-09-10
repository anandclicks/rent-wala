import Link from "next/link";
import ListPropertyForm from "@/components/ListPropertyForm";

export const metadata = {
  title: "List Your Property — Property Rent Wala",
  description:
    "Post your property for rent or sale for free. Zero brokerage, verified tenants, and fast listing on Property Rent Wala.",
};

const BENEFITS = [
  {
    title: "Zero Brokerage",
    desc: "List for free — no agent commission, no hidden charges.",
    icon: "tag",
  },
  {
    title: "Verified Tenants",
    desc: "Only genuine, verified buyers and tenants can reach you.",
    icon: "shield",
  },
  {
    title: "Faster Closures",
    desc: "Reach thousands of active seekers across NCR & Bangalore.",
    icon: "bolt",
  },
];

const STEPS = [
  { title: "Fill the form", desc: "Share property type, location & pricing in minutes." },
  { title: "Quick verification", desc: "Our team verifies details within 24 hours." },
  { title: "Go live & connect", desc: "Get direct calls from interested tenants or buyers." },
];

export default function ListYourPropertyPage() {
  return (
    <div className="bg-brand-soft/40">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-8 lg:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition hover:text-brand-darker"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Sell or Rent your Property{" "}
            <span className="text-brand-dark">For Free</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Post your ad in minutes. No brokers, no brokerage — connect directly with genuine
            tenants and buyers across Delhi NCR, Lucknow & Bangalore.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">
          <ListPropertyForm />

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-ink">Why post with us?</h2>
              <ul className="mt-4 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-light text-brand-dark">
                      <BenefitIcon name={b.icon} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{b.title}</p>
                      <p className="text-xs leading-relaxed text-muted">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-dark p-6 text-white">
              <h2 className="text-lg font-bold">How it works</h2>
              <ol className="mt-4 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="text-xs text-white/80">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-ink">Need help listing?</p>
              <p className="mt-1 text-xs text-muted">
                Call us Mon–Sat, 10 AM – 7 PM for assistance with your property ad.
              </p>
              <a
                href="tel:+919876543210"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark"
              >
                <PhoneIcon className="h-4 w-4" />
                +91 98765 43210
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function BenefitIcon({ name }) {
  const c = "h-5 w-5";
  if (name === "shield") {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "bolt") {
    return (
      <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12V5a1 1 0 011-1h7l8 8-8 8-8-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5c0 8 7 15 15 15l1.5-3.2-4-1.6-1.6 1.6c-2.2-1.1-4.2-3.1-5.3-5.3l1.6-1.6-1.6-4L4 5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
