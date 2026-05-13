"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Command } from "lucide-react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";
import { useCommandPalette } from "./CommandPaletteProvider";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
  { href: "/playground", label: "Playground" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { open } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300",
        scrolled && "pt-3",
      )}
    >
      <nav
        className={cn(
          "glass flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300",
          scrolled && "glass-strong",
        )}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium tracking-tight text-fg transition-colors hover:text-fg"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[var(--accent-fg)] font-display text-[11px]">
            U
          </span>
          <span className="hidden sm:inline">Ubaidullah</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                    active ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-[var(--glass-highlight)]" aria-hidden />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            aria-label="Open command palette"
            className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-fg-muted transition-colors hover:text-fg md:inline-flex"
          >
            <Command className="h-3 w-3" strokeWidth={2} />
            <span>K</span>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
