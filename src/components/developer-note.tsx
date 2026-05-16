import { Reveal } from "./reveal";

export function DeveloperNote() {
  return (
    <section className="px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p
          data-reveal
          className="mb-5 font-mono text-glacier-deep text-xs uppercase tracking-[0.22em]"
        >
          A note from the developer
        </p>
        <p
          data-reveal
          className="text-balance text-ink text-xl leading-relaxed"
        >
          Frosty exists because I kept opening apps to help me focus — and then
          getting distracted by the focus apps themselves. The settings panels.
          The streaks. The achievements. The notifications reminding me to
          focus.
        </p>
        <p
          data-reveal
          className="mt-5 text-balance text-ink-muted leading-relaxed"
        >
          I wanted something that runs, disappears, and quietly changes the way
          my screen behaves until I stop noticing it's there.
        </p>
        <p
          data-reveal
          className="mt-5 text-balance text-ink-muted leading-relaxed"
        >
          If that sounds like something you've been looking for, install the
          trial. If it doesn't, that's fine too. The rest of the internet has a
          lot of focus apps with a lot of opinions.
        </p>
      </Reveal>
    </section>
  );
}
