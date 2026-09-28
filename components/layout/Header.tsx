"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { Command, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { useCommandPalette } from "./CommandPaletteProvider";
import { LocalClock } from "./LocalClock";

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
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Escape closes it; freeze scrolling while it's open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || menuOpen ? "bg-bg/95 border-border border-b" : "border-b border-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between gap-4 px-5 md:h-16 md:px-8"
        aria-label="Primary"
      >
        {/* Wordmark */}
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-fg text-[22px] leading-none tracking-[-0.02em]">
            Ubaidullah
          </span>
          <span className="label-mono text-fg-subtle group-hover:text-fg-muted hidden whitespace-nowrap transition-colors lg:inline">
            / product engineer
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-[13px] transition-colors",
                    active ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {active && (
                    <span aria-hidden className="bg-accent absolute inset-x-3 -bottom-px h-px" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster: readout + actions */}
        <div className="flex items-center gap-2">
          <div className="label-mono text-fg-subtle hidden items-center gap-3 pr-2 whitespace-nowrap xl:flex">
            <span className="inline-flex items-center gap-1.5">
              <span className="bg-ok h-1.5 w-1.5 rounded-full" />
              <span className="text-fg-muted">Available</span>
            </span>
            <span aria-hidden className="bg-border-strong h-3 w-px" />
            <LocalClock />
          </div>

          <button
            onClick={open}
            aria-label="Open command palette"
            className="label-mono text-fg-muted hover:text-fg border-border hover:border-border-strong hidden h-8 items-center gap-1.5 rounded-md border px-2.5 transition-colors md:inline-flex"
          >
            <Command className="h-3 w-3" strokeWidth={2} />
            <span>K</span>
          </button>

          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-accent-fg hover:bg-accent-bright inline-flex h-8 items-center rounded-md px-3 text-[12px] font-medium transition-colors"
          >
            CV
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="text-fg-muted hover:text-fg grid h-8 w-8 place-items-center rounded-md transition-colors md:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu: full-bleed ink panel with display-size links. */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="bg-bg fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col overflow-y-auto px-5 pt-6 pb-8 md:hidden"
        >
          <ul className="divide-border border-border flex flex-col divide-y border-b">
            {NAV.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-baseline justify-between py-4 transition-colors",
                      active ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    <span className="font-display text-4xl leading-none tracking-[-0.02em]">
                      {item.label}
                    </span>
                    <span className="label-mono text-fg-subtle">0{i + 1}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="label-mono text-fg-subtle mt-auto flex flex-col gap-3 pt-10">
            <span className="inline-flex items-center gap-2">
              <span className="bg-ok h-1.5 w-1.5 rounded-full" />
              <span className="text-fg-muted">{site.availability}</span>
            </span>
            <span>
              {site.location} · <LocalClock />
            </span>
            <a href={`mailto:${site.email}`} className="text-fg-muted tracking-normal normal-case">
              {site.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
