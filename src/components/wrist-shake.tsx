"use client";

import { useGSAP } from "@gsap/react";
import { HandWaving } from "@phosphor-icons/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SplitHeading } from "./split-heading";

export function WristShake() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const overlay = document.getElementById("page-frost");
    if (!overlay) return;

    let lastX = 0;
    let lastDir = 0;
    let reversals = 0;
    let windowStart = 0;
    let busy = false;

    const trigger = () => {
      if (busy) return;
      busy = true;
      gsap
        .timeline({
          onComplete: () => {
            busy = false;
          },
        })
        .to(overlay, { opacity: 0.85, duration: 0.4, ease: "power2.out" })
        .to(
          overlay,
          { opacity: 0, duration: 1.1, ease: "power2.inOut" },
          "+=0.3",
        );
    };

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      if (Math.abs(dx) < 7) return;

      const dir = Math.sign(dx);
      if (lastDir !== 0 && dir !== 0 && dir !== lastDir) {
        const now = performance.now();
        if (now - windowStart > 600) {
          reversals = 0;
          windowStart = now;
        }
        reversals += 1;
        if (reversals >= 4) {
          reversals = 0;
          trigger();
        }
      }
      lastDir = dir;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, {});

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-glacier-deep px-6 py-28 text-frost-mist"
    >
      <div
        className="haze-blob -translate-x-1/2 pointer-events-none absolute top-0 left-1/2 size-[40rem] rounded-full bg-glacier-bright/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <HandWaving
          weight="duotone"
          className="mx-auto mb-6 size-12 text-glacier-bright"
        />
        <SplitHeading
          as="h2"
          className="text-balance font-semibold text-4xl leading-tight tracking-tight sm:text-5xl"
        >
          A flick of the wrist toggles the world.
        </SplitHeading>
        <p className="mt-6 text-balance text-frost-edge text-lg leading-relaxed">
          Whip your cursor side to side and Frosty drops away — everything
          sharpens at once. Flick again and the frost returns. It's the fastest
          way to peek at a reference window without leaving the headspace you're
          in.
        </p>
        <p className="mt-8 font-mono text-glacier-bright text-xs uppercase tracking-[0.18em]">
          Try it now — flick your cursor across this page
        </p>
      </div>
    </section>
  );
}
