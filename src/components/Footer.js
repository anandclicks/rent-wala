import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { SUPPORT } from "@/components/layout/nav-config";

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
    <footer className="bg-footer-bg text-slate-300">
      <div className="container-page py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <span className="inline-flex rounded-lg bg-white px-2.5 py-1.5">
              <Logo variant="brand" asLink={false} className="!h-9" />
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              India&apos;s trusted property platform for rent, buy, PG, land &amp; commercial properties.
              Verified listings. Zero brokerage.
            </p>
            <div className="mt-5 flex gap-2">
              {["facebook", "instagram", "twitter", "youtube", "linkedin"].map((s) => (
                <Link
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-brand"
                >
                  <SocialIcon name={s} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h4>
              {col.contact ? (
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 text-brand" />
                    {SUPPORT.address}
                  </li>
                  <li>
                    <a href={`mailto:${SUPPORT.email}`} className="flex items-start gap-2.5 break-all transition hover:text-white">
                      <Mail className="mt-0.5 h-4 w-4 text-brand" />
                      {SUPPORT.email}
                    </a>
                  </li>
                  <li>
                    <a href={SUPPORT.phoneHref} className="flex items-start gap-2.5 transition hover:text-white">
                      <Phone className="mt-0.5 h-4 w-4 text-brand" />
                      {SUPPORT.phone}
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={link === "Post Property" ? "/list-your-property" : "#"}
                        className="inline-block text-sm text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-white"
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
        <div className="container-page flex flex-col items-center justify-between gap-3 pb-24 pt-5 text-sm text-slate-500 sm:flex-row lg:pb-5">
          <p>© {new Date().getFullYear()} Property Rent Wala. All rights reserved.</p>
          <div className="flex gap-5">
            {["Terms", "Privacy", "Cookies"].map((l) => (
              <Link key={l} href="#" className="transition hover:text-white">
                {l}
              </Link>
            ))}
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
