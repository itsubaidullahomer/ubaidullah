"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  Briefcase,
  User,
  Beaker,
  Mail,
  Cpu,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Download,
  Sun,
  Moon,
  Contrast,
} from "lucide-react";
import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  perform: () => void;
};

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const commands: Cmd[] = useMemo(
    () => [
      { id: "home", label: "Home", group: "Navigate", icon: Home, perform: () => router.push("/") },
      {
        id: "work",
        label: "Work",
        group: "Navigate",
        icon: Briefcase,
        perform: () => router.push("/work"),
      },
      {
        id: "about",
        label: "About",
        group: "Navigate",
        icon: User,
        perform: () => router.push("/about"),
      },
      { id: "now", label: "Now", group: "Navigate", icon: Cpu, perform: () => router.push("/now") },
      {
        id: "playground",
        label: "Playground",
        group: "Navigate",
        icon: Beaker,
        perform: () => router.push("/playground"),
      },
      {
        id: "contact",
        label: "Contact",
        group: "Navigate",
        icon: Mail,
        perform: () => router.push("/contact"),
      },
      ...projects.map<Cmd>((p) => ({
        id: `case-${p.slug}`,
        label: p.title,
        hint: "Case study",
        group: "Case studies",
        icon: Briefcase,
        perform: () => router.push(`/work/${p.slug}`),
      })),
      {
        id: "copy-email",
        label: "Copy email",
        hint: site.email,
        group: "Actions",
        icon: Copy,
        perform: () => navigator.clipboard?.writeText(site.email),
      },
      {
        id: "download-resume",
        label: "View CV",
        hint: "opens in a new tab",
        group: "Actions",
        icon: Download,
        perform: () => window.open(site.resumeUrl, "_blank"),
      },
      {
        id: "theme-dark",
        label: "Dark aurora",
        group: "Theme",
        icon: Moon,
        perform: () => setTheme("aurora-dark"),
      },
      {
        id: "theme-light",
        label: "Light aurora",
        group: "Theme",
        icon: Sun,
        perform: () => setTheme("aurora-light"),
      },
      {
        id: "theme-mono",
        label: "Monochrome",
        group: "Theme",
        icon: Contrast,
        perform: () => setTheme("monochrome"),
      },
      {
        id: "social-github",
        label: "GitHub",
        group: "Social",
        icon: Github,
        perform: () => window.open(site.socials.github.url, "_blank"),
      },
      {
        id: "social-linkedin",
        label: "LinkedIn",
        group: "Social",
        icon: Linkedin,
        perform: () => window.open(site.socials.linkedin.url, "_blank"),
      },
      {
        id: "social-instagram",
        label: "Instagram",
        group: "Social",
        icon: Instagram,
        perform: () => window.open(site.socials.instagram.url, "_blank"),
      },
    ],
    [router, setTheme],
  );

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.hint?.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Cmd[]>();
    filtered.forEach((c) => {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[selected];
        if (cmd) {
          cmd.perform();
          onClose();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, filtered, selected, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[rgba(0,0,0,0.55)] px-4 pt-[14vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: -8, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-xl overflow-hidden rounded-2xl"
          >
            <div className="border-border flex items-center gap-3 border-b px-4 py-3">
              <Search className="text-fg-muted h-4 w-4" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                placeholder="Search or jump to…"
                className="text-fg placeholder:text-fg-subtle w-full bg-transparent text-[15px] focus:outline-none"
              />
              <kbd className="border-border text-fg-subtle hidden rounded border px-1.5 py-0.5 text-[10px] sm:inline-block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="text-fg-muted px-4 py-8 text-center text-sm">No matches.</div>
              )}
              {(() => {
                let runningIdx = -1;
                return grouped.map(([group, items]) => (
                  <div key={group}>
                    <div className="text-fg-subtle px-4 pt-3 pb-1 text-[10px] tracking-[0.16em] uppercase">
                      {group}
                    </div>
                    {items.map((cmd) => {
                      runningIdx += 1;
                      const isSel = runningIdx === selected;
                      const Icon = cmd.icon;
                      const myIdx = runningIdx;
                      return (
                        <button
                          key={cmd.id}
                          onMouseEnter={() => setSelected(myIdx)}
                          onClick={() => {
                            cmd.perform();
                            onClose();
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors",
                            isSel
                              ? "text-fg bg-[var(--glass-highlight)]"
                              : "text-fg-muted hover:text-fg",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                          <span className="flex-1 truncate">{cmd.label}</span>
                          {cmd.hint && (
                            <span className="text-fg-subtle hidden text-xs sm:inline">
                              {cmd.hint}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>

            <div className="border-border text-fg-subtle flex items-center justify-between border-t px-4 py-2 text-[11px]">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> select
                </span>
              </div>
              <span>{filtered.length} commands</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
