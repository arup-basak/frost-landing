"use client";

import {
  BookOpenIcon,
  BrainIcon,
  BroadcastIcon,
  CodeIcon,
  TargetIcon,
} from "@phosphor-icons/react";
import { Reveal } from "./reveal";
import { SplitHeading } from "./split-heading";

const useCases = [
  {
    icon: TargetIcon,
    title: "Deep work",
    body: "Ninety minutes, one document. Frosty makes it the only thing you can really see.",
  },
  {
    icon: CodeIcon,
    title: "Coding with intent",
    body: "Your editor stays sharp while the terminal, browser, and docs frost quietly behind it.",
  },
  {
    icon: BrainIcon,
    title: "ADHD-aware focus",
    body: "The bright window is the one you're in. Everything else is visibly 'not now'.",
  },
  {
    icon: BroadcastIcon,
    title: "Screen sharing",
    body: "Activate the deck you're presenting — every other window frosts past readability.",
  },
  {
    icon: BookOpenIcon,
    title: "Reading & writing",
    body: "Frost the rest, read the one. The screen stops acting like twelve channels at once.",
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="relative overflow-hidden px-6 py-28">
      <div
        className="aurora-blob pointer-events-none absolute top-20 right-0 size-[34rem] rounded-full bg-glacier/12 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
          start="top 80%"
        >
          {/* Intro cell */}
          <div data-reveal className="flex flex-col justify-center">
            <p className="mb-4 font-mono text-glacier-bright text-xs uppercase tracking-[0.22em]">
              Use cases
            </p>
            <SplitHeading
              as="h2"
              className="text-balance font-semibold text-4xl text-ink leading-tight tracking-tight sm:text-5xl"
            >
              Five ways people reach for Frosty.
            </SplitHeading>
            <p className="mt-5 text-ink-muted leading-relaxed">
              Same pane of glass, very different reasons to switch it on.
            </p>
          </div>

          {/* Use-case cards */}
          {useCases.map((useCase, i) => (
            <article
              key={useCase.title}
              data-reveal
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-frost-pale/70 p-7 backdrop-blur-sm transition-[transform,border-color] duration-300 ease-glass hover:-translate-y-1 hover:border-glacier/40"
            >
              <span
                className="absolute top-4 right-5 font-mono text-5xl text-frost-edge/70 transition-colors duration-300 group-hover:text-glacier/30"
                aria-hidden
              >
                0{i + 1}
              </span>
              <useCase.icon
                weight="duotone"
                className="size-9 text-glacier-bright"
              />
              <h3 className="mt-5 font-semibold text-ink text-xl tracking-tight">
                {useCase.title}
              </h3>
              <p className="mt-2 text-ink-muted leading-relaxed">
                {useCase.body}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
