import Image from "next/image";
import type { ReactNode } from "react";

interface MacosWindowProps {
  title?: string;
  /** Sharp screenshot. When omitted, a CSS placeholder renders instead. */
  src?: string;
  /** Pre-blurred screenshot for the frost layer. Optional. */
  frostedSrc?: string;
  alt?: string;
  priority?: boolean;
  /** Static initial frost state (0 = sharp, 1 = frosted). GSAP overrides this. */
  frosted?: boolean;
  className?: string;
  /** CSS-rendered content used when no `src` is supplied. */
  children?: ReactNode;
}

/**
 * Reusable macOS window mockup. The `[data-frost]` layer is the GSAP target —
 * tweening its opacity crossfades between sharp and frosted states.
 */
export function MacosWindow({
  title = "Untitled",
  src,
  frostedSrc,
  alt = "",
  priority = false,
  frosted = false,
  className = "",
  children,
}: MacosWindowProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-frost-pale shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex h-9 items-center gap-2 border-white/8 border-b bg-[#1a232e] px-4">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-ink-faint tracking-tight">
          {title}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 90vw, 640px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#11181f]">{children}</div>
        )}

        {/* Frost layer — GSAP target. Milky frosted glass: the blur lifts
            brightness so content behind reads as glass, not a dark blob. */}
        <div
          data-frost
          className="absolute inset-0 backdrop-blur-[18px] backdrop-brightness-150 backdrop-saturate-125"
          style={{ opacity: frosted ? 1 : 0 }}
        >
          {frostedSrc ? (
            <Image
              src={frostedSrc}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 640px"
              className="object-cover"
              aria-hidden
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(196,222,242,0.32),rgba(123,162,196,0.16)_55%,rgba(58,92,124,0.22))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
        </div>
      </div>
    </div>
  );
}
