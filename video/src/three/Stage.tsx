import { Environment, Grid, Lightformer } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect, type ReactNode } from "react";
import * as THREE from "three";
import { C } from "../theme";

type V3 = [number, number, number];

/**
 * The set every 3D shot shares: ink background with fog, the site's hairline
 * grid as a floor, soft studio light and one orange rim light.
 */
export function Stage({ children, floor = true }: { children: ReactNode; floor?: boolean }) {
  return (
    <>
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 7, 20]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, 2, -4]} intensity={2.2} color={C.accent} />
      <Environment resolution={256} frames={1}>
        {/* Big soft key from above, a cool strip on the right, an orange strip on the left */}
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[0, 6, 2]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#cfd6ff"
          position={[6, 1.5, 2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[2, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color={C.accent}
          position={[-6, 1, -1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.2, 8, 1]}
        />
        <Lightformer form="ring" intensity={1.2} position={[0, 2, 7]} scale={3} />
      </Environment>
      {floor && (
        <Grid
          position={[0, -0.001, 0]}
          infiniteGrid
          cellSize={0.5}
          sectionSize={2.5}
          cellThickness={0.6}
          sectionThickness={1}
          cellColor="#23242b"
          sectionColor="#3a3b45"
          fadeDistance={22}
          fadeStrength={1.6}
        />
      )}
      {children}
    </>
  );
}

/** Places the camera for this frame. */
export function Camera({ position, target, fov = 42 }: { position: V3; target: V3; fov?: number }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useLayoutEffect(() => {
    camera.position.set(...position);
    camera.fov = fov;
    camera.near = 0.05;
    camera.far = 60;
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
  });
  return null;
}
