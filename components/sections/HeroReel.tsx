"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { reel, reelTimeline } from "@/content/reel";
import { cn } from "@/lib/cn";

const { chapters, duration } = reelTimeline();

function timecode(s: number) {
  const t = Math.max(0, Math.floor(s));
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

function chapterAt(time: number) {
  const i = chapters.findIndex((c) => time >= c.start && time < c.end);
  return i === -1 ? chapters.length - 1 : i;
}

const iconButton =
  "text-fg-muted hover:text-fg focus-visible:ring-accent inline-flex h-7 w-7 items-center justify-center rounded-sm transition-colors focus-visible:ring-1 focus-visible:outline-none";

/**
 * The hero reel: a vertical film in a monitor frame. On wide screens a chapter
 * index sits beside it; below that, a rail under it. Both track playback and
 * seek on click. Autoplays muted only when motion is welcome, pauses
 * off-screen, and always has a visible pause control (and a sound control
 * when the film has a soundtrack).
 */
export function HeroReel({ className }: { className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  // One fill per chapter in each layout (index and rail); only one is visible.
  const fills = useRef<Array<HTMLSpanElement | null>>([]);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  // True when autoplay wasn't allowed (reduced motion, data saver, browser policy)
  // and the reel hasn't been started yet: that's when it shows a big play button.
  const [waiting, setWaiting] = useState(false);
  const [muted, setMuted] = useState(true);
  const [index, setIndex] = useState(0);
  const [second, setSecond] = useState(0);

  // Draw the progress and clock from the video's own time.
  const sync = useCallback(() => {
    const v = video.current;
    if (!v) return;
    const t = v.currentTime;
    fills.current.forEach((el, k) => {
      if (!el) return;
      const c = chapters[k % chapters.length];
      const p = Math.min(1, Math.max(0, (t - c.start) / c.seconds));
      el.style.transform = el.dataset.axis === "y" ? `scaleY(${p})` : `scaleX(${p})`;
    });
    setIndex(chapterAt(t));
    setSecond(Math.floor(t));
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      sync();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, sync]);

  // Autoplay when it's welcome; pause while it's off-screen.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (reduced || saveData) {
      userPaused.current = true;
      setWaiting(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current)
          v.play().catch((e: DOMException) => {
            // Only a policy block needs the button; an abort just means it scrolled away.
            if (e.name === "NotAllowedError") setWaiting(true);
          });
        else if (!entry.isIntersecting) v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };

  const seek = (i: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = chapters[i].start + 0.05;
    sync();
    // Picking a chapter before the reel has ever played is a request to watch it.
    if (waiting) userPaused.current = false;
    if (v.paused && !userPaused.current) v.play().catch(() => {});
  };

  const fullscreen = () => {
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.();
  };

  const current = chapters[index];

  const caption = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex min-w-0 flex-1 items-start justify-between gap-5 lg:flex-col lg:justify-start lg:gap-4"
      >
        <p className="text-fg-muted min-w-0 text-[13px] leading-snug text-pretty">
          <span className="text-fg">{current.label}.</span> {current.caption}
          {current.href && (
            <Link
              href={current.href}
              className="text-fg-subtle hover:text-accent ml-1.5 inline-flex items-center gap-0.5 whitespace-nowrap transition-colors"
            >
              Open
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          )}
        </p>
        {current.readout && (
          <div className="shrink-0 text-right lg:text-left">
            <div className="font-display text-fg text-2xl leading-none tracking-[-0.02em] md:text-[1.75rem]">
              {current.readout.value}
            </div>
            <div className="label-mono text-fg-subtle mt-1.5 max-w-[11rem] text-[10px] leading-snug">
              {current.readout.label}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <figure className={cn("relative", className)}>
      {/* Registration marks at the corners. */}
      {(
        [
          "-left-2 -top-2 border-l border-t",
          "-right-2 -top-2 border-r border-t",
          "-bottom-2 -left-2 border-b border-l",
          "-right-2 -bottom-2 border-r border-b",
        ] as const
      ).map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn("border-accent pointer-events-none absolute h-3.5 w-3.5", pos)}
        />
      ))}

      <div className="surface overflow-hidden rounded-lg">
        {/* Status bar */}
        <div className="label-mono text-fg-subtle border-border flex h-10 items-center justify-between gap-3 border-b px-3.5">
          <span className="flex min-w-0 items-center gap-2">
            <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
              {playing && (
                <span className="bg-accent absolute inline-flex h-full w-full animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full opacity-70" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-1.5 w-1.5 rounded-full",
                  playing ? "bg-accent" : "bg-fg-subtle",
                )}
              />
            </span>
            <span className="text-fg-muted">Reel</span>
            <span aria-hidden>·</span>
            <span className="truncate">{current.label}</span>
          </span>
          <span className="-mr-1.5 flex shrink-0 items-center gap-1">
            <span className="mr-2 tabular-nums">
              <span className="text-fg-muted">{timecode(second)}</span> / {timecode(duration)}
            </span>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause the reel" : "Play the reel"}
              className={iconButton}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            {reel.music && (
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Turn the sound on" : "Turn the sound off"}
                aria-pressed={!muted}
                className={iconButton}
              >
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
            )}
            <button
              type="button"
              onClick={fullscreen}
              aria-label="Watch the reel full screen"
              className={cn(iconButton, "hidden sm:inline-flex")}
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </span>
        </div>

        <div className="lg:flex">
          {/* Chapter index, beside the film on wide screens. */}
          <div className="border-border hidden w-[12.5rem] shrink-0 flex-col border-r lg:flex">
            <ol className="flex flex-col py-2">
              {chapters.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => seek(i)}
                    aria-label={`Chapter ${i + 1}: ${c.label}`}
                    aria-current={i === index ? "step" : undefined}
                    className={cn(
                      "group focus-visible:ring-accent relative flex w-full items-center gap-3 py-2 pr-3 pl-4 text-left transition-colors focus-visible:ring-1 focus-visible:outline-none focus-visible:ring-inset",
                      i === index ? "bg-tint" : "hover:bg-tint",
                    )}
                  >
                    {/* Vertical progress, as tall as the row. */}
                    <span className="bg-border absolute top-0 bottom-0 left-0 w-[2px] overflow-hidden">
                      <span
                        ref={(el) => {
                          fills.current[i] = el;
                        }}
                        data-axis="y"
                        className={cn(
                          "absolute inset-0 origin-top scale-y-0",
                          i === index ? "bg-accent" : "bg-fg-subtle",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "label-mono text-[10px]",
                        i === index ? "text-accent" : "text-fg-subtle",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "truncate text-[13px] transition-colors",
                        i === index ? "text-fg" : "text-fg-muted group-hover:text-fg",
                      )}
                    >
                      {c.label}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="border-border mt-auto min-h-[11rem] border-t px-4 pt-4 pb-5">
              {caption}
            </div>
          </div>

          {/* The film, 9:16. Its height drives its width on wide screens. */}
          <div className="bg-bg relative aspect-[9/16] w-full lg:h-[min(68vh,42rem)] lg:w-auto lg:shrink-0">
            <video
              ref={video}
              className="absolute inset-0 h-full w-full cursor-pointer"
              poster={reel.src.poster}
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              aria-label="A short film of Ubaidullah Omer's work: Tututor.ai, Illume, Viloi, Ali Foodies, earlier projects, and work under NDA. Chapters are listed with it."
              onClick={toggle}
              onPlay={() => {
                setPlaying(true);
                setWaiting(false);
              }}
              onPause={() => {
                setPlaying(false);
                sync();
              }}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
              onSeeked={sync}
            >
              <source src={reel.src.small} type="video/mp4" media="(max-width: 767px)" />
              <source src={reel.src.large} type="video/mp4" />
              <source
                src={reel.src.fallback}
                type="video/webm"
                onError={() => {
                  setPlaying(false);
                  setWaiting(true);
                }}
              />
            </video>
            {waiting && (
              <button
                type="button"
                onClick={toggle}
                aria-label="Play the reel"
                className="group absolute inset-0"
              >
                <span className="bg-accent text-accent-fg label-mono absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-sm px-3.5 py-2.5 transition-transform group-hover:-translate-y-0.5">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Play reel · {timecode(duration)}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Chapter rail, under the film below wide screens. */}
        <div className="border-border border-t px-3.5 pt-3 pb-4 lg:hidden">
          <ol className="flex gap-1">
            {chapters.map((c, i) => (
              <li key={c.id} style={{ flexGrow: c.seconds, flexBasis: 0 }} className="min-w-0">
                <button
                  type="button"
                  onClick={() => seek(i)}
                  aria-label={`Chapter ${i + 1}: ${c.label}`}
                  aria-current={i === index ? "step" : undefined}
                  title={c.label}
                  className="group focus-visible:ring-accent block w-full rounded-[2px] py-1 text-left focus-visible:ring-1 focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "label-mono block truncate text-[10px] transition-colors",
                      i === index ? "text-accent" : "text-fg-subtle group-hover:text-fg-muted",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="bg-border group-hover:bg-border-strong relative mt-1.5 block h-[3px] overflow-hidden transition-colors">
                    <span
                      ref={(el) => {
                        fills.current[chapters.length + i] = el;
                      }}
                      data-axis="x"
                      className={cn(
                        "absolute inset-0 origin-left scale-x-0",
                        i === index ? "bg-accent" : "bg-fg-subtle",
                      )}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex min-h-[3.25rem] items-start justify-between gap-5">
            {caption}
          </div>
        </div>
      </div>
    </figure>
  );
}
