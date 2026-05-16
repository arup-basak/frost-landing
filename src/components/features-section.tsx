"use client";

import { Cpu, ShieldCheck, Target } from "@phosphor-icons/react";
import { ChatMock, DocMock } from "./app-mocks";
import { MacosWindow } from "./macos-window";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const cards = [
  {
    icon: Cpu,
    title: "Native, not nailed-on",
    body: "Frosty is written in Swift against Apple's own compositor APIs. It doesn't screenshot your screen, doesn't intercept your windows, doesn't run a Chromium runtime in the background. It's a thin, polite layer that asks macOS to render what it already knows how to render — frosted glass — and gets out of the way.",
    stat: "Idle CPU ~0% · Active CPU a rounding error · Memory under 40 MB",
  },
  {
    icon: ShieldCheck,
    title: "Quiet by design",
    body: "No account. No login. No cloud sync. No analytics SDK. Frosty runs entirely on your Mac and never phones home. Your windows, your work, your screen — none of it leaves the machine.",
    stat: null,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-frost-mist px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="mb-4 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]"
          >
            What Frosty does
          </p>
          <SplitHeading
            as="h2"
            className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
          >
            One window in focus. The rest, frozen still.
          </SplitHeading>
          <p
            data-reveal
            className="mt-5 text-balance text-ink-muted leading-relaxed"
          >
            Whichever window you click into becomes the only sharp surface on
            your screen. Switch apps and the frost follows — instantly, fluidly,
            without a flicker. No toggle to remember, no shortcut to press, no
            menu to dig through. Click. Focus. Done.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal className="relative pt-6 pr-6">
            <div className="-top-1 absolute right-0 w-[62%]">
              <MacosWindow title="slack — #design-sync" frosted>
                <ChatMock />
              </MacosWindow>
              <span className="-translate-x-1/2 absolute bottom-3 left-1/2 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[9px] text-frost-mist uppercase tracking-[0.14em]">
                Frosted
              </span>
            </div>
            <div className="relative w-[68%]">
              <MacosWindow title="draft.md — in focus">
                <DocMock />
              </MacosWindow>
              <span className="absolute bottom-3 left-3 rounded-full bg-glacier-deep px-2.5 py-1 font-mono text-[9px] text-frost-mist uppercase tracking-[0.14em]">
                Sharp
              </span>
            </div>
          </div>

          <div data-reveal className="flex items-center gap-3">
            <Target weight="duotone" className="size-7 shrink-0 text-glacier" />
            <p className="text-ink-muted leading-relaxed">
              Same desktop, two states. The active document stays sharp and
              readable; the Slack thread behind it recedes into a calm, frosted
              haze — present, but no longer pulling at you.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              data-reveal
              className="rounded-2xl border border-white/70 bg-white/70 p-8 backdrop-blur-sm transition-transform duration-300 ease-glass hover:-translate-y-1"
            >
              <card.icon
                weight="duotone"
                className="mb-5 size-9 text-glacier"
              />
              <h3 className="font-semibold text-ink text-xl tracking-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-ink-muted leading-relaxed">{card.body}</p>
              {card.stat && (
                <p className="mt-5 rounded-lg bg-frost-pale px-4 py-3 font-mono text-glacier-deep text-xs">
                  {card.stat}
                </p>
              )}
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
