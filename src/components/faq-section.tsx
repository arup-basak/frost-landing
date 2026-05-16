"use client";

import { useGSAP } from "@gsap/react";
import { CaretDown } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Flip, prefersReducedMotion } from "@/lib/gsap";
import { SplitHeading } from "./split-heading";

const faqs = [
  {
    q: "Does Frosty work on Intel Macs?",
    a: "Yes. Frosty runs natively on both Apple Silicon and Intel Macs on macOS 14 Sonoma and later. Apple Silicon is recommended for the smoothest animation, but the effect is fluid on both.",
  },
  {
    q: "Does it work with multiple monitors?",
    a: "Yes. Each display tracks its own active window, and frost is applied independently across monitors. Drag a window between displays and the focus follows.",
  },
  {
    q: "Will it slow my Mac down?",
    a: "Frosty uses the same rendering layer macOS already uses for window effects. Idle CPU sits at roughly zero. Active CPU during window switches is a fraction of a percent. Memory stays under 40 MB.",
  },
  {
    q: "Can I disable it for specific apps?",
    a: "Yes. You can exclude any app from the frost effect entirely — useful for video calls, design tools where you need full-screen context, or apps that have their own focus modes.",
  },
  {
    q: "Does Frosty work in screen recordings or while screen sharing?",
    a: "Yes. The frost is applied at the compositor level, so it appears in screen recordings, Zoom calls, Loom captures, and any other screen-sharing tool. Many users keep Frosty on specifically for presentations.",
  },
  {
    q: "Does Frosty collect any data?",
    a: "No. Frosty has no analytics, no telemetry, no account, and no network calls. It runs entirely on your Mac. The only thing that leaves your machine is the license check during initial activation.",
  },
  {
    q: "Is Frosty open source?",
    a: "No. Frosty is closed-source software built and maintained by a single developer. This keeps the codebase tightly scoped, the performance budget tightly enforced, and the design vision intact.",
  },
  {
    q: 'How is Frosty different from macOS\'s built-in "Hide Others" or Stage Manager?',
    a: "'Hide Others' removes windows from view entirely, so you lose visual context. Stage Manager rearranges your windows into groups, which adds its own cognitive load. Frosty does neither — your windows stay exactly where you left them; they just become visually quieter than the one you're working in.",
  },
  {
    q: "Can I shake the cursor to toggle Frosty quickly?",
    a: "Yes. A quick side-to-side cursor flick toggles the frost effect on or off instantly. It's the fastest way to peek at a reference window without breaking your flow.",
  },
  {
    q: "What if I don't like it?",
    a: "The first 7 days are free, full-featured, and require no payment up front. If Frosty doesn't change the way your screen feels, don't buy it. If it does, $9 once.",
  },
];

export function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    const items = ref.current?.querySelectorAll("[data-faq-item]");
    if (items && !prefersReducedMotion()) {
      flipState.current = Flip.getState(items);
    }
    setOpen((current) => (current === index ? null : index));
  };

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.45,
        ease: "power2.inOut",
        nested: true,
      });
      flipState.current = null;
    },
    { dependencies: [open], scope: ref },
  );

  return (
    <section id="faq" className="px-6 py-28">
      <div ref={ref} className="mx-auto max-w-3xl">
        <p className="mb-4 text-center font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]">
          Questions
        </p>
        <SplitHeading
          as="h2"
          className="text-balance text-center font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
        >
          Frequently asked questions
        </SplitHeading>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                data-faq-item
                className="overflow-hidden rounded-xl border border-frost-edge bg-white/70 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-ink">{faq.q}</span>
                  <CaretDown
                    weight="bold"
                    className={`size-5 shrink-0 text-glacier transition-transform duration-300 ease-glass ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div data-answer hidden={!isOpen} className="px-6 pb-5">
                  <p className="text-ink-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
