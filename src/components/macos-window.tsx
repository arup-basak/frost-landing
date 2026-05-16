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
      className={`relative overflow-hidden rounded-xl border border-white/70 bg-frost-mist shadow-[0_30px_60px_-25px_rgba(22,32,43,0.45)] ${className}`}
    >
      <div className="flex h-9 items-center gap-2 border-frost-edge/70 border-b bg-white/80 px-4">
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
          <div className="absolute inset-0 bg-gradient-to-br from-white via-frost-mist to-frost-pale">
            {children}
          </div>
        )}

        {/* Frost layer — GSAP target. Blurs the recognisable content behind it. */}
        <div
          data-frost
          className="absolute inset-0 backdrop-blur-[11px]"
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
          ) : (
            <div className="absolute inset-0 bg-frost-pale/45" />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-white/45 to-frost-deep/30" />
        </div>
      </div>
    </div>
  );
}
