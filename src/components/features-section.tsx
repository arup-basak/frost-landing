"use client";

import {
  CpuIcon,
  LightningIcon,
  ShieldCheckIcon,
  StackIcon,
} from "@phosphor-icons/react";
import { ChatMock, DocMock } from "./app-mocks";
import { MacosWindow } from "./macos-window";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const cards = [
  {
    icon: CpuIcon,
    title: "Native and light",
    body: "Built in Swift on Apple's own compositor. Idle CPU near zero, under 40 MB of memory.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Private by default",
    body: "No account, no telemetry, no network calls. Everything stays on your Mac.",
  },
  {
    icon: LightningIcon,
    title: "Instant snap-back",
    body: "The frost follows your focus with no lag — the sharp window is always the active one.",
  },
  {
    icon: StackIcon,
    title: "Per-app exclusions",
    body: "Exempt video calls, design tools, or any app that needs full context.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-frost-mist px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="mb-4 font-mono text-glacier-bright text-xs uppercase tracking-[0.22em]"
          >
            Features
          </p>
          <SplitHeading
            as="h2"
            className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
          >
            One window sharp. The rest, frozen still.
          </SplitHeading>
          <p
            data-reveal
            className="mt-5 text-balance text-ink-muted leading-relaxed"
          >
            Whichever window you click into stays crisp. Everything else recedes
            behind glass — present, but no longer pulling at you.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal className="relative pt-6 pr-6">
            <div className="-top-1 absolute right-0 w-[62%]">
              <MacosWindow title="slack — #design-sync" frosted>
                <ChatMock />
              </MacosWindow>
              <span className="-translate-x-1/2 absolute bottom-3 left-1/2 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] text-ink uppercase tracking-[0.14em] ring-1 ring-white/10">
                Frosted
              </span>
            </div>
            <div className="relative w-[68%]">
              <MacosWindow title="draft.md — in focus">
                <DocMock />
              </MacosWindow>
              <span className="absolute bottom-3 left-3 rounded-full bg-[linear-gradient(135deg,#7fc8ef,#5b9fc9)] px-2.5 py-1 font-mono text-[9px] text-[#06121d] uppercase tracking-[0.14em]">
                Sharp
              </span>
            </div>
          </div>

          <div data-reveal>
            <p className="text-ink-muted text-lg leading-relaxed">
              Same desktop, two states. The active document stays sharp and
              readable. The Slack thread behind it recedes into a calm haze.
            </p>
            <p className="mt-4 border-glacier/40 border-l-2 pl-4 text-ink leading-relaxed">
              Works cleanly with Spaces, Stage Manager, multi-monitor setups,
              and screen sharing.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              data-reveal
              className="rounded-2xl border border-white/8 bg-frost-pale/70 p-7 backdrop-blur-sm transition-[transform,border-color] duration-300 ease-glass hover:-translate-y-1 hover:border-glacier/40"
            >
              <card.icon
                weight="duotone"
                className="mb-5 size-9 text-glacier-bright"
              />
              <h3 className="font-semibold text-ink text-lg tracking-tight">
                {card.title}
              </h3>
              <p className="mt-2 text-ink-muted text-sm leading-relaxed">
                {card.body}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
