import { cn } from "@/components/ui";
import { LogoMark } from "@/components/brand/logo-mark";

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8"
} as const;

type LogoProps = {
  showText?: boolean;
  size?: keyof typeof sizeClasses;
  iconSize?: number;
  className?: string;
  iconClassName?: string;
  glow?: boolean;
};

export function Logo({ showText = false, size = "md", iconSize, className, iconClassName, glow }: LogoProps) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2 sm:gap-3", className)}>
      <LogoMark
        glow={glow}
        className={cn(!iconSize && sizeClasses[size], iconClassName)}
        style={iconSize ? { width: iconSize, height: iconSize } : undefined}
      />
      {showText ? (
        <span className="hidden whitespace-nowrap sm:inline">
          <span className="font-bold tracking-wide text-white">Deal</span>{" "}
          <span className="font-normal tracking-wide text-white/85">Driver</span>
        </span>
      ) : null}
    </span>
  );
}
