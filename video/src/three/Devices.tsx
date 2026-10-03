import { RoundedBox } from "@react-three/drei";
import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { roundedRect } from "./assets";

type V3 = [number, number, number];

const ALU = { color: "#2b2d34", metalness: 0.9, roughness: 0.32 } as const;
const ALU_DARK = { color: "#16171c", metalness: 0.6, roughness: 0.55 } as const;

/** A screen surface: unlit, so screenshots keep their true colours. */
function Screen({
  w,
  h,
  r = 0,
  map,
  z = 0,
  y = 0,
  opacity = 1,
}: {
  w: number;
  h: number;
  r?: number;
  map: THREE.Texture | null;
  z?: number;
  y?: number;
  opacity?: number;
}) {
  const geo = useMemo(
    () => (r > 0 ? roundedRect(w, h, r) : new THREE.PlaneGeometry(w, h)),
    [w, h, r],
  );
  return (
    <mesh geometry={geo} position={[0, y, z]}>
      <meshBasicMaterial
        map={map ?? undefined}
        color={map ? "#ffffff" : "#0a0b10"}
        toneMapped={false}
        fog={false}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

/**
 * A dark aluminium laptop. `open` runs 0 (closed) → 1 (open, leaning back);
 * `screen` is the texture on the display, `overlay` an optional second one
 * drawn over it at `overlayOpacity` (for cross-fades between versions).
 */
export function Laptop({
  screen,
  overlay,
  overlayOpacity = 0,
  open = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  children,
}: {
  screen: THREE.Texture | null;
  overlay?: THREE.Texture | null;
  overlayOpacity?: number;
  open?: number;
  position?: V3;
  rotation?: V3;
  scale?: number;
  children?: ReactNode;
}) {
  const W = 3.1;
  const D = 2.1;
  const BASE_H = 0.09;
  const LID_H = 2.0;
  const LID_T = 0.055;
  const SW = 2.9;
  const SH = SW / 1.6;
  const lidAngle = THREE.MathUtils.lerp(Math.PI / 2, -0.2, open);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Base */}
      <RoundedBox args={[W, BASE_H, D]} radius={0.04} smoothness={4} position={[0, BASE_H / 2, 0]}>
        <meshStandardMaterial {...ALU} />
      </RoundedBox>
      {/* Keyboard well and trackpad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE_H + 0.001, -0.22]}>
        <planeGeometry args={[W * 0.86, D * 0.42]} />
        <meshStandardMaterial {...ALU_DARK} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, BASE_H + 0.001, 0.62]}>
        <planeGeometry args={[W * 0.36, D * 0.26]} />
        <meshStandardMaterial color="#202228" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Lid, hinged at the back edge of the base */}
      <group position={[0, BASE_H, -D / 2 + LID_T / 2]} rotation={[lidAngle, 0, 0]}>
        <RoundedBox
          args={[W, LID_H, LID_T]}
          radius={0.04}
          smoothness={4}
          position={[0, LID_H / 2, 0]}
        >
          <meshStandardMaterial {...ALU} />
        </RoundedBox>
        {/* Bezel and display */}
        <mesh position={[0, LID_H / 2, LID_T / 2 + 0.001]}>
          <planeGeometry args={[W - 0.08, LID_H - 0.08]} />
          <meshStandardMaterial color="#050507" metalness={0.2} roughness={0.15} />
        </mesh>
        <Screen w={SW} h={SH} map={screen} z={LID_T / 2 + 0.003} y={LID_H / 2 + 0.03} />
        {overlay && overlayOpacity > 0 && (
          <Screen
            w={SW}
            h={SH}
            map={overlay}
            z={LID_T / 2 + 0.004}
            y={LID_H / 2 + 0.03}
            opacity={overlayOpacity}
          />
        )}
        {children}
      </group>
    </group>
  );
}

/** A phone with rounded glass and a dynamic island. */
export function Phone({
  screen,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  screen: THREE.Texture | null;
  position?: V3;
  rotation?: V3;
  scale?: number;
}) {
  const W = 0.78;
  const H = 1.62;
  const T = 0.085;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[W, H, T]} radius={0.04} smoothness={6} bevelSegments={6}>
        <meshStandardMaterial {...ALU} roughness={0.28} />
      </RoundedBox>
      <Screen w={W - 0.05} h={H - 0.05} r={0.1} map={null} z={T / 2 + 0.001} />
      <Screen w={W - 0.075} h={H - 0.075} r={0.088} map={screen} z={T / 2 + 0.002} />
      {/* Dynamic island */}
      <mesh
        position={[0, H / 2 - 0.085, T / 2 + 0.003]}
        geometry={useMemo(() => roundedRect(0.2, 0.055, 0.0275), [])}
      >
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

/**
 * A floating browser window: a dark slab with a title bar and a screenshot
 * that can scroll.
 */
export function Panel({
  screen,
  w = 3.2,
  h = 2.1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  status = "#4fe3a3",
}: {
  screen: THREE.Texture | null;
  w?: number;
  h?: number;
  position?: V3;
  rotation?: V3;
  scale?: number;
  status?: string;
}) {
  const BAR = 0.14;
  const T = 0.03;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[w, h, T]} radius={0.035} smoothness={4}>
        <meshStandardMaterial color="#0c0d13" metalness={0.5} roughness={0.4} />
      </RoundedBox>
      {/* Title bar */}
      <mesh position={[0, h / 2 - BAR / 2 - 0.01, T / 2 + 0.001]}>
        <planeGeometry args={[w - 0.04, BAR]} />
        <meshBasicMaterial color="#12131a" toneMapped={false} />
      </mesh>
      <mesh position={[-w / 2 + 0.12, h / 2 - BAR / 2 - 0.01, T / 2 + 0.002]}>
        <circleGeometry args={[0.025, 24]} />
        <meshBasicMaterial color={status} toneMapped={false} />
      </mesh>
      <Screen w={w - 0.04} h={h - BAR - 0.04} map={screen} z={T / 2 + 0.002} y={-BAR / 2 - 0.0} />
    </group>
  );
}
