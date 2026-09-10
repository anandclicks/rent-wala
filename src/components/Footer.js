import Link from "next/link";
import Logo from "@/components/Logo";

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
    title: "Contact Us",
    links: [],
    contact: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-darker text-gray-300">
      <div className="mx-auto max-w-[1400px] px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo variant="brand" asLink={false} className="!h-10" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              India&apos;s trusted property platform for rent, buy, PG, land &amp; commercial properties.
              Verified listings. Zero brokerage.
            </p>
            <div className="mt-5 flex gap-2.5">
              {["facebook", "instagram", "twitter", "youtube", "linkedin"].map((s) => (
                <Link
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand"
                >
                  <SocialIcon name={s} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white">{col.title}</h4>
              {col.contact ? (
                <ul className="mt-4 space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    B-120, Sector 63, Noida, Uttar Pradesh - 201301
                  </li>
                  <li className="flex items-start gap-2">
                    <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    support@propertyrentwala.com
                  </li>
                  <li className="flex items-start gap-2">
                    <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    +91 98765 43210
                  </li>
                </ul>
              ) : (
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={link === "Post Property" ? "/list-your-property" : "#"}
                        className="text-sm text-gray-400 transition hover:text-white"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-gray-500 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Property Rent Wala. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="#" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="transition hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name, className }) {
  const icons = {
    facebook: (
      <path d="M14 8h2.5V5.5H14c-2.2 0-3.5 1.3-3.5 3.5V10H8v2.8h2.5V20h3v-7.2H16l.5-2.8H13.5v-1.5c0-.6.5-1 1-1z" fill="currentColor" />
    ),
    instagram: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="17" cy="7" r="1" fill="currentColor" />
      </>
    ),
    twitter: (
      <path d="M18.2 7.5c-.6.3-1.3.5-2 .6.7-.4 1.2-1.1 1.5-1.9-.7.4-1.4.7-2.2.8A3.4 3.4 0 0012 9.2c0 .3 0 .6.1.9-2.8-.1-5.3-1.5-7-3.5-.3.5-.5 1.1-.5 1.8 0 1.3.7 2.4 1.7 3.1-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.3 3 3.6-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.5 2.6A6.8 6.8 0 015 17.3 9.6 9.6 0 0010.1 19c6.3 0 9.7-5.2 9.7-9.7v-.4c.7-.5 1.3-1.1 1.8-1.8z" fill="currentColor" />
    ),
    youtube: (
      <path d="M10 9.5v5l5-2.5-5-2.5zM21 8.5s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-1-2.8-.2-7-.2-7-.2s-4.2 0-7 .2c-.4.2-1.2.2-2 1-.6.6-.8 2-.8 2S1 10.1 1 11.7v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.9 1.6.2 6.8.2 6.8.2s4.2 0 7-.2c.4-.2 1.2-.2 2-1 .6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2z" fill="currentColor" />
    ),
    linkedin: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M8 10v7M8 7.5v.5M12 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      {icons[name]}
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
