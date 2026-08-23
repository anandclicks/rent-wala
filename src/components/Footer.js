import Link from "next/link";

const COLUMNS = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Contact Us", "Sitemap"],
  },
  {
    title: "Quick Links",
    links: ["Post Property", "My Properties", "Shortlisted Properties", "Saved Searches", "Privacy Policy"],
  },
  {
    title: "Services",
    links: ["Home Loans", "Packers & Movers", "Interior Design", "Legal Services", "Property Valuation"],
  },
  {
    title: "Help & Support",
    links: ["Help Center", "FAQs", "Terms & Conditions", "Report an Issue", "Trust & Safety"],
  },
];

const SOCIALS = ["f", "IG", "X", "YT", "in"];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-gray-300">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                </svg>
              </span>
              <span className="leading-none">
                <span className="block text-lg font-extrabold tracking-tight text-white">
                  PROPERTY
                </span>
                <span className="block text-[10px] font-semibold tracking-[0.3em] text-gray-400">
                  RENT WALA
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              India&apos;s trusted property platform for rent, buy, PG, land &amp;
              commercial properties. Verified listings. Zero brokerage.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <span
                  key={s}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-bold text-white transition hover:bg-brand"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-400 transition hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                support@propertyrentwala.com
              </li>
              <li className="flex items-start gap-2">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                B-120, Sector 63, Noida, Uttar Pradesh - 201301
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-400 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Property Rent Wala. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="transition hover:text-white">Terms</Link>
            <Link href="#" className="transition hover:text-white">Privacy</Link>
            <Link href="#" className="transition hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5c0 8 7 15 15 15l1.5-3.2-4-1.6-1.6 1.6c-2.2-1.1-4.2-3.1-5.3-5.3l1.6-1.6-1.6-4L4 5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
