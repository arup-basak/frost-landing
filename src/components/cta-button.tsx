import type { ReactNode } from "react";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-[15px] transition-[transform,background-color,box-shadow] duration-300 ease-glass will-change-transform hover:-translate-y-0.5 active:translate-y-0";

const variants = {
  primary:
    "bg-glacier-deep text-frost-mist shadow-[0_14px_30px_-12px_rgba(40,88,116,0.7)] hover:bg-glacier hover:shadow-[0_18px_36px_-12px_rgba(40,88,116,0.8)]",
  ghost:
    "border border-frost-edge bg-white/60 text-ink backdrop-blur-sm hover:border-glacier/50 hover:bg-white",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
