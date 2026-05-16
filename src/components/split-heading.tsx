"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";

interface SplitHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  id?: string;
  /** Delay before the reveal begins (seconds). */
  delay?: number;
}

/**
 * Headline whose characters stagger into place on scroll-enter. Splitting is
 * deferred until fonts load so glyphs are never split against a fallback face.
 */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  id,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      let split: SplitText | undefined;

      const run = () => {
        split = SplitText.create(el, { type: "words,chars" });
        gsap.set(split.chars, { yPercent: 60, opacity: 0 });
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          stagger: 0.016,
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      };

      if (document.fonts?.status === "loaded") {
        run();
      } else {
        document.fonts.ready.then(run);
      }

      return () => split?.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
