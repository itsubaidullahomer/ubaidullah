import { ThreeCanvas } from "@remotion/three";
import type { ReactNode } from "react";
import { reel } from "../../../content/reel";
import { Stage } from "./Stage";

/** A full-frame 3D shot on the shared stage. */
export function Scene3D({ children, floor = true }: { children: ReactNode; floor?: boolean }) {
  return (
    <ThreeCanvas
      width={reel.width}
      height={reel.height}
      camera={{ fov: 50, position: [0, 2, 6] }}
      gl={{ antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Stage floor={floor}>{children}</Stage>
    </ThreeCanvas>
  );
}
