import { cn } from "@/components/ui";
import {
  LOGO_CENTER_CAP,
  LOGO_CENTER_CHEVRON,
  LOGO_GRADIENT_ID,
  LOGO_GRADIENT_STOPS,
  LOGO_RIM,
  LOGO_SPOKE_BOTTOM,
  LOGO_SPOKE_LEFT,
  LOGO_SPOKE_RIGHT,
  LOGO_STROKE_WIDTH,
  LOGO_VIEWBOX
} from "@/lib/brand/logo-mark-def";

type LogoMarkProps = {
  className?: string;
};

const strokeProps = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

export function LogoMark({ className }: LogoMarkProps) {
  const gradientStroke = `url(#${LOGO_GRADIENT_ID})`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LOGO_VIEWBOX}
      fill="none"
      aria-hidden
      className={cn("h-6 w-6 shrink-0", className)}
    >
      <defs>
        <linearGradient id={LOGO_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={LOGO_GRADIENT_STOPS.from} />
          <stop offset="100%" stopColor={LOGO_GRADIENT_STOPS.to} />
        </linearGradient>
      </defs>
      <path
        d={LOGO_RIM}
        stroke={gradientStroke}
        strokeWidth={LOGO_STROKE_WIDTH}
        {...strokeProps}
      />
      <path
        d={LOGO_SPOKE_LEFT}
        stroke={gradientStroke}
        strokeWidth={LOGO_STROKE_WIDTH}
        {...strokeProps}
      />
      <path
        d={LOGO_SPOKE_RIGHT}
        stroke={gradientStroke}
        strokeWidth={LOGO_STROKE_WIDTH}
        {...strokeProps}
      />
      <path
        d={LOGO_SPOKE_BOTTOM}
        stroke={gradientStroke}
        strokeWidth={LOGO_STROKE_WIDTH}
        {...strokeProps}
      />
      <path
        d={LOGO_CENTER_CAP}
        stroke={gradientStroke}
        strokeWidth={LOGO_STROKE_WIDTH}
        {...strokeProps}
      />
      <path
        d={LOGO_CENTER_CHEVRON}
        stroke={gradientStroke}
        strokeWidth={LOGO_STROKE_WIDTH}
        strokeLinejoin="miter"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
