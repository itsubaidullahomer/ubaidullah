import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Shot } from "@/content/types";

/** A store screenshot inside a simple phone bezel. */
export function PhoneFrame({
  shot,
  sizes = "240px",
  priority,
  className,
}: {
  shot: Shot;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-[var(--border-strong)] bg-black p-1.5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.6rem]">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          sizes={sizes}
          priority={priority}
          quality={75}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
