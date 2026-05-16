"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { CtaButton } from "./cta-button";
import { SplitHeading } from "./split-heading";

const rows = [
  { label: "License", value: "Lifetime, 2 Macs" },
  { label: "Updates", value: "Unlimited, forever" },
  { label: "Trial", value: "7 days, full features" },
  { label: "Requirements", value: "macOS 14 Sonoma or later" },
];

export function PricingSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const strike = scope.querySelector<HTMLElement>("[data-strike]");
      const launch = scope.querySelector<HTMLElement>("[data-launch]");
      const regular = scope.querySelector<HTMLElement>("[data-regular]");
      if (!strike || !launch || !regular) return;

      if (prefersReducedMotion()) {
        gsap.set(strike, { scaleX: 1 });
        gsap.set([launch, regular], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(strike, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([launch, regular], { opacity: 0, y: 24 });

      gsap
        .timeline({
          scrollTrigger: { trigger: scope, start: "top 70%", once: true },
        })
        .to(regular, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(
          launch,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3",
        )
        .to(strike, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "+=0.2")
        .to(launch, {
          scale: 1.06,
          duration: 0.6,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1,
        });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative bg-frost-mist px-6 py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]">
          Pricing
        </p>
        <SplitHeading
          as="h2"
          className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
        >
          One-time purchase. No subscription.
        </SplitHeading>
        <p className="mt-4 text-ink-muted">Lifetime updates, forever.</p>

        <div className="mt-10 rounded-3xl border border-white/70 bg-white p-10 shadow-[0_50px_90px_-50px_rgba(22,32,43,0.55)]">
          <div className="flex items-end justify-center gap-4">
            <span
              data-launch
              className="font-semibold text-7xl text-ink tracking-tight"
            >
              $9
            </span>
            <span className="relative inline-block pb-2" data-regular>
              <span className="font-medium text-3xl text-ink-faint">$14</span>
              <span
                data-strike
                className="absolute inset-x-0 top-1/2 block h-0.5 bg-[#ff5f57]"
              />
            </span>
          </div>
          <p className="mt-2 font-mono text-glacier-deep text-xs uppercase tracking-[0.16em]">
            Launch price
          </p>

          <dl className="mt-8 divide-y divide-frost-edge/70 text-left">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-3"
              >
                <dt className="text-ink-muted text-sm">{row.label}</dt>
                <dd className="font-medium text-ink text-sm">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div
            id="download"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <CtaButton href="#download">Start the 7-day trial</CtaButton>
            <CtaButton href="#download" variant="ghost">
              Buy Frosty
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
