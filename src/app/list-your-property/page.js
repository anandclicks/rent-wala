import Link from "next/link";
import { BadgeIndianRupee, ChevronRight, Phone, ShieldCheck, Zap } from "lucide-react";
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
    icon: BadgeIndianRupee,
  },
  {
    title: "Verified Tenants",
    desc: "Only genuine, verified buyers and tenants can reach you.",
    icon: ShieldCheck,
  },
  {
    title: "Faster Closures",
    desc: "Reach thousands of active seekers across NCR & Bangalore.",
    icon: Zap,
  },
];

const STEPS = [
  { title: "Fill the form", desc: "Share property type, location & pricing in minutes." },
  { title: "Quick verification", desc: "Our team verifies details within 24 hours." },
  { title: "Go live & connect", desc: "Get direct calls from interested tenants or buyers." },
];

export default function ListYourPropertyPage() {
  return (
    <div className="bg-surface">
      <section className="border-b border-line bg-white">
        <div className="container-page py-6 sm:py-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted">
            <Link href="/" className="transition hover:text-brand">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">Post Property</span>
          </nav>
          <span className="badge badge-featured mt-4">100% Free</span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Sell or Rent your Property{" "}
            <span className="text-brand">For Free</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
            Post your ad in minutes. No brokers, no brokerage — connect directly with genuine
            tenants and buyers across Delhi NCR, Lucknow & Bangalore.
          </p>
        </div>
      </section>

      <section className="container-page py-6 sm:py-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8 xl:grid-cols-[1fr_420px]">
          <ListPropertyForm />

          <aside className="space-y-4 lg:sticky lg:top-[8.5rem] lg:self-start">
            <div className="card-section">
              <h2 className="text-lg font-bold text-ink">Why post with us?</h2>
              <ul className="mt-4 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{b.title}</p>
                      <p className="text-xs leading-relaxed text-muted">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-brand to-brand-darker p-5 text-white sm:p-6">
              <h2 className="text-lg font-bold">How it works</h2>
              <ol className="mt-4 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-xs font-bold ring-1 ring-white/25">
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

            <div className="card-section">
              <p className="text-sm font-bold text-ink">Need help listing?</p>
              <p className="mt-1 text-xs text-muted">
                Call us Mon–Sat, 10 AM – 7 PM for assistance with your property ad.
              </p>
              <a
                href="tel:+919876543210"
                className="btn btn-secondary btn-sm mt-3"
              >
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
