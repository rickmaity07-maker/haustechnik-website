import { site } from "@/content/site";

type Props = {
  size?: "sm" | "md" | "lg";
  variant?: "onDark" | "onLight";
  showName?: boolean;
  className?: string;
};

const sizes = {
  sm: { mark: "size-8", name: "text-[1.05rem]", gap: "gap-2.5" },
  md: { mark: "size-11", name: "text-2xl", gap: "gap-3" },
  lg: { mark: "size-16 md:size-20", name: "text-3xl md:text-[2.5rem]", gap: "gap-4 md:gap-5" },
} as const;

// Logo lockup: house outline with an integrated wrench (same mark as src/app/icon.svg) plus the wordmark.
export function Logo({ size = "sm", variant = "onDark", showName = true, className = "" }: Props) {
  const s = sizes[size];
  const ink = variant === "onDark" ? "var(--paper)" : "var(--night)";

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" className={`shrink-0 ${s.mark}`} aria-hidden>
        <path d="M5 15.5 16 6l11 9.5V27H5z" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
        <path
          d="M19.2 13.4a3.2 3.2 0 0 0-4 4l-4 4a1.3 1.3 0 0 0 1.9 1.9l4-4a3.2 3.2 0 0 0 4-4l-1.9 1.9-1.6-.3-.3-1.6z"
          fill="var(--signal)"
          stroke={variant === "onLight" ? "var(--night)" : "none"}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
      {showName && (
        <span
          className={`leading-none font-semibold tracking-[-0.03em] ${s.name} ${variant === "onDark" ? "text-white" : "text-night"}`}
        >
          {site.name}
        </span>
      )}
    </span>
  );
}
