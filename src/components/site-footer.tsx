"use client";

import { SnowflakeIcon } from "@phosphor-icons/react";
import Link from "next/link";

const links = [
  { label: "Download", href: "#download" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#support" },
  { label: "Privacy", href: "#privacy" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-white/8 border-t bg-frost-mist px-6 py-20">
      <div
        className="haze-blob -translate-x-1/2 pointer-events-none absolute top-0 left-1/2 size-[34rem] rounded-full bg-glacier/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <SnowflakeIcon
          weight="duotone"
          className="mx-auto size-9 text-glacier-bright"
        />
        <p className="mt-4 font-semibold text-2xl text-ink tracking-tight">
          Frosty
        </p>
        <p className="mt-2 text-ink-muted">
          Blur every window but the one that matters.
        </p>

        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-muted text-sm transition-colors duration-200 hover:text-glacier-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-10 font-mono text-ink-faint text-xs">
          © {new Date().getFullYear()} Frosty · Made for macOS
        </p>
      </div>
    </footer>
  );
}
