/** Canonical geometry for LogoMark and app/icon.svg — keep both in sync. */

export const LOGO_VIEWBOX = "0 0 24 24";

export const LOGO_GRADIENT_ID = "dealDriverWheelGrad";

export const LOGO_GRADIENT_STOPS = {
  from: "#22d3ee",
  to: "#3b82f6"
} as const;

export const LOGO_STROKE_WIDTH = 2;

/** Flat-bottom outer rim — arc over the top, flat chord at y=17.5 */
export const LOGO_RIM = "M 9.31 17.5 A 7.5 7.5 0 1 1 14.69 17.5";

export const LOGO_SPOKE_LEFT = "M 12 10.5 L 4.5 10.5";

export const LOGO_SPOKE_RIGHT = "M 12 10.5 L 19.5 10.5";

export const LOGO_SPOKE_BOTTOM = "M 12 10.5 L 12 17.5";

export const LOGO_CENTER_CAP = "M 14 10.5 A 2 2 0 1 1 10 10.5 A 2 2 0 1 1 14 10.5";

export const LOGO_CENTER_CHEVRON = "M 10.6 9.9 L 12.4 10.5 L 10.6 11.1";
