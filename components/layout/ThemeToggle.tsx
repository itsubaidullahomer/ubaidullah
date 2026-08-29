"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Contrast } from "lucide-react";
import { cn } from "@/lib/cn";

const themes = [
  { id: "aurora-dark", label: "Dark aurora", icon: Moon },
  { id: "aurora-light", label: "Light aurora", icon: Sun },
  { id: "monochrome", label: "Monochrome", icon: Contrast },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="glass inline-flex items-center gap-0.5 rounded-full p-0.5"
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const active = mounted && theme === t.id;
        return (
          <button
            key={t.id}
            role="radio"
            aria-checked={active}
            aria-label={t.label}
            title={t.label}
            onClick={() => setTheme(t.id)}
            className={cn(
              "text-fg-muted relative grid h-7 w-7 place-items-center rounded-full transition-all",
              active && "text-fg bg-[var(--glass-highlight)]",
              !active && "hover:text-fg",
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        );
      })}
    </div>
  );
}
