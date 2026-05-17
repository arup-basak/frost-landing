"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import {
  BrowserMock,
  CalendarMock,
  ChatMock,
  DocMock,
  MailMock,
} from "./app-mocks";

// Each knob fills over its own slice of the scroll, so the glass appears to
// tune itself one dial at a time as the section is pinned in view.
const knobs = [
  { key: "frost", label: "Frost", hint: "blur strength", from: 0.0, to: 0.44 },
  { key: "dim", label: "Dim", hint: "luminance drop", from: 0.16, to: 0.6 },
  {
    key: "falloff",
    label: "Falloff",
    hint: "edge softness",
    from: 0.34,
    to: 0.78,
  },
  {
    key: "snap",
    label: "Snap-back",
    hint: "sharpen speed",
    from: 0.5,
    to: 0.96,
  },
] as const;

type KnobKey = (typeof knobs)[number]["key"];

// Target value each dial settles on once its scroll slice completes.
const targets: Record<KnobKey, number> = {
  frost: 0.84,
  dim: 0.5,
  falloff: 0.68,
  snap: 0.72,
};

// 270° sweep arc geometry for the progress ring around each dial.
const RING_R = 44;
const RING_CIRC = 2 * Math.PI * RING_R;
const RING_ARC = RING_CIRC * 0.75;

function captionFor(frost: number) {
  if (frost < 0.18) return "Crisp — every window sharp";
  if (frost < 0.45) return "Soft focus settling in";
  if (frost < 0.7) return "Frosted — background recedes";
  return "Deep frost — one window in focus";
}

export function FrostDials() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope) return;

      const frostEl = scope.querySelector<HTMLElement>("[data-preview-frost]");
      const dimEl = scope.querySelector<HTMLElement>("[data-preview-dim]");
      const previewEl = scope.querySelector<HTMLElement>("[data-preview]");
      const captionEl = scope.querySelector<HTMLElement>("[data-caption]");
      const barEl = scope.querySelector<HTMLElement>("[data-progress]");
      if (!frostEl || !dimEl || !previewEl) return;

      const values: Record<KnobKey, number> = {
        frost: 0,
        dim: 0,
        falloff: 0.18,
        snap: 0.25,
      };

      const setFrostOpacity = gsap.quickSetter(frostEl, "opacity");
      const setFrostBlur = gsap.quickSetter(frostEl, "--frost-blur", "px");
      const setDim = gsap.quickSetter(dimEl, "opacity");

      // Per-knob setters resolved once, up front.
      const ease = gsap.parseEase("power2.inOut");
      const controls = knobs
        .map((knob) => {
          const knobEl = scope.querySelector<HTMLElement>(
            `[data-knob="${knob.key}"]`,
          );
          const dial = knobEl?.querySelector<HTMLElement>("[data-dial]");
          const arc = knobEl?.querySelector<SVGCircleElement>("[data-arc]");
          const glow = knobEl?.querySelector<HTMLElement>("[data-glow]");
          const readout = knobEl?.querySelector<HTMLElement>("[data-readout]");
          if (!knobEl || !dial || !arc || !glow) return null;
          return {
            knob,
            readout,
            setRotation: gsap.quickSetter(dial, "rotation", "deg"),
            setArc: gsap.quickSetter(arc, "strokeDashoffset"),
            setGlow: gsap.quickSetter(glow, "opacity"),
          };
        })
        .filter((c): c is NonNullable<typeof c> => c !== null);

      const renderKnob = (
        c: (typeof controls)[number],
        value: number,
        glow: number,
      ) => {
        values[c.knob.key] = value;
        c.setRotation(value * 270 - 135);
        c.setArc(RING_ARC * (1 - value));
        c.setGlow(glow);
        if (c.readout) c.readout.textContent = `${Math.round(value * 100)}%`;
      };

      const applyPreview = () => {
        setFrostOpacity(values.frost);
        setFrostBlur(3 + values.falloff * 16);
        setDim(values.dim * 0.78);
        if (captionEl) captionEl.textContent = captionFor(values.frost);
      };

      // Drive every value + UI element from a single scroll progress (0→1).
      const render = (p: number) => {
        for (const c of controls) {
          const { knob } = c;
          const span = knob.to - knob.from;
          const raw = gsap.utils.clamp(0, 1, (p - knob.from) / span);
          const value = gsap.utils.interpolate(
            initialOf(knob.key),
            targets[knob.key],
            ease(raw),
          );
          // Glow peaks while the dial is mid-sweep, fades once it settles.
          const glow = Math.sin(raw * Math.PI);
          renderKnob(c, value, glow);
        }
        applyPreview();
        if (barEl) gsap.set(barEl, { scaleX: p });
      };

      if (prefersReducedMotion()) {
        render(1);
        return;
      }

      // Pin the section and scrub the whole tune-up across ~1.6 viewports.
      const proxy = { p: 0 };
      render(0);
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.6,
        },
        onUpdate: () => render(proxy.p),
      });

      // Bonus: clicking the preview re-runs the snap-back at the tuned speed.
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
      };
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 font-mono text-glacier-bright text-xs uppercase tracking-[0.22em]">
            Make it yours
          </p>
          <h3 className="text-balance font-semibold text-3xl text-ink leading-tight tracking-tight sm:text-4xl">
            Tune the glass to your taste.
          </h3>
          <p className="mt-4 text-balance text-ink-muted leading-relaxed">
            Keep scrolling — the dials sweep through frost, dim, and response,
            and the preview settles with them. Click the preview to feel the
            snap-back.
          </p>

          {/* Scroll-progress meter */}
          <div className="mx-auto mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              data-progress
              className="h-full origin-left bg-glacier-bright"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Live preview */}
          <div
            data-preview
            className="relative aspect-4/3 cursor-pointer select-none overflow-hidden rounded-2xl border border-white/10 bg-[#0c1219] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
          >
            {/* Inactive desktop windows — real content, so the frost is legible */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-6">
              {[ChatMock, CalendarMock, MailMock, BrowserMock].map(
                (Mock, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed window set
                    key={i}
                    className="overflow-hidden rounded-lg border border-white/10 bg-[#11181f]"
                  >
                    <div className="flex h-4 items-center gap-1 bg-[#1a232e] px-2">
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

            {/* Dim + frost layers (scroll-driven) */}
            <div
              data-preview-dim
              className="pointer-events-none absolute inset-0 bg-black"
              style={{ opacity: 0 }}
            />
            <div
              data-preview-frost
              className="pointer-events-none absolute inset-0 bg-glacier/12"
              style={{
                opacity: 0,
                backdropFilter: "blur(var(--frost-blur,8px))",
                WebkitBackdropFilter: "blur(var(--frost-blur,8px))",
              }}
            />

            {/* Active window — stays sharp above the frost */}
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-3/5">
              <div className="overflow-hidden rounded-lg border border-glacier/40 bg-[#11181f] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-glacier/30">
                <div className="flex h-6 items-center gap-1.5 bg-[#1a232e] px-3">
                  <span className="size-2 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 rounded-full bg-[#febc2e]" />
                  <span className="size-2 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-[9px] text-glacier-bright">
                    in focus
                  </span>
                </div>
                <div className="h-44">
                  <DocMock />
                </div>
              </div>
            </div>

            {/* State caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pt-8 pb-3">
              <span
                data-caption
                className="font-mono text-[11px] text-glacier-bright tracking-wide"
              >
                Crisp — every window sharp
              </span>
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
                <div className="relative flex size-24 items-center justify-center">
                  {/* Progress ring */}
                  <svg
                    className="absolute inset-0 size-24 rotate-135"
                    viewBox="0 0 96 96"
                    aria-hidden="true"
                  >
                    <circle
                      cx="48"
                      cy="48"
                      r={RING_R}
                      fill="none"
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="3"
                      strokeDasharray={`${RING_ARC} ${RING_CIRC}`}
                      strokeLinecap="round"
                    />
                    <circle
                      data-arc
                      cx="48"
                      cy="48"
                      r={RING_R}
                      fill="none"
                      stroke="#7fc8ef"
                      strokeWidth="3"
                      strokeDasharray={`${RING_ARC} ${RING_CIRC}`}
                      strokeDashoffset={RING_ARC}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Mid-sweep glow */}
                  <span
                    data-glow
                    className="pointer-events-none absolute inset-2 rounded-full shadow-[0_0_22px_4px_rgba(127,200,239,0.55)]"
                    style={{ opacity: 0 }}
                  />

                  {/* Dial */}
                  <div
                    data-dial
                    className="relative size-20 rounded-full border border-white/10 bg-[linear-gradient(160deg,#1f2a36,#11181f)] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.12)]"
                  >
                    <span className="-translate-x-1/2 absolute top-2 left-1/2 size-2.5 rounded-full bg-glacier-bright shadow-[0_0_10px_rgba(127,200,239,0.9)]" />
                    <span className="absolute inset-0 m-auto size-1.5 rounded-full bg-white/15" />
                  </div>
                </div>
                <span className="mt-3 font-semibold text-ink text-sm">
                  {knob.label}
                </span>
                <span
                  data-readout
                  className="font-mono text-glacier-bright text-xs"
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

// Starting value for each dial before its scroll slice begins.
function initialOf(key: KnobKey): number {
  switch (key) {
    case "falloff":
      return 0.18;
    case "snap":
      return 0.25;
    default:
      return 0;
  }
}
