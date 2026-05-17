"use client";

import { useGSAP } from "@gsap/react";
import { SnowflakeIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const bar = ref.current?.querySelector("[data-bar]");
      if (!bar) return;
      gsap.to(bar, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          start: "top -90",
          end: "+=1",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50">
      <div
        data-bar
        className="absolute inset-0 border-white/8 border-b bg-background/80 backdrop-blur-xl"
        style={{ opacity: 0 }}
      />
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="#top"
          className="flex items-center gap-2 font-semibold text-ink text-lg tracking-tight"
        >
          <SnowflakeIcon
            weight="duotone"
            className="size-6 text-glacier-bright"
          />
          Frosty
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-muted text-sm transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="#download"
          className="rounded-full bg-[linear-gradient(135deg,#7fc8ef,#5b9fc9)] px-5 py-2 font-semibold text-[#06121d] text-sm shadow-[0_0_24px_-6px_rgba(127,200,239,0.7)] transition-transform duration-300 ease-glass hover:-translate-y-0.5"
        >
          Download
        </Link>
      </nav>
    </header>
  );
}
