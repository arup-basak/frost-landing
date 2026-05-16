"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger between `[data-reveal]` children, in seconds. */
  stagger?: number;
  start?: string;
}

/**
 * Fades and lifts every descendant marked `data-reveal` into place on
 * scroll-enter. Sections opt elements in by tagging them with `data-reveal`.
 */
export function Reveal({
  children,
  className = "",
  stagger = 0.08,
  start = "top 82%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
      if (items.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { y: 30, opacity: 0 });
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: scope, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
