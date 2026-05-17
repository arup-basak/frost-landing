import Link from "next/link";
import type { ReactNode } from "react";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-[15px] transition-[transform,box-shadow,background-color] duration-300 ease-glass will-change-transform hover:-translate-y-0.5 active:translate-y-0";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#7fc8ef_0%,#5b9fc9_55%,#4f86c6_100%)] text-[#06121d] shadow-[0_0_0_1px_rgba(127,200,239,0.4),0_14px_40px_-10px_rgba(127,200,239,0.55)] hover:shadow-[0_0_0_1px_rgba(127,200,239,0.6),0_20px_50px_-10px_rgba(127,200,239,0.75)]",
  ghost:
    "border border-frost-edge bg-frost-pale/60 text-ink backdrop-blur-sm hover:border-glacier/60 hover:bg-frost-pale",
} as const;

export function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
