import { cn } from "@/components/ui";
import {
  LOGO_FORE_TRACK,
  LOGO_GRADIENT_ID,
  LOGO_GRADIENT_STOPS,
  LOGO_REAR_OPACITY,
  LOGO_REAR_TRACK,
  LOGO_STROKE_WIDTH,
  LOGO_VIEWBOX
} from "@/lib/brand/logo-mark-def";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LOGO_VIEWBOX}
      fill="none"
      aria-hidden
      className={cn("h-5 w-5 shrink-0", className)}
    >
      <defs>
        <linearGradient id={LOGO_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={LOGO_GRADIENT_STOPS.from} />
          <stop offset="100%" stopColor={LOGO_GRADIENT_STOPS.to} />
        </linearGradient>
      </defs>
      <path
        d={LOGO_REAR_TRACK}
        stroke={`url(#${LOGO_GRADIENT_ID})`}
        strokeWidth={LOGO_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={LOGO_REAR_OPACITY}
      />
      <path
        d={LOGO_FORE_TRACK}
        stroke={`url(#${LOGO_GRADIENT_ID})`}
        strokeWidth={LOGO_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
