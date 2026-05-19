import { cn } from "@/components/ui";

const GRADIENT_ID = "dealDriverApexGrad";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("h-6 w-6 shrink-0", className)}
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path
        d="M5 4v16"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth="1.75"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5 5.5 13.5 12 5 18.5"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M8.5 8 14 12 8.5 16"
        stroke={`url(#${GRADIENT_ID})`}
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
