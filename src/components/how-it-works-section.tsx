"use client";

import { useGSAP } from "@gsap/react";
import { ArrowsClockwise, CursorClick, Drop } from "@phosphor-icons/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SplitHeading } from "./split-heading";

const steps = [
  {
    icon: CursorClick,
    title: "Click any window",
    body: "Click into the window you want to work in. That's the only input Frosty needs.",
  },
  {
    icon: Drop,
    title: "The rest frost over",
    body: "Every inactive window softens to frosted glass — blurred, dimmed, quiet.",
  },
  {
    icon: ArrowsClockwise,
    title: "Switch and it follows",
    body: "Click elsewhere and the frost moves with you. No shortcut, no toggle, no menu.",
  },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope || prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-step]", scope);
      const line = scope.querySelector<HTMLElement>("[data-line]");

      gsap.set(cards, { y: 40, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope, start: "top 68%", once: true },
      });
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        tl.to(line, { scaleX: 1, duration: 0.9, ease: "power2.inOut" });
      }
      tl.to(
        cards,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.14,
        },
        line ? "-=0.65" : 0,
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="how" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-glacier-bright text-xs uppercase tracking-[0.22em]">
            How it works
          </p>
          <SplitHeading
            as="h2"
            className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
          >
            Focus in a single click.
          </SplitHeading>
          <p className="mt-5 text-balance text-ink-muted leading-relaxed">
            No setup, no rules to configure. Frosty reads which window is active
            and frosts the rest — that's the whole interaction.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            data-line
            className="absolute top-9 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-glacier/10 via-glacier-bright/50 to-glacier/10 md:block"
            aria-hidden
          />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                data-step
                className="relative rounded-2xl border border-white/8 bg-frost-pale/70 p-7 backdrop-blur-sm transition-[transform,border-color] duration-300 ease-glass hover:-translate-y-1 hover:border-glacier/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-glacier/30 bg-glacier/10 text-glacier-bright">
                    <step.icon weight="duotone" className="size-6" />
                  </span>
                  <span className="font-mono text-5xl text-frost-edge">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold text-ink text-xl tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink-muted leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
