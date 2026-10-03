import { Composition } from "remotion";
import { reel, reelTimeline } from "../../content/reel";
import { Reel } from "./Reel";

const frames = Math.round(reelTimeline().duration * reel.fps);

export function Root() {
  return (
    <>
      {/* For sharing: carries its own top bar and progress line. */}
      <Composition
        id="Reel"
        component={Reel}
        defaultProps={{ chrome: true }}
        durationInFrames={frames}
        fps={reel.fps}
        width={reel.size}
        height={reel.size}
      />
      {/* For the hero, which draws that chrome around the video itself. */}
      <Composition
        id="ReelSite"
        component={Reel}
        defaultProps={{ chrome: false }}
        durationInFrames={frames}
        fps={reel.fps}
        width={reel.size}
        height={reel.size}
      />
    </>
  );
}
