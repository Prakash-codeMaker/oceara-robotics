import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { O01Model, type SubsystemId } from "./O01Model";

function MarineSnow({ count = 280 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.04 + Math.random() * 0.08;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * dt * 4;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.3 + i) * dt * 0.05;
      if (arr[i * 3 + 1] < -6) arr[i * 3 + 1] = 6;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#b7d4d2"
        size={0.018}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CausticLight({ intensity = 1 }: { intensity?: number }) {
  const light = useRef<THREE.SpotLight>(null);
  useFrame(({ clock }) => {
    if (!light.current) return;
    const t = clock.elapsedTime;
    light.current.position.x = Math.sin(t * 0.25) * 1.4;
    light.current.position.z = Math.cos(t * 0.18) * 1.2;
    light.current.intensity = (1.6 + Math.sin(t * 0.7) * 0.35) * intensity;
  });
  return (
    <spotLight
      ref={light}
      position={[0, 8, 2]}
      angle={0.55}
      penumbra={0.9}
      intensity={1.8 * intensity}
      color="#9ad8d4"
      distance={18}
    />
  );
}

function Rig({
  depth,
  highlight,
  interactive,
  onSelect,
  onHover,
  reduced,
}: {
  depth: number;
  highlight: SubsystemId | null;
  interactive: boolean;
  onSelect?: (id: SubsystemId) => void;
  onHover?: (id: SubsystemId | null) => void;
  reduced: boolean;
}) {
  const robot = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (robot.current) {
      robot.current.position.y = THREE.MathUtils.lerp(
        robot.current.position.y,
        THREE.MathUtils.lerp(0.05, -0.45, depth),
        0.08,
      );
      robot.current.rotation.x = THREE.MathUtils.lerp(
        robot.current.rotation.x,
        THREE.MathUtils.lerp(-0.12, 0.22, depth) + (interactive ? -state.pointer.y * 0.025 : 0),
        0.08,
      );
      robot.current.rotation.y = THREE.MathUtils.lerp(
        robot.current.rotation.y,
        0.55 + (interactive ? state.pointer.x * 0.08 : 0),
        0.06,
      );
      robot.current.rotation.z = THREE.MathUtils.lerp(
        robot.current.rotation.z,
        interactive ? -state.pointer.x * 0.018 : 0.04,
        0.06,
      );
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[2.6, 0.85, 4.4]} fov={38} />
      <ambientLight intensity={0.16} color="#6aa0a8" />
      <hemisphereLight intensity={0.42} color="#cfe8ea" groundColor="#061118" />
      <directionalLight position={[4, 8, 2]} intensity={0.75} color="#dff7f7" />
      <directionalLight position={[-5, 2, -4]} intensity={0.18} color="#1a3d3a" />
      <CausticLight intensity={1 - depth * 0.55} />
      <fog attach="fog" args={["#07161c", 4 + depth * 2, 14 - depth * 3]} />
      <color attach="background" args={[depth > 0.6 ? "#04070a" : "#07141a"]} />
      <group ref={robot} rotation={[-0.12, 0.55, 0.04]} scale={1.12}>
        <O01Model
          highlight={highlight}
          interactive={interactive}
          onSelect={onSelect}
          onHover={onHover}
          spin={!reduced && !interactive}
        />
      </group>
      <ContactShadows
        position={[0, -2.1 + depth * 0.9, 0]}
        opacity={0.32}
        scale={8}
        blur={2.6}
        far={5}
        color="#000000"
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.8 + depth * 1.4, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40, 24, 24]} />
        <meshStandardMaterial
          color="#0b1a1c"
          roughness={1}
          metalness={0}
          transparent
          opacity={0.15 + depth * 0.45}
        />
      </mesh>
      <MarineSnow count={reduced ? 70 : 220} />
    </>
  );
}

export function HeroScene({
  depth,
  highlight,
  interactive,
  onSelect,
  onHover,
  reduced,
  dpr,
}: {
  depth: number;
  highlight: SubsystemId | null;
  interactive: boolean;
  onSelect?: (id: SubsystemId) => void;
  onHover?: (id: SubsystemId | null) => void;
  reduced: boolean;
  dpr: number;
}) {
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", cursor: interactive ? "grab" : "default" }}
    >
      <Suspense fallback={null}>
        <Rig
          depth={depth}
          highlight={highlight}
          interactive={interactive}
          onSelect={onSelect}
          onHover={onHover}
          reduced={reduced}
        />
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={2.4}
          maxDistance={6.5}
          minPolarAngle={0.7}
          maxPolarAngle={2.1}
          enableDamping
          dampingFactor={0.08}
          enabled={!reduced}
        />
      </Suspense>
    </Canvas>
  );
}
