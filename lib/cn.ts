import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * clsx + tailwind-merge. The custom type-scale utilities from globals.css
 * are registered as font sizes so they never get merged away by a colour
 * class like `text-fg`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "heading"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
