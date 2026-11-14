/**
 * Visitor location for "nearest first" search results.
 * Coordinates never leave the browser: they're kept in sessionStorage and only used to sort.
 */

const COORDS_KEY = "prw-coords";
const PROMPT_KEY = "prw-nearby-prompt";

/** Great-circle distance in km between two { lat, lng } points. */
export function distanceKm(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export function formatDistance(km) {
  if (km < 1) return `${Math.max(50, Math.round((km * 1000) / 50) * 50)} m away`;
  return `${km < 10 ? km.toFixed(1) : Math.round(km)} km away`;
}

export function readSavedCoords() {
  if (typeof window === "undefined") return null;
  try {
    const c = JSON.parse(sessionStorage.getItem(COORDS_KEY) || "null");
    return Number.isFinite(c?.lat) && Number.isFinite(c?.lng) ? c : null;
  } catch {
    return null;
  }
}

function saveCoords(coords) {
  try {
    sessionStorage.setItem(COORDS_KEY, JSON.stringify(coords));
  } catch {
    // Storage blocked (private mode etc.) — sorting still works for this page view.
  }
}

/**
 * True once the visitor has answered the location prompt. "Allow" / "blocked" are remembered for good;
 * "Not now" only lasts for this visit, so the prompt comes back the next time the site is opened.
 */
export function wasNearbyPromptAnswered() {
  if (typeof window === "undefined") return true;
  try {
    const saved = localStorage.getItem(PROMPT_KEY);
    // Older builds kept "dismissed" forever; treat it as unanswered so the prompt comes back.
    return Boolean((saved && saved !== "dismissed") || sessionStorage.getItem(PROMPT_KEY));
  } catch {
    return false;
  }
}

export function markNearbyPromptAnswered(answer) {
  try {
    (answer === "dismissed" ? sessionStorage : localStorage).setItem(PROMPT_KEY, answer);
  } catch {
    // Ignore — worst case the prompt shows again next visit.
  }
}

/** Browser's location permission: "granted" | "denied" | "prompt" ("prompt" when it can't tell). */
export async function locationPermission() {
  try {
    const status = await navigator.permissions?.query({ name: "geolocation" });
    return status?.state || "prompt";
  } catch {
    return "prompt";
  }
}

/** Ask the browser for the visitor's position. Resolves { lat, lng } or rejects with a friendly message. */
export function requestCoords() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Your browser doesn't support location."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        saveCoords(coords);
        resolve(coords);
      },
      (err) => {
        reject(
          new Error(
            err.code === err.PERMISSION_DENIED
              ? "Location is blocked. You can still search any area from the search bar."
              : "Couldn't get your location. You can still search any area from the search bar."
          )
        );
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 5 * 60 * 1000 }
    );
  });
}
