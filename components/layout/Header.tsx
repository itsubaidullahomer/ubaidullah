"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Command, FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { useCommandPalette } from "./CommandPaletteProvider";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/now", label: "Now" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Escape closes it; lock body scroll while it's open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300",
        scrolled && "pt-3",
      )}
    >
      <nav
        className={cn(
          "glass relative flex w-full max-w-5xl items-center justify-between gap-2 rounded-full px-3 py-2 transition-all duration-300 sm:gap-4",
          scrolled && "glass-strong",
        )}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-fg hover:text-fg flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium tracking-tight transition-colors"
        >
          <Image
            src="/images/avatar.png"
            alt=""
            width={24}
            height={24}
            priority
            className="h-6 w-6 rounded-full object-cover"
          />
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
                    <span
                      className="absolute inset-0 rounded-full bg-[var(--glass-highlight)]"
                      aria-hidden
                    />
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
            className="glass text-fg-muted hover:text-fg hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-colors md:inline-flex"
          >
            <Command className="h-3 w-3" strokeWidth={2} />
            <span>K</span>
          </button>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--accent-fg)] transition-all hover:shadow-[0_4px_20px_-4px_var(--accent-glow)]"
          >
            <FileText className="h-3 w-3" strokeWidth={2} />
            <span>CV</span>
          </a>
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="text-fg-muted hover:text-fg grid h-8 w-8 place-items-center rounded-full transition-colors md:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile menu — the nav list is desktop-only, so phones need this. */}
        {menuOpen && (
          <div
            id="mobile-nav"
            className="glass-strong absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-[var(--radius-glass)] p-2 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm transition-colors",
                        active
                          ? "text-fg bg-[var(--glass-highlight)]"
                          : "text-fg-muted hover:text-fg hover:bg-[var(--glass-highlight)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
