"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Draggable, gsap } from "@/lib/gsap";
import {
  BrowserMock,
  CalendarMock,
  ChatMock,
  DocMock,
  MailMock,
} from "./app-mocks";

const knobs = [
  {
    key: "frost",
    label: "Frost",
    init: 0.72,
    hint: "how much detail dissolves behind the glass",
  },
  {
    key: "dim",
    label: "Dim",
    init: 0.4,
    hint: "how much luminance drains from inactive surfaces",
  },
  {
    key: "falloff",
    label: "Falloff",
    init: 0.5,
    hint: "how the effect blends across overlapping windows",
  },
  {
    key: "snap",
    label: "Snap-back",
    init: 0.6,
    hint: "how quickly the active window sharpens when you switch",
  },
] as const;

type KnobKey = (typeof knobs)[number]["key"];

export function FrostDials() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;

      const frostEl = scope.querySelector<HTMLElement>("[data-preview-frost]");
      const dimEl = scope.querySelector<HTMLElement>("[data-preview-dim]");
      const previewEl = scope.querySelector<HTMLElement>("[data-preview]");
      if (!frostEl || !dimEl || !previewEl) return;

      const values: Record<KnobKey, number> = {
        frost: 0.72,
        dim: 0.4,
        falloff: 0.5,
        snap: 0.6,
      };

      const setFrostOpacity = gsap.quickSetter(frostEl, "opacity");
      const setFrostBlur = gsap.quickSetter(frostEl, "--frost-blur", "px");
      const setDim = gsap.quickSetter(dimEl, "opacity");

      const apply = () => {
        setFrostOpacity(values.frost);
        setFrostBlur(3 + values.falloff * 13);
        setDim(values.dim * 0.55);
      };
      apply();

      const draggables: Draggable[] = [];

      knobs.forEach((knob) => {
        const knobEl = scope.querySelector<HTMLElement>(
          `[data-knob="${knob.key}"]`,
        );
        const dial = knobEl?.querySelector<HTMLElement>("[data-dial]");
        const readout = knobEl?.querySelector<HTMLElement>("[data-readout]");
        if (!knobEl || !dial) return;

        gsap.set(dial, { rotation: knob.init * 270 - 135 });
        if (readout) {
          readout.textContent = `${Math.round(knob.init * 100)}%`;
        }

        const update = function (this: Draggable) {
          const value = gsap.utils.clamp(0, 1, (this.rotation + 135) / 270);
          values[knob.key] = value;
          if (readout) readout.textContent = `${Math.round(value * 100)}%`;
          apply();
        };

        const [drag] = Draggable.create(dial, {
          type: "rotation",
          bounds: { minRotation: -135, maxRotation: 135 },
          inertia: true,
          onDrag: update,
          onThrowUpdate: update,
        });
        draggables.push(drag);
      });

      // Snap-back — clicking the preview simulates switching to the active
      // window: the frost drops, then settles back over the chosen duration.
      const sharpen = () => {
        const speed = 0.16 + (1 - values.snap) * 0.85;
        gsap.killTweensOf(frostEl);
        gsap.to(frostEl, {
          opacity: 0,
          duration: speed * 0.4,
          ease: "expo.out",
          onComplete: () => {
            gsap.to(frostEl, {
              opacity: values.frost,
              duration: speed,
              ease: "power2.inOut",
            });
          },
        });
      };
      previewEl.addEventListener("click", sharpen);

      return () => {
        previewEl.removeEventListener("click", sharpen);
        for (const d of draggables) d.kill();
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]">
            A glass you can tune
          </p>
          <h3 className="text-balance font-semibold text-3xl text-ink leading-tight tracking-tight sm:text-4xl">
            Find the exact threshold where your eyes stop wandering.
          </h3>
          <p className="mt-5 text-balance text-ink-muted leading-relaxed">
            Frost intensity, dim level, edge softness, response curve — every
            variable is yours. A barely-there haze that just takes the edge off,
            or a near-opaque pane that erases everything except the active
            window. Drag the dials. Click the preview to feel the snap-back.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Live preview */}
          <div
            data-preview
            className="relative aspect-[4/3] cursor-pointer select-none overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-frost-mist to-frost-pale shadow-[0_40px_80px_-40px_rgba(22,32,43,0.55)]"
          >
            {/* Inactive desktop windows — real content, so the frost is legible */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-6">
              {[ChatMock, CalendarMock, MailMock, BrowserMock].map(
                (Mock, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed window set
                    key={i}
                    className="overflow-hidden rounded-lg border border-white/70 bg-white"
                  >
                    <div className="flex h-4 items-center gap-1 bg-white/90 px-2">
                      <span className="size-1.5 rounded-full bg-[#ff5f57]" />
                      <span className="size-1.5 rounded-full bg-[#febc2e]" />
                      <span className="size-1.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="h-[calc(100%-1rem)]">
                      <Mock />
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Dim + frost layers (GSAP-driven) */}
            <div
              data-preview-dim
              className="pointer-events-none absolute inset-0 bg-ink"
              style={{ opacity: 0 }}
            />
            <div
              data-preview-frost
              className="pointer-events-none absolute inset-0 bg-frost-pale/60"
              style={{
                opacity: 0,
                backdropFilter: "blur(var(--frost-blur,8px))",
                WebkitBackdropFilter: "blur(var(--frost-blur,8px))",
              }}
            />

            {/* Active window — stays sharp above the frost */}
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-3/5">
              <div className="overflow-hidden rounded-lg border border-white/80 bg-white shadow-[0_24px_48px_-20px_rgba(22,32,43,0.6)] ring-1 ring-glacier/30">
                <div className="flex h-6 items-center gap-1.5 bg-white px-3">
                  <span className="size-2 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 rounded-full bg-[#febc2e]" />
                  <span className="size-2 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-[9px] text-ink-faint">
                    in focus
                  </span>
                </div>
                <div className="h-44">
                  <DocMock />
                </div>
              </div>
            </div>
          </div>

          {/* Knobs */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            {knobs.map((knob) => (
              <div
                key={knob.key}
                data-knob={knob.key}
                className="flex flex-col items-center text-center"
              >
                <div
                  data-dial
                  className="relative size-20 cursor-grab touch-none rounded-full border border-frost-edge bg-white shadow-[0_10px_24px_-12px_rgba(22,32,43,0.5),inset_0_2px_6px_rgba(255,255,255,0.9)] active:cursor-grabbing"
                >
                  <span className="-translate-x-1/2 absolute top-2 left-1/2 size-2.5 rounded-full bg-glacier" />
                  <span className="absolute inset-0 m-auto size-1.5 rounded-full bg-ink/20" />
                </div>
                <span className="mt-3 font-semibold text-ink text-sm">
                  {knob.label}
                </span>
                <span
                  data-readout
                  className="font-mono text-glacier-deep text-xs"
                >
                  0%
                </span>
                <span className="mt-1 text-[11px] text-ink-faint leading-snug">
                  {knob.hint}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
