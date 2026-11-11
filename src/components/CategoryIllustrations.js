/**
 * Line-art category illustrations: dark strokes (currentColor) with logo-blue highlights.
 * All share a 64×64 canvas so they sit evenly inside the category tiles.
 */

/** Logo sky blue (sampled from /public/logo-brand.png). */
export const LOGO_BLUE = "#00adef";
const Y = LOGO_BLUE;

/** Soft circle behind every illustration: a whisper of the logo blue, not a block of it. */
export const ART_CIRCLE_STYLE = {
  backgroundColor: "#f4fafd",
  color: "#0b4a66",
  "--tw-ring-color": "#e4f3fa",
};
export const W = "#fff";

export function Svg({ children, className, style }) {
  return (
    <svg
      viewBox="0 0 64 64"
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function RoomsArt(props) {
  return (
    <Svg {...props}>
      {/* window */}
      <rect x="16" y="10" width="16" height="16" rx="1" fill={W} />
      <path d="M24 10v16M16 18h16" />
      {/* pendant lamp */}
      <path d="M48 4v10" />
      <path d="M42 20l6-6 6 6z" fill={Y} />
      {/* bed */}
      <rect x="8" y="30" width="5" height="22" rx="1" fill={W} />
      <rect x="13" y="40" width="40" height="8" rx="1.5" fill={Y} />
      <rect x="15" y="34" width="11" height="6" rx="2" fill={W} />
      <path d="M13 48h40v4M53 48v6M13 52v2" />
      <path d="M4 56h56" />
    </Svg>
  );
}

export function FlatsArt(props) {
  return (
    <Svg {...props}>
      <rect x="26" y="5" width="12" height="5" fill={W} />
      <rect x="18" y="10" width="28" height="46" fill={W} />
      <rect x="6" y="28" width="12" height="28" fill={W} />
      <rect x="46" y="22" width="12" height="34" fill={W} />
      {/* windows */}
      {[15, 23, 31, 39].map((y, r) =>
        [22, 29.5, 37].map((x, c) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" fill={(r + c) % 3 === 0 ? Y : W} />
        ))
      )}
      <path d="M9 33h6M9 39h6M9 45h6M49 27h6M49 33h6M49 39h6M49 45h6" />
      <rect x="28" y="47" width="8" height="9" fill={Y} />
      <path d="M2 56h60" />
    </Svg>
  );
}

export function CoworkingArt(props) {
  return (
    <Svg {...props}>
      {/* hanging lamps */}
      <path d="M18 4v8M46 4v8" />
      <path d="M13 17a5 5 0 0 1 10 0zM41 17a5 5 0 0 1 10 0z" fill={Y} />
      {/* laptops */}
      <rect x="9" y="26" width="17" height="11" rx="1" fill={Y} />
      <path d="M6 37h23l-2 3H8z" fill={W} />
      <rect x="38" y="26" width="17" height="11" rx="1" fill={Y} />
      <path d="M35 37h23l-2 3H37z" fill={W} />
      {/* plant */}
      <path d="M30 34h4l-1 6h-2z" fill={W} />
      <path d="M32 34c0-4-3-6-5-7M32 34c0-5 2-8 5-9M32 34v-8" />
      {/* desk */}
      <path d="M4 40h56M8 40v16M56 40v16M8 48h48" />
    </Svg>
  );
}

export function VillasArt(props) {
  return (
    <Svg {...props}>
      {/* palm */}
      <path d="M56 54V26" />
      <path d="M56 26c-3-4-8-4-10-2M56 26c3-4 7-4 8-1M56 26c-1-5-5-7-8-6M56 26c2-4 5-6 7-5" />
      {/* upper floor */}
      <rect x="18" y="16" width="28" height="14" fill={W} />
      <path d="M14 16h36" strokeWidth="2.2" />
      <rect x="22" y="20" width="10" height="7" fill={Y} />
      <rect x="35" y="20" width="7" height="7" fill={Y} />
      {/* ground floor */}
      <rect x="6" y="30" width="44" height="24" fill={W} />
      <path d="M2 30h50" strokeWidth="2.2" />
      <rect x="11" y="38" width="8" height="16" fill={Y} />
      <rect x="24" y="36" width="20" height="11" fill={W} />
      <path d="M30.5 36v11M37.5 36v11" />
      {/* pool */}
      <path d="M2 54h60" />
      <path d="M8 59c3-2 5-2 8 0s5 2 8 0 5-2 8 0" />
    </Svg>
  );
}

export function LandsArt(props) {
  return (
    <Svg {...props}>
      {/* sun + hills */}
      <circle cx="14" cy="14" r="5" fill={Y} />
      <path d="M2 34c8-8 14-8 20-3 6-6 14-8 22-2 6-3 12-2 18 2" />
      {/* plot */}
      <path d="M6 54l14-18h38L44 54z" fill={Y} fillOpacity="0.35" />
      <path d="M13 45h38M32 36l-6 18" strokeDasharray="2.5 2.5" />
      <path d="M6 54v3M44 54v3M20 36v3M58 36v3" />
      {/* flag */}
      <path d="M40 40V16" />
      <path d="M40 16l12 4-12 4z" fill={Y} />
    </Svg>
  );
}

export function PgArt(props) {
  return (
    <Svg {...props}>
      {/* bunk bed */}
      <path d="M12 8v48M52 8v48M12 14h40" />
      <rect x="12" y="22" width="40" height="6" rx="1" fill={Y} />
      <rect x="15" y="17" width="10" height="5" rx="2" fill={W} />
      <rect x="12" y="44" width="40" height="6" rx="1" fill={Y} />
      <rect x="15" y="39" width="10" height="5" rx="2" fill={W} />
      {/* ladder */}
      <path d="M42 28v16M48 28v16M42 32h6M42 36h6M42 40h6" />
      <path d="M12 50h40" />
      <path d="M4 56h56" />
    </Svg>
  );
}

export function HouseArt(props) {
  return (
    <Svg {...props}>
      <rect x="39" y="14" width="6" height="12" fill={W} />
      <rect x="14" y="30" width="36" height="24" fill={W} />
      <path d="M9 32L32 11l23 21" fill={W} />
      <path d="M14 27.5L32 11l18 16.5" fill={Y} />
      <circle cx="32" cy="23" r="3" fill={W} />
      <rect x="28" y="40" width="8" height="14" fill={Y} />
      <rect x="18" y="36" width="7" height="7" fill={W} />
      <rect x="39" y="36" width="7" height="7" fill={W} />
      <path d="M21.5 36v7M42.5 36v7" />
      {/* tree */}
      <path d="M57 54V44" />
      <circle cx="57" cy="39" r="5" fill={W} />
      <path d="M2 54h60" />
    </Svg>
  );
}

export function CommercialArt(props) {
  return (
    <Svg {...props}>
      {/* towers */}
      <rect x="6" y="16" width="16" height="40" fill={W} />
      <path d="M6 22h16M6 28h16M6 34h16M6 40h16M6 46h16" />
      <path d="M24 56V10l16-6v52z" fill={W} />
      <path d="M29 9v47M34 7v49" />
      <path d="M24 30l16-4" stroke={Y} strokeWidth="2.4" />
      {/* to-let sign */}
      <path d="M52 56V36" />
      <path d="M48 26l4-4 4 4" />
      <rect x="43" y="26" width="18" height="11" rx="1" fill={Y} />
      <path d="M47 30h10M47 33h7" />
      <path d="M2 56h60" />
    </Svg>
  );
}

export function ShopsArt(props) {
  return (
    <Svg {...props}>
      {/* signboard */}
      <rect x="18" y="5" width="28" height="8" rx="1" fill={Y} />
      <path d="M24 9h16" />
      {/* body */}
      <rect x="10" y="24" width="44" height="30" fill={W} />
      {/* awning stripes */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M${8 + i * 6} 24 l1 -8 h4 l1 8 a3 3 0 0 1 -6 0z`}
          fill={i % 2 === 0 ? Y : W}
        />
      ))}
      <path d="M9 16h46" />
      {/* window + door */}
      <rect x="15" y="34" width="20" height="12" fill={W} />
      <path d="M19 46v-5h4v5M26 46v-8h5v8" />
      <rect x="40" y="34" width="10" height="20" fill={Y} />
      <path d="M43 44h1" />
      <path d="M4 54h56" />
    </Svg>
  );
}

/** Illustration for each category key in data/categories.js. */
export const CATEGORY_ART = {
  rooms: RoomsArt,
  flats: FlatsArt,
  coworking: CoworkingArt,
  villas: VillasArt,
  lands: LandsArt,
  pg: PgArt,
  independent: HouseArt,
  commercial: CommercialArt,
  office: ShopsArt,
};
