import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { O01Model } from "./O01Model";

export function AnatomyScene({
  exploded,
  dpr,
}: {
  exploded: number;
  dpr: number;
}) {
  return (
    <Canvas dpr={dpr} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#04070a"]} />
      <fog attach="fog" args={["#04070a", 6, 14]} />
      <PerspectiveCamera makeDefault position={[3.2, 0.4, 3.8]} fov={40} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#e8ece8" />
      <directionalLight position={[-3, -1, -2]} intensity={0.3} color="#7ee0d0" />
      <group rotation={[0.15, 0.6, 0]}>
        <O01Model exploded={exploded} spin={exploded < 0.08} />
      </group>
      <OrbitControls enablePan={false} minDistance={2.5} maxDistance={7} />
    </Canvas>
  );
}
