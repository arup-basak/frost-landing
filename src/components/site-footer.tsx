"use client";

import { useGSAP } from "@gsap/react";
import { Snowflake } from "@phosphor-icons/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const links = [
  { label: "Download for macOS", href: "#download" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" },
  { label: "Privacy", href: "#privacy" },
];

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const overlay = document.getElementById("page-frost");
      if (!overlay) return;

      // The page itself frosts over as the visitor reaches the footer.
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-frost-edge/70 border-t bg-frost-mist px-6 py-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Snowflake weight="duotone" className="mx-auto size-9 text-glacier" />
        <p className="mt-4 font-semibold text-2xl text-ink tracking-tight">
          Frosty.
        </p>
        <p className="mt-2 text-ink-muted">
          Frost everything but the window that matters.
        </p>

        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink-muted text-sm transition-colors duration-200 hover:text-glacier-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="mt-10 font-mono text-ink-faint text-xs">
          © {new Date().getFullYear()} Frosty · Made for macOS, by macOS
          standards
        </p>
      </div>
    </footer>
  );
}
