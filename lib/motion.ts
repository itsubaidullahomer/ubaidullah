/** Shared motion vocabulary. Three durations, two easings, one stagger. */
export const dur = { fast: 0.18, base: 0.4, slow: 0.8 } as const;
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};
export const stagger = 0.07;
