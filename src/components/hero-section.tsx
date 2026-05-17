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
        { rotationY: 12, rotationZ: -5 },
        { rotationY: 0, rotationZ: 0 },
        { rotationY: -12, rotationZ: 5 },
      ];
      const restX = 6;

      windows.forEach((w, i) => {
        gsap.set(w, {
          transformPerspective: 2200,
          rotationX: restX,
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

      // Entrance — stack lifts in before the headline cascades. Uses
      // yPercent so it never fights setActive's y-based focus lift.
      gsap.from(windows, {
        yPercent: 26,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Focusing a window: it lifts to the front, squares up to face the
      // viewer, and sharpens — the rest fan back behind frosted glass.
      const setActive = (active: number, duration: number) => {
        windows.forEach((w, i) => {
          const isActive = i === active;
          // z-index is a hard switch — flip it instantly so the focused
          // window is never trapped behind the others.
          gsap.set(w, { zIndex: isActive ? 40 : 10 });
          const frost = w.querySelector("[data-frost]");
          if (frost) {
            gsap.to(frost, {
              opacity: isActive ? 0 : 1,
              duration,
              ease: "power2.inOut",
            });
          }
          gsap.to(w, {
            scale: isActive ? 1.04 : 0.85,
            y: isActive ? -18 : 20,
            rotationX: isActive ? 0 : restX,
            rotationY: isActive ? 0 : rotations[i].rotationY,
            rotationZ: isActive ? 0 : rotations[i].rotationZ,
            filter: isActive
              ? "drop-shadow(0 28px 55px rgba(127,200,239,0.28))"
              : "drop-shadow(0 18px 38px rgba(0,0,0,0.55))",
            duration,
            ease: "power3.inOut",
          });
        });
      };

      // Autonomous demo loop — pauses while a window is hovered.
      const order = [1, 0, 1, 2];
      let step = 0;
      let auto = true;
      let pending: gsap.core.Tween | null = null;
      const schedule = () => {
        pending = gsap.delayedCall(4, cycle);
      };
      function cycle() {
        if (!auto) return;
        step = (step + 1) % order.length;
        setActive(order[step], 0.85);
        schedule();
      }
      setActive(1, 0.6);
      schedule();

      // Hover-to-focus — pointing at a window brings it forward immediately.
      const cleanups: Array<() => void> = [];
      windows.forEach((w, i) => {
        const enter = () => {
          auto = false;
          pending?.kill();
          setActive(i, 0.4);
        };
        const leave = () => {
          auto = true;
          pending?.kill();
          schedule();
        };
        w.addEventListener("pointerenter", enter);
        w.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          w.removeEventListener("pointerenter", enter);
          w.removeEventListener("pointerleave", leave);
        });
      });

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
        cleanups.push(() => window.removeEventListener("pointermove", onMove));
      }

      return () => {
        auto = false;
        pending?.kill();
        for (const fn of cleanups) fn();
      };
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
        className="aurora-blob -top-40 -left-32 pointer-events-none absolute size-[40rem] rounded-full bg-glacier/20 blur-3xl"
        aria-hidden
      />
      <div
        className="aurora-blob pointer-events-none absolute top-10 right-0 size-[32rem] rounded-full bg-glacier-bright/15 blur-3xl"
        aria-hidden
        style={{ animationDelay: "-8s" }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-frost-pale/60 px-4 py-1.5 font-mono text-glacier-bright text-xs uppercase tracking-[0.2em] backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-glacier-bright" />
          Native macOS focus app
        </p>
        <SplitHeading
          as="h1"
          delay={0.4}
          className="text-balance font-semibold text-5xl text-ink leading-[1.05] tracking-tight sm:text-7xl"
        >
          Blur every window but the one that matters.
        </SplitHeading>
        <p className="mx-auto mt-7 max-w-xl text-balance text-ink-muted text-lg leading-relaxed">
          Click into a window and Frosty frosts the rest. One sharp surface,
          zero distractions — and it follows you the instant you switch.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <CtaButton href="#download">
            <svg
              viewBox="0 0 384 512"
              aria-hidden="true"
              className="-mt-0.5 h-[18px] w-[18px] shrink-0 fill-current"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            Download for macOS
          </CtaButton>
          <p className="font-mono text-ink-faint text-xs">
            7-day free trial · macOS 14+ · Apple Silicon &amp; Intel
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
