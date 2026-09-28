"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type PortraitProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Small mono caption in the top-left corner, e.g. "Fig. 01". */
  figure?: string;
};

/**
 * Editorial portrait: a black-and-white halftone print with an accent
 * light. A lens follows the cursor and shows the colour photo underneath,
 * and a scan line sweeps the print once on load. Styles live under
 * `.portrait-*` in globals.css.
 */
export function Portrait({ src, alt, sizes, priority, className, figure }: PortraitProps) {
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--px", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--py", `${e.clientY - r.top}px`);
      }}
      className={cn("portrait surface relative overflow-hidden rounded-xl bg-black", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="portrait-mono object-cover"
      />
      <div aria-hidden className="portrait-halftone" />
      <div aria-hidden className="portrait-tint" />
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className="portrait-color object-cover"
      />
      <div aria-hidden className="portrait-lens-ring" />
      <div aria-hidden className="portrait-scan" />

      <span aria-hidden className="crop-mark top-3 left-3 border-t border-l" />
      <span aria-hidden className="crop-mark top-3 right-3 border-t border-r" />
      <span aria-hidden className="crop-mark bottom-3 left-3 border-b border-l" />
      <span aria-hidden className="crop-mark right-3 bottom-3 border-r border-b" />
      {figure && (
        <span aria-hidden className="label-mono absolute top-5 left-8 text-white/70">
          {figure}
        </span>
      )}
      <span aria-hidden className="label-mono absolute top-5 right-8 hidden text-white/70 sm:block">
        Hover for colour
      </span>
    </div>
  );
}
