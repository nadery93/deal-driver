import Image from "next/image";
import { cn } from "@/components/ui";
import { LOGO_IMAGE_HEIGHT, LOGO_IMAGE_SRC, LOGO_IMAGE_WIDTH } from "@/lib/brand/logo-mark-def";

type LogoMarkProps = {
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
};

export function LogoMark({ className, glow, style }: LogoMarkProps) {
  return (
    <Image
      src={LOGO_IMAGE_SRC}
      alt=""
      aria-hidden
      width={LOGO_IMAGE_WIDTH}
      height={LOGO_IMAGE_HEIGHT}
      style={style}
      className={cn(
        "h-6 w-6 shrink-0 object-contain",
        glow && "drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]",
        className
      )}
      priority
    />
  );
}
