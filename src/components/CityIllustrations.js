import { LOGO_BLUE as B, Svg, W } from "@/components/CategoryIllustrations";

/** Delhi — India Gate. */
export function DelhiArt(props) {
  return (
    <Svg {...props}>
      <path d="M28 14a4 3 0 0 1 8 0z" fill={B} />
      <rect x="20" y="14" width="24" height="6" fill={W} />
      <rect x="16" y="20" width="32" height="4" fill={W} />
      <rect x="18" y="24" width="28" height="28" fill={W} />
      <path d="M21 28h6M37 28h6" />
      <path d="M27 52V37a5 5 0 0 1 10 0v15z" fill={B} />
      <rect x="14" y="52" width="36" height="4" fill={W} />
      <path d="M4 56h56" />
    </Svg>
  );
}

/** Gurugram — Cyber City towers. */
export function GurugramArt(props) {
  return (
    <Svg {...props}>
      <rect x="8" y="28" width="13" height="28" fill={W} />
      <path d="M11 33h7M11 38h7M11 43h7M11 48h7" />
      <path d="M23 56V14l11-7v49z" fill={W} />
      <path d="M27 14v42M31 11v45" />
      <path d="M23 26l11-4M23 40l11-3" stroke={B} strokeWidth="2.4" />
      <rect x="36" y="20" width="16" height="36" fill={W} />
      {[24, 30, 36, 42, 48].map((y) =>
        [39, 46].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="4" height="3" fill={B} stroke="none" />)
      )}
      <path d="M44 20v-5" />
      <path d="M4 56h56" />
    </Svg>
  );
}

/** Noida — twisted high-rise skyline. */
export function NoidaArt(props) {
  return (
    <Svg {...props}>
      <rect x="8" y="38" width="13" height="18" fill={W} />
      <path d="M11 43h7M11 48h7" />
      <path d="M34 6V2" />
      <path d="M26 56c-2-16 6-30 3-50h10c-3 20 5 34 3 50z" fill={W} />
      <path d="M29.5 14c3 2 6 2 9 0M28 26c4 2 9 2 13 0M27 38c5 2 10 2 15 0M26.5 48c5 2 10 2 15.5 0" stroke={B} />
      <rect x="44" y="28" width="12" height="28" fill={W} />
      <rect x="47" y="32" width="6" height="4" fill={B} />
      <rect x="47" y="40" width="6" height="4" fill={B} />
      <rect x="47" y="48" width="6" height="4" fill={B} />
      <path d="M4 56h56" />
    </Svg>
  );
}

/** Gorakhpur — Gorakhnath temple. */
export function GorakhpurArt(props) {
  return (
    <Svg {...props}>
      {/* flag + kalash */}
      <path d="M32 10V3" />
      <path d="M32 3l7 2-7 2z" fill={B} />
      <ellipse cx="32" cy="11" rx="3.5" ry="1.6" fill={B} />
      {/* main spire */}
      <path d="M24 36c0-11 4-19 8-24 4 5 8 13 8 24z" fill={W} />
      <path d="M26 30h12M25 24h14M27.5 18h9" />
      {/* side shrines */}
      <path d="M11 42c1-5 3-7 5.5-9 2.5 2 4.5 4 5.5 9z" fill={B} />
      <path d="M42 42c1-5 3-7 5.5-9 2.5 2 4.5 4 5.5 9z" fill={B} />
      <rect x="11" y="42" width="11" height="8" fill={W} />
      <rect x="42" y="42" width="11" height="8" fill={W} />
      {/* sanctum */}
      <rect x="22" y="36" width="20" height="14" fill={W} />
      <path d="M29 50v-6a3 3 0 0 1 6 0v6z" fill={B} />
      {/* plinth */}
      <rect x="8" y="50" width="48" height="6" fill={W} />
      <path d="M4 56h56" />
    </Svg>
  );
}
