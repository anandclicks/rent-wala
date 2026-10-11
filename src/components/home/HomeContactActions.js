import { SITE_CONFIG } from "@/data/properties";

export default function HomeContactActions({ variant = "hero" }) {
  const callNumber = SITE_CONFIG.callNumber || "+919876543210";
  const waDigits = (SITE_CONFIG.whatsappNumber || callNumber).replace(/\D/g, "");
  const waHref = `https://wa.me/${waDigits}?text=${encodeURIComponent("Hi, I need help finding a property on Property Rent Wala.")}`;

  const isHero = variant === "hero";
  const btnClass = isHero
    ? "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition"
    : "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition";

  return (
    <div className={`flex flex-wrap gap-3 ${isHero ? "" : "justify-center"}`}>
      <a
        href={`tel:${callNumber}`}
        className={`${btnClass} bg-white text-brand-dark shadow-md ring-1 ring-line hover:bg-brand-light`}
      >
        <PhoneIcon className="h-4 w-4" />
        Call Now
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnClass} bg-[#25D366] text-white shadow-md hover:brightness-105`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 4h3l1.2 4.5-2.2 1.2a12 12 0 005 5l1.2-2.2L19 14v3a2 2 0 01-2.2 2A15 15 0 014 6.2 2 2 0 016 4.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182a8.18 8.18 0 01-4.16-1.134l-.3-.178-2.868.858.858-2.868-.178-.3A8.182 8.182 0 1112 20.182z" />
    </svg>
  );
}
