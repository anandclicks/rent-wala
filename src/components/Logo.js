import Link from "next/link";

function LogoMark({ className = "h-10 w-10 text-brand" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M17 36V12h8.5c5.2 0 8.5 3 8.5 7.4 0 3.4-2 6-5.4 6.8V36"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25.5" cy="19.5" r="5.5" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="25.5" cy="19.5" r="2" fill="currentColor" />
    </svg>
  );
}

function LogoVideo({ className = "" }) {
  return (
    <video
      src="/logo.webm"
      width={1239}
      height={394}
      autoPlay
      loop
      muted
      playsInline
      aria-label="Property Rent Wala"
      className={`block h-10 w-auto max-w-[10.5rem] object-contain object-left [transform:translateZ(0)] sm:h-11 sm:max-w-[11.5rem] ${className}`}
    />
  );
}

export default function Logo({ variant = "light", className = "", asLink = true }) {
  const isDark = variant === "dark";

  const content =
    variant === "brand" ? (
      <LogoVideo className={className} />
    ) : (
      <span className={`flex items-center gap-2.5 ${className}`}>
        <LogoMark className={`h-10 w-10 shrink-0 sm:h-11 sm:w-11 ${isDark ? "text-white" : "text-brand"}`} />
        <span className="leading-none">
          <span
            className={`relative block text-[1.05rem] font-extrabold tracking-tight sm:text-lg ${
              isDark ? "text-white" : "text-brand-dark"
            }`}
          >
            PROPERTY
            <span
              className={`absolute -right-3.5 -top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full text-[6px] font-bold ${
                isDark ? "bg-white/20 text-white" : "bg-brand/15 text-brand-dark"
              }`}
            >
              TM
            </span>
          </span>
          <span
            className={`mt-0.5 block text-[0.62rem] font-bold tracking-[0.22em] sm:text-[0.68rem] ${
              isDark ? "text-white/80" : "text-brand"
            }`}
          >
            RENT WALA
          </span>
        </span>
      </span>
    );

  if (!asLink) return content;

  return (
    <Link href="/" className="flex shrink-0 items-center transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}

export { LogoMark, LogoVideo };
