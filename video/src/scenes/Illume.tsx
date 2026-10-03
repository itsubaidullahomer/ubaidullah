import type { SceneProps } from "../Reel";
import { beat } from "../beat";
import { Showcase, statLine } from "./Showcase";

export function Illume(_: SceneProps) {
  return (
    <Showcase
      src="images/screens/illume.jpg"
      ratio={7800 / 2160}
      scrollTo={0.55}
      tilt={0.36}
      keys={[
        { at: 0, pos: [-2.4, 1.9, 5.6], target: [0, 1.25, 0] },
        { at: beat(8), pos: [1.5, 1.35, 5.9], target: [0, 1.3, 0] },
      ]}
      accent="Insight-X → Illume"
      kicker="2024 – 25"
      line1="Dashboards that"
      line2="build themselves."
      bottom={(f) =>
        statLine(f, beat(4), "$250k", "raised on the back of it, live today as Illume")
      }
    />
  );
}
