import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "signal" | "dark" | "ghost";
  className?: string;
};

const styles = {
  signal: "bg-signal text-night",
  dark: "bg-night text-white",
  ghost: "bg-white/10 text-white ring-1 ring-white/20",
} as const;

const iconStyles = {
  signal: "bg-night/10",
  dark: "bg-white/15",
  ghost: "bg-white/15",
} as const;

// Pill button with the arrow nested in its own circle.
export function ArrowButton({ href, children, variant = "signal", className = "" }: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex shrink-0 items-center gap-3 rounded-full whitespace-nowrap py-2 pr-2 pl-6 text-base font-medium transition-transform duration-500 ease-spring active:scale-[0.97] ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`flex size-10 items-center justify-center rounded-full transition-transform duration-500 ease-spring group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${iconStyles[variant]}`}
      >
        <ArrowUpRightIcon size={18} weight="light" aria-hidden />
      </span>
    </a>
  );
}
