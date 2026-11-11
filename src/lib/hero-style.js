/**
 * Shared by the desktop hero (app/page.js) and the phone hero (CategoryCarousel)
 * so the heading stays readable over the photo on both.
 */

/** Slight blur on the photo; scaled up so the blurred edges don't show inside the rounded card. */
export const HERO_IMAGE_SOFTEN = { filter: "blur(3px)", transform: "scale(1.05)" };

/** Dark wash over the photo, on top of the blue gradient. */
export const HERO_SHADE = { backgroundColor: "rgba(15, 23, 42, 0.35)" };
