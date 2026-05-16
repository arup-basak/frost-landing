"use client";

import { Check, X } from "@phosphor-icons/react";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const others = [
  "Full-screen modes that hide your context",
  "App blockers that lock you out of your own tools",
  "Do-not-disturb schedules you forget to turn off",
  "Focus removed by taking access away",
];

const frosty = [
  "Every window stays exactly where you left it",
  "Glance at, switch to, or read anything instantly",
  "Inactive windows are quieter — never gone",
  "Focus without the friction of being locked out",
];

export function ComparisonSection() {
  return (
    <section className="relative bg-frost-mist px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="mb-4 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]"
          >
            Not another blocker
          </p>
          <SplitHeading
            as="h2"
            className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
          >
            How Frosty is different from a focus app.
          </SplitHeading>
          <p
            data-reveal
            className="mt-5 text-balance text-ink-muted leading-relaxed"
          >
            Most "focus" software hides things from you. Full-screen modes, app
            blockers, do-not-disturb schedules — they all work by removing your
            access to something. Frosty doesn't remove anything.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 md:grid-cols-2">
          <div
            data-reveal
            className="rounded-2xl border border-frost-edge bg-white/50 p-8"
          >
            <h3 className="font-semibold text-ink-muted text-lg">
              Other focus apps
            </h3>
            <ul className="mt-5 space-y-3">
              {others.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <X
                    weight="bold"
                    className="mt-0.5 size-5 shrink-0 text-ink-faint"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            className="rounded-2xl border border-glacier/30 bg-white p-8 shadow-[0_30px_60px_-35px_rgba(40,88,116,0.5)]"
          >
            <h3 className="font-semibold text-glacier-deep text-lg">Frosty</h3>
            <ul className="mt-5 space-y-3">
              {frosty.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <Check
                    weight="bold"
                    className="mt-0.5 size-5 shrink-0 text-glacier"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <p
            data-reveal
            className="mx-auto mt-12 max-w-2xl text-balance text-center text-ink text-xl leading-relaxed"
          >
            It's the difference between a librarian shushing the room and a wall
            around your desk. One lets you keep working in the world — the other
            walls you off from it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
