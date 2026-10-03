import type { SceneProps } from "../Reel";
import { beat, hit } from "../beat";
import { C, mono } from "../theme";
import { Showcase } from "./Showcase";

const STACK = ["OpenAI", "Anthropic", "Gemini", "Stripe"];

export function Viloi(_: SceneProps) {
  return (
    <Showcase
      src="images/screens/viloi.jpg"
      ratio={7800 / 2160}
      scrollTo={0.4}
      tilt={-0.36}
      keys={[
        { at: 0, pos: [2.4, 1.9, 5.6], target: [0, 1.25, 0] },
        { at: beat(8), pos: [-1.5, 1.35, 5.9], target: [0, 1.3, 0] },
      ]}
      accent="Viloi.com"
      kicker="Built solo"
      line1="AI text, rewritten"
      line2="to read like a person."
      bottom={(f) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {STACK.map((s, i) => (
            <span
              key={s}
              style={{
                ...mono,
                fontSize: 30,
                color: C.fg,
                border: `2px solid ${i === STACK.length - 1 ? C.accent : C.borderStrong}`,
                borderRadius: 999,
                padding: "16px 28px",
                opacity: hit(f, beat(4 + i * 0.5), 6),
                transform: `scale(${1.3 - 0.3 * hit(f, beat(4 + i * 0.5), 6)})`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    />
  );
}
