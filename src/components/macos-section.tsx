"use client";

import { useGSAP } from "@gsap/react";
import {
  Drop,
  Keyboard,
  Monitor,
  SealCheck,
  SquaresFour,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { Flip, gsap, prefersReducedMotion } from "@/lib/gsap";
import { PrefsMock } from "./app-mocks";
import { MacosWindow } from "./macos-window";
import { SplitHeading } from "./split-heading";

const points = [
  {
    icon: Drop,
    text: "Frosty uses the same translucency primitives macOS uses for its own Liquid Glass interface — the effect looks native because it is native.",
  },
  {
    icon: SquaresFour,
    text: "Window management plays nicely with Spaces, Stage Manager, Mission Control, and full-screen apps.",
  },
  {
    icon: Monitor,
    text: "Multi-monitor setups work the way you'd expect: each display tracks its own active window.",
  },
  {
    icon: Keyboard,
    text: "External keyboards, Magic Trackpad gestures, and standard macOS shortcuts are first-class citizens.",
  },
  {
    icon: SealCheck,
    text: "Updates ship through the app, signed and notarised by Apple.",
  },
];

const SPREAD = ["flex-row", "items-end", "gap-3"];
const STACKED = ["flex-col", "items-stretch", "gap-1.5"];

export function MacosSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;
      const windowEl = scope.querySelector<HTMLElement>("[data-spring]");
      const smGroup = scope.querySelector<HTMLElement>("[data-sm]");
      const thumbs = gsap.utils.toArray<HTMLElement>("[data-sm-thumb]", scope);
      const reduced = prefersReducedMotion();

      if (windowEl && !reduced) {
        gsap.from(windowEl, {
          scale: 0.85,
          y: 60,
          rotation: -2,
          opacity: 0,
          duration: 1.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: windowEl, start: "top 80%", once: true },
        });
      }

      if (smGroup && thumbs.length > 0 && !reduced) {
        smGroup.classList.add(...SPREAD);
        gsap
          .timeline({
            scrollTrigger: { trigger: smGroup, start: "top 75%", once: true },
          })
          .add(() => {
            const state = Flip.getState(thumbs);
            smGroup.classList.remove(...SPREAD);
            smGroup.classList.add(...STACKED);
            Flip.from(state, {
              duration: 0.7,
              ease: "power3.inOut",
              stagger: 0.06,
            });
          });
      } else if (smGroup) {
        smGroup.classList.add(...STACKED);
      }
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]">
            Built for one platform
          </p>
          <SplitHeading
            as="h2"
            className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
          >
            Built for the way macOS actually works.
          </SplitHeading>
          <p className="mt-5 text-balance text-ink-muted leading-relaxed">
            Frosty is closed-source, single-developer, hand-tuned software made
            specifically for one operating system. That means:
          </p>

          <ul className="mt-7 space-y-4">
            {points.map((point) => (
              <li key={point.text} className="flex gap-3">
                <point.icon
                  weight="duotone"
                  className="mt-0.5 size-6 shrink-0 text-glacier"
                />
                <span className="text-ink-muted leading-relaxed">
                  {point.text}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 border-glacier/40 border-l-2 pl-4 text-ink leading-relaxed">
            There is no Windows version. There is no Linux port. There is no
            Electron wrapper. Frosty does one thing on one platform and tries to
            do it perfectly.
          </p>
        </div>

        <div className="space-y-6">
          <div data-spring>
            <MacosWindow title="frosty — preferences">
              <PrefsMock />
            </MacosWindow>
          </div>

          <div className="rounded-2xl border border-white/70 bg-frost-mist/80 p-6 backdrop-blur-sm">
            <p className="mb-4 font-mono text-ink-faint text-xs uppercase tracking-[0.16em]">
              Stage Manager — windows shuffle into a stack
            </p>
            <div data-sm className="flex">
              {["draft", "terminal", "safari"].map((label) => (
                <div
                  key={label}
                  data-sm-thumb
                  className="overflow-hidden rounded-md border border-white/70 bg-white shadow-sm"
                >
                  <div className="flex h-4 items-center gap-1 bg-white/90 px-2">
                    <span className="size-1.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-1.5 rounded-full bg-[#febc2e]" />
                    <span className="size-1.5 rounded-full bg-[#28c840]" />
                    <span className="ml-1 font-mono text-[7px] text-ink-faint">
                      {label}
                    </span>
                  </div>
                  <div className="h-12 bg-gradient-to-br from-frost-mist to-frost-pale" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
