"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SplitHeading } from "./split-heading";

const thumbs = [
  { top: "4%", left: "6%", rot: -9, label: "slack" },
  { top: "10%", left: "78%", rot: 11, label: "figma" },
  { top: "2%", left: "42%", rot: 4, label: "mail" },
  { top: "26%", left: "2%", rot: 7, label: "terminal" },
  { top: "30%", left: "86%", rot: -8, label: "music" },
  { top: "52%", left: "8%", rot: -5, label: "notes" },
  { top: "58%", left: "82%", rot: 9, label: "calendar" },
  { top: "78%", left: "4%", rot: 8, label: "safari" },
  { top: "84%", left: "70%", rot: -11, label: "linear" },
  { top: "72%", left: "44%", rot: 5, label: "messages" },
  { top: "88%", left: "30%", rot: -6, label: "preview" },
  { top: "16%", left: "22%", rot: 10, label: "xcode" },
];

function Thumb({ label }: { label: string }) {
  return (
    <div className="relative w-24 overflow-hidden rounded-md border border-white/10 bg-frost-pale shadow-[0_12px_28px_-12px_rgba(0,0,0,0.8)] sm:w-28">
      <div className="flex h-4 items-center gap-1 border-white/8 border-b bg-[#1a232e] px-2">
        <span className="size-1.5 rounded-full bg-[#ff5f57]" />
        <span className="size-1.5 rounded-full bg-[#febc2e]" />
        <span className="size-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-1 font-mono text-[7px] text-ink-faint">
          {label}
        </span>
      </div>
      <div className="h-14 bg-gradient-to-br from-[#161e28] to-[#11181f] p-1.5">
        <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
        <div className="mt-1 h-1.5 w-1/2 rounded-full bg-white/10" />
      </div>
      <div
        data-thumb-frost
        className="absolute inset-0 bg-glacier/15 backdrop-blur-[4px]"
        style={{ opacity: 0 }}
      />
    </div>
  );
}

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-thumb]", scope);
      const frosts = gsap.utils.toArray<HTMLElement>(
        "[data-thumb-frost]",
        scope,
      );
      if (items.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(frosts, { opacity: 1 });
        return;
      }

      gsap.from(items, {
        opacity: 0,
        scale: 0.6,
        x: () => gsap.utils.random(-120, 120),
        y: () => gsap.utils.random(-80, 80),
        rotation: () => gsap.utils.random(-40, 40),
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.05, from: "random" },
        scrollTrigger: { trigger: scope, start: "top 70%", once: true },
      });

      gsap.to(frosts, {
        opacity: 1,
        ease: "none",
        stagger: { each: 0.04, from: "random" },
        scrollTrigger: {
          trigger: scope,
          start: "center 60%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28">
      <div className="relative mx-auto h-[34rem] max-w-5xl sm:h-[36rem]">
        {thumbs.map((t) => (
          <div
            key={t.label}
            data-thumb
            className="absolute hidden md:block"
            style={{
              top: t.top,
              left: t.left,
              transform: `rotate(${t.rot}deg)`,
            }}
          >
            <Thumb label={t.label} />
          </div>
        ))}

        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-full max-w-xl rounded-2xl border border-white/10 bg-frost-mist/90 p-8 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-10">
          <p className="mb-4 font-mono text-glacier-bright text-xs uppercase tracking-[0.22em]">
            The problem
          </p>
          <SplitHeading
            as="h2"
            className="text-balance font-semibold text-3xl text-ink leading-tight tracking-tight sm:text-[2.6rem]"
          >
            Twelve windows open. One is the work.
          </SplitHeading>
          <p className="mt-5 text-balance text-ink-muted leading-relaxed">
            Slack, a stale Figma tab, a terminal you forgot you opened — every
            inactive window quietly competes for your attention.
          </p>
          <p className="mt-4 font-medium text-glacier-bright text-lg">
            Frosty puts the noise behind glass.
          </p>
        </div>
      </div>
    </section>
  );
}
