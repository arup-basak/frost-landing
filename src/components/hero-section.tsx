"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { BrowserMock, ChatMock, CodeMock } from "./app-mocks";
import { CtaButton } from "./cta-button";
import { MacosWindow } from "./macos-window";
import { SplitHeading } from "./split-heading";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;

      const windows = gsap.utils.toArray<HTMLElement>("[data-window]", scope);
      const stack = scope.querySelector<HTMLElement>("[data-stack]");
      const reduced = prefersReducedMotion();

      const rotations = [
        { rotationY: 16, rotationZ: -7 },
        { rotationY: 0, rotationZ: 0 },
        { rotationY: -16, rotationZ: 7 },
      ];

      windows.forEach((w, i) => {
        gsap.set(w, {
          transformPerspective: 2000,
          rotationX: 7,
          ...rotations[i],
          transformOrigin: "center center",
        });
      });

      if (reduced) {
        gsap.set(windows, { opacity: 1, y: 0 });
        windows.forEach((w, i) => {
          const frost = w.querySelector("[data-frost]");
          if (frost) gsap.set(frost, { opacity: i === 1 ? 0 : 1 });
        });
        return;
      }

      // Entrance — stack lifts in before the headline cascades.
      gsap.from(windows, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Autonomous demo loop — runs on GSAP's ticker, pauses with the tab.
      const order = [1, 0, 1, 2];
      let step = 0;
      const setActive = (active: number, duration: number) => {
        windows.forEach((w, i) => {
          const frost = w.querySelector("[data-frost]");
          if (frost) {
            gsap.to(frost, {
              opacity: i === active ? 0 : 1,
              duration,
              ease: "power2.inOut",
            });
          }
          gsap.to(w, {
            scale: i === active ? 1 : 0.93,
            duration,
            ease: "power3.inOut",
          });
        });
      };
      setActive(1, 0.6);
      const cycle = () => {
        step = (step + 1) % order.length;
        setActive(order[step], 0.85);
        gsap.delayedCall(4, cycle);
      };
      const loop = gsap.delayedCall(4, cycle);

      // Pointer parallax on the whole stack via interpolated quickTo.
      if (stack) {
        const xTo = gsap.quickTo(stack, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(stack, "y", { duration: 0.8, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          xTo(((e.clientX - cx) / cx) * 22);
          yTo(((e.clientY - cy) / cy) * 14);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
          window.removeEventListener("pointermove", onMove);
          loop.kill();
        };
      }

      return () => loop.kill();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden px-6 pt-36 pb-24"
    >
      <div
        className="haze-blob -top-40 -left-32 pointer-events-none absolute size-[36rem] rounded-full bg-glacier/15 blur-3xl"
        aria-hidden
      />
      <div
        className="haze-blob pointer-events-none absolute top-20 right-0 size-[28rem] rounded-full bg-frost-deep/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-5 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]">
          Native macOS focus layer
        </p>
        <SplitHeading
          as="h1"
          delay={0.5}
          className="text-balance font-semibold text-5xl text-ink leading-[1.05] tracking-tight sm:text-7xl"
        >
          Focus is a state of glass.
        </SplitHeading>
        <p className="mx-auto mt-7 max-w-xl text-balance text-ink-muted text-lg leading-relaxed">
          Frosty turns every inactive window into a pane of frosted glass, so
          the one you're working in is the only one your eyes can settle on.
        </p>
        <p className="mx-auto mt-4 max-w-md text-ink-faint text-sm">
          Native to macOS. Tuned for Apple Silicon. No tracking, no telemetry,
          no clutter — just the window that matters, in focus.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <CtaButton href="#download">Download for macOS</CtaButton>
          <p className="font-mono text-ink-faint text-xs">
            7-day free trial · macOS 14 Sonoma and later · Apple Silicon &amp;
            Intel
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-5xl [perspective:2000px]">
        <div data-stack className="relative h-[20rem] sm:h-[26rem]">
          <div data-window className="absolute top-[14%] left-0 z-10 w-[46%]">
            <MacosWindow title="slack — #design-sync">
              <ChatMock />
            </MacosWindow>
          </div>
          <div
            data-window
            className="-translate-x-1/2 absolute top-0 left-1/2 z-30 w-[58%]"
          >
            <MacosWindow title="FrostController.swift" priority>
              <CodeMock />
            </MacosWindow>
          </div>
          <div data-window className="absolute top-[14%] right-0 z-10 w-[46%]">
            <MacosWindow title="safari — flights">
              <BrowserMock />
            </MacosWindow>
          </div>
        </div>
      </div>

      <div
        className="scroll-cue mx-auto mt-12 h-9 w-5 rounded-full border border-ink-faint/50"
        aria-hidden
      >
        <span className="mx-auto mt-1.5 block size-1.5 rounded-full bg-ink-faint" />
      </div>
    </section>
  );
}
