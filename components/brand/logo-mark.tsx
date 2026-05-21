import { cn } from "@/components/ui";
import {
  LOGO_ARROW,
  LOGO_HUB,
  LOGO_SPOKE_BOTTOM,
  LOGO_SPOKE_LEFT,
  LOGO_SPOKE_RIGHT,
  LOGO_VIEWBOX,
  LOGO_WHEEL
} from "@/lib/brand/logo-mark-def";

type LogoMarkProps = {
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
};

const paths = [
  LOGO_WHEEL,
  LOGO_ARROW,
  LOGO_HUB,
  LOGO_SPOKE_LEFT,
  LOGO_SPOKE_RIGHT,
  LOGO_SPOKE_BOTTOM
] as const;

export function LogoMark({ className, glow, style }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LOGO_VIEWBOX}
      fill="none"
      aria-hidden
      style={style}
      className={cn(
        "h-6 w-6 shrink-0",
        glow && "drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]",
        className
      )}
    >
      {paths.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
