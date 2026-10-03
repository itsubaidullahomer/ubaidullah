import { Composition } from "remotion";
import { reel } from "../../content/reel";
import { Reel, TOTAL_FRAMES } from "./Reel";

export function Root() {
  return (
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={TOTAL_FRAMES}
      fps={reel.fps}
      width={reel.width}
      height={reel.height}
    />
  );
}
