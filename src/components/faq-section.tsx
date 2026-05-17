"use client";

import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Plus } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Flip, prefersReducedMotion } from "@/lib/gsap";
import { SplitHeading } from "./split-heading";

const faqs = [
  {
    q: "Does Frosty work on Intel Macs?",
    a: "Yes — natively on both Apple Silicon and Intel, on macOS 14 Sonoma and later.",
  },
  {
    q: "Will it slow my Mac down?",
    a: "No. Frosty uses the same rendering layer macOS already uses for window effects. Idle CPU is near zero and memory stays under 40 MB.",
  },
  {
    q: "Does it work with multiple monitors?",
    a: "Yes. Each display tracks its own active window and applies frost independently.",
  },
  {
    q: "Can I disable it for specific apps?",
    a: "Yes. Exclude any app from the effect — handy for video calls or full-screen design tools.",
  },
  {
    q: "Does Frosty collect any data?",
    a: "No analytics, no telemetry, no account. Frosty runs entirely on your Mac and never phones home.",
  },
  {
    q: "What if I don't like it?",
    a: "The 7-day trial is free and full-featured. If it doesn't change how your screen feels, don't buy it.",
  },
];

export function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    const items = ref.current?.querySelectorAll("[data-faq-item]");
    if (items && !prefersReducedMotion()) {
      flipState.current = Flip.getState(items, { props: "borderColor" });
    }
    setOpen((current) => (current === index ? null : index));
  };

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.5,
        ease: "power3.inOut",
        nested: true,
      });
      flipState.current = null;
    },
    { dependencies: [open], scope: ref },
  );

  return (
    <section id="faq" className="relative overflow-hidden px-6 py-28">
      {/* Ambient glow anchored to the section */}
      <div
        aria-hidden
        className="aurora-blob -z-10 absolute top-1/3 left-[8%] size-[28rem] rounded-full bg-glacier/10 blur-[120px]"
      />

      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-12 lg:grid-cols-[0.82fr_1.18fr]">
        {/* Left rail — sticky context panel */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-glacier-bright/70" />
            <p className="font-mono text-glacier-bright text-xs uppercase tracking-[0.22em]">
              Questions
            </p>
          </div>
          <SplitHeading
            as="h2"
            className="mt-5 text-balance font-semibold text-4xl text-ink leading-[1.08] tracking-tight sm:text-5xl"
          >
            Answers, before you ask.
          </SplitHeading>
          <p className="mt-5 max-w-sm text-balance text-ink-muted leading-relaxed">
            Six things people check before installing. If yours isn't here, it's
            one short email away.
          </p>

          <a
            href="mailto:hello@frostyapp.com"
            className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-frost-pale/70 p-5 backdrop-blur-sm transition-[border-color,transform] duration-300 ease-glass hover:-translate-y-0.5 hover:border-glacier/40"
          >
            <span>
              <span className="block font-medium text-ink text-sm">
                Still wondering something?
              </span>
              <span className="block text-ink-faint text-xs">
                hello@frostyapp.com — we reply fast.
              </span>
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-glacier/30 bg-glacier/10 text-glacier-bright transition-transform duration-300 ease-glass group-hover:rotate-45">
              <ArrowUpRight weight="bold" className="size-5" />
            </span>
          </a>
        </div>

        {/* Right — accordion */}
        <div ref={ref} className="flex flex-col gap-2.5">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                data-faq-item
                className={`group relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-300 ease-glass ${
                  isOpen
                    ? "border-glacier/45 bg-frost-deep/80"
                    : "border-white/8 bg-frost-pale/60 hover:border-white/15"
                }`}
              >
                {/* Accent rail — slides in when open */}
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-px bg-gradient-to-b from-glacier-bright via-glacier to-transparent transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 px-6 py-5 text-left sm:px-7"
                >
                  <span
                    className={`mt-0.5 font-mono text-sm tabular-nums transition-colors duration-300 ${
                      isOpen
                        ? "text-glacier-bright"
                        : "text-frost-edge group-hover:text-ink-faint"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-medium text-base tracking-tight transition-colors duration-300 sm:text-lg ${
                      isOpen
                        ? "text-ink"
                        : "text-ink-muted group-hover:text-ink"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300 ease-glass ${
                      isOpen
                        ? "rotate-[135deg] border-glacier-bright/50 bg-glacier/15 text-glacier-bright"
                        : "border-white/12 text-ink-faint group-hover:border-white/25 group-hover:text-ink-muted"
                    }`}
                  >
                    <Plus weight="bold" className="size-3.5" />
                  </span>
                </button>

                <div data-answer hidden={!isOpen} className="px-6 pb-6 sm:px-7">
                  <div className="ml-[2.1rem] border-glacier/25 border-l pl-4">
                    <p className="text-ink-muted leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
