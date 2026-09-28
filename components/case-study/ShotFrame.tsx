import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Shot } from "@/content/types";

/**
 * A screenshot in a thin window frame. Clicking opens the full-size image,
 * because product screenshots are unreadable at card size.
 */
export function ShotFrame({
  shot,
  sizes,
  label,
  className,
}: {
  shot: Shot;
  sizes: string;
  label?: string;
  className?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        className="border-border bg-bg-elevated group/shot relative block overflow-hidden rounded-lg border"
      >
        <div className="border-border flex items-center gap-1.5 border-b px-3 py-2" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]/70" />
          {label && (
            <span className="text-fg-muted ml-2 truncate font-mono text-[10px]">{label}</span>
          )}
        </div>
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          sizes={sizes}
          quality={75}
          className="block h-auto w-full transition-transform duration-500 group-hover/shot:scale-[1.015]"
        />
      </a>
      {shot.caption && (
        <figcaption className="text-fg-subtle mt-2.5 text-xs leading-relaxed text-pretty">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}
