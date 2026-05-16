"use client";

import { useGSAP } from "@gsap/react";
import {
  BookOpen,
  Brain,
  Broadcast,
  Code,
  Target,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

const useCases = [
  {
    icon: Target,
    title: "Deep work",
    body: "You have ninety minutes and one document. Frosty makes the document the only thing you can really see. The rest of the desktop is still there — Slack, Mail, Linear — but visually quiet enough that your eyes stop drifting to them every forty seconds.",
  },
  {
    icon: Code,
    title: "Coding with intent",
    body: "Writing the function in your editor while your terminal, browser, and Notion docs frost gently behind it is a different experience from staring into a wall of equally-bright windows. The active editor pops. Context-switching becomes a deliberate act instead of an accidental one.",
  },
  {
    icon: Brain,
    title: "ADHD-aware workflows",
    body: "For minds that have a hard time choosing what to attend to, Frosty makes the choice visually obvious. The bright, sharp window is the one you're in. Everything else is recognizably not now — the closest thing many users have found to a 'quiet room' mode for their screen.",
  },
  {
    icon: Broadcast,
    title: "Screen sharing without panic",
    body: "About to share your screen and realised you have a Notion doc with a half-written resignation letter, six personal tabs, and an unsent text in iMessage? Activate the deck you're presenting. Everything else frosts into legibility-free softness. Your audience sees the active window — nothing else is readable.",
  },
  {
    icon: BookOpen,
    title: "Reading and writing",
    body: "Long-form reading and writing both benefit from a screen that stops behaving like a TV with twelve channels on at once. Frost the rest. Read the one.",
  },
];

export function UseCasesSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const track = scope.querySelector<HTMLElement>("[data-track]");
      const pin = scope.querySelector<HTMLElement>("[data-pin]");
      if (!track || !pin) return;

      const mm = gsap.matchMedia();
      const panelCount = useCases.length + 1;

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tween = gsap.to(track, {
            xPercent: -100 * ((panelCount - 1) / panelCount),
            ease: "none",
            scrollTrigger: {
              trigger: scope,
              pin,
              scrub: 1,
              start: "top top",
              end: () => `+=${window.innerWidth * (panelCount - 1)}`,
              invalidateOnRefresh: true,
            },
          });

          // Inner parallax — each panel's haze drifts against the scroll.
          const blobs = gsap.utils.toArray<HTMLElement>(
            "[data-panel-haze]",
            scope,
          );
          for (const blob of blobs) {
            gsap.fromTo(
              blob,
              { xPercent: -18 },
              {
                xPercent: 18,
                ease: "none",
                scrollTrigger: {
                  trigger: scope,
                  scrub: 1,
                  start: "top top",
                  end: () => `+=${window.innerWidth * (panelCount - 1)}`,
                },
              },
            );
          }

          return () => tween.kill();
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="use-cases" className="relative">
      <div data-pin className="overflow-hidden lg:h-screen">
        <div
          data-track
          className="flex flex-col lg:h-full lg:flex-row lg:flex-nowrap"
        >
          {/* Intro panel */}
          <div className="relative flex w-full shrink-0 items-center justify-center bg-frost-mist px-6 py-24 lg:h-full lg:w-screen lg:py-0">
            <div className="max-w-md">
              <p className="mb-4 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]">
                In the wild
              </p>
              <h2 className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl">
                The five ways people actually use Frosty.
              </h2>
              <p className="mt-5 text-ink-muted leading-relaxed">
                Same layer of glass, five very different reasons to reach for
                it. Scroll on.
              </p>
            </div>
          </div>

          {/* Use-case panels */}
          {useCases.map((useCase, i) => (
            <div
              key={useCase.title}
              className="relative flex w-full shrink-0 items-center justify-center overflow-hidden border-frost-edge/60 border-t bg-background px-6 py-24 lg:h-full lg:w-screen lg:border-t-0 lg:border-l lg:py-0"
            >
              <div
                data-panel-haze
                className="pointer-events-none absolute top-1/4 left-1/4 size-[28rem] rounded-full bg-glacier/10 blur-3xl"
                aria-hidden
              />
              <div className="relative max-w-md">
                <span className="font-mono text-7xl text-frost-deep">
                  0{i + 1}
                </span>
                <useCase.icon
                  weight="duotone"
                  className="mt-2 size-10 text-glacier"
                />
                <h3 className="mt-4 font-semibold text-3xl text-ink tracking-tight">
                  {useCase.title}
                </h3>
                <p className="mt-4 text-ink-muted text-lg leading-relaxed">
                  {useCase.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
