type UsesGroup = {
  heading: string;
  items: Array<{ name: string; detail?: string }>;
};

export const uses: UsesGroup[] = [
  {
    heading: "Editor",
    items: [
      { name: "VS Code", detail: "Default editor. Vim mode off — I just like good defaults." },
      { name: "Cursor", detail: "When I'm doing AI-heavy refactors." },
      { name: "Claude Code", detail: "Pair-programming partner for the deep work." },
    ],
  },
  {
    heading: "Stack I reach for",
    items: [
      { name: "Next.js + TypeScript", detail: "Default for anything user-facing in 2026." },
      { name: "Tailwind CSS", detail: "Speed of iteration beats design-system overhead." },
      { name: "MongoDB", detail: "Where most of my production data still lives." },
      { name: "Anthropic Claude + OpenAI", detail: "Routed based on task. Claude for reasoning, GPT for speed." },
      { name: "Vercel", detail: "DX that gets out of my way." },
    ],
  },
  {
    heading: "Hardware",
    items: [
      { name: "MacBook Pro", detail: "My daily driver." },
      { name: "External monitor", detail: "More vertical pixels = more thinking room." },
    ],
  },
  {
    heading: "Daily",
    items: [
      { name: "Linear", detail: "For projects with a team." },
      { name: "Notion", detail: "For everything else." },
      { name: "Arc / Brave", detail: "Profiles separated by client / context." },
    ],
  },
];
