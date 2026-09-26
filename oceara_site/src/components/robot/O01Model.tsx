import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThreeEvent } from "@react-three/fiber";

export type SubsystemId =
  | "perception"
  | "navigation"
  | "compute"
  | "propulsion"
  | "payload"
  | "communication"
  | "power";

export const SUBSYSTEMS: {
  id: SubsystemId;
  label: string;
  copy: string;
}[] = [
  {
    id: "perception",
    label: "PERCEPTION",
    copy: "Optical and acoustic sensing for environments where visibility can change dramatically.",
  },
  {
    id: "navigation",
    label: "NAVIGATION",
    copy: "Local localization, obstacle avoidance, and mission path planning without GPS.",
  },
  {
    id: "compute",
    label: "COMPUTE",
    copy: "Onboard compute running the autonomy stack close to the sensors and actuators.",
  },
  {
    id: "propulsion",
    label: "PROPULSION",
    copy: "Vectored thrusters for transit, hover, and attitude control in current.",
  },
  {
    id: "payload",
    label: "PAYLOAD",
    copy: "Modular scientific and recovery payload bay. Interchangeable with the mission.",
  },
  {
    id: "communication",
    label: "COMMUNICATION",
    copy: "Acoustic link below the surface. Radio and satellite only at or near the surface.",
  },
  {
    id: "power",
    label: "POWER",
    copy: "Pressure-tolerant energy storage and power management. Endurance is a design goal.",
  },
];

type Props = {
  exploded?: number;
  highlight?: SubsystemId | null;
  interactive?: boolean;
  onSelect?: (id: SubsystemId) => void;
  onHover?: (id: SubsystemId | null) => void;
  spin?: boolean;
};

function useMaterials() {
  return useMemo(() => {
    const hull = new THREE.MeshStandardMaterial({
      color: "#1c2228",
      metalness: 0.82,
      roughness: 0.32,
    });
    const hullDark = new THREE.MeshStandardMaterial({
      color: "#101418",
      metalness: 0.78,
      roughness: 0.4,
    });
    const titanium = new THREE.MeshStandardMaterial({
      color: "#8a9198",
      metalness: 0.95,
      roughness: 0.22,
    });
    const payload = new THREE.MeshStandardMaterial({
      color: "#d9d2c5",
      metalness: 0.15,
      roughness: 0.55,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#cfe8ea",
      metalness: 0.05,
      roughness: 0.05,
      transmission: 0.72,
      thickness: 0.35,
      transparent: true,
      opacity: 0.55,
      ior: 1.45,
    });

    const cyan = new THREE.MeshStandardMaterial({
      color: "#7ee0d0",
      emissive: "#7ee0d0",
      emissiveIntensity: 1.4,
      metalness: 0.2,
      roughness: 0.3,
    });
    const amber = new THREE.MeshStandardMaterial({
      color: "#c9a66b",
      emissive: "#c9a66b",
      emissiveIntensity: 0.9,
      metalness: 0.3,
      roughness: 0.4,
    });
    const black = new THREE.MeshStandardMaterial({
      color: "#07090c",
      metalness: 0.4,
      roughness: 0.6,
    });
    const sonar = new THREE.MeshStandardMaterial({
      color: "#2a3338",
      metalness: 0.5,
      roughness: 0.45,
    });
    return {
      hull,
      hullDark,
      titanium,
      payload,
      glass,
      cyan,
      amber,
      black,
      sonar,
    };
  }, []);
}



export function O01Model({
  exploded = 0,
  highlight = null,
  interactive = false,
  onSelect,
  onHover,
  spin = true,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const rotor = useRef<THREE.Group>(null);
  const mats = useMaterials();
  const [hovered, setHovered] = useState<SubsystemId | null>(null);
  const active = highlight ?? hovered;

  useFrame((_, dt) => {
    if (spin && group.current && exploded < 0.05) {
      group.current.rotation.y += dt * 0.12;
    }
    if (rotor.current) {
      rotor.current.rotation.z += dt * 8;
    }
  });

  const e = exploded;
  const shift = (y: number, amount: number) => y + amount * e;

  const handle =
    (id: SubsystemId) =>
    (ev: ThreeEvent<PointerEvent>) => {
      if (!interactive) return;
      ev.stopPropagation();
      onSelect?.(id);
    };

  const hover =
    (id: SubsystemId | null) =>
    (ev?: ThreeEvent<PointerEvent>) => {
      if (!interactive) return;
      ev?.stopPropagation();
      setHovered(id);
      onHover?.(id);
    };

  return (
    <group
      ref={group}
      onPointerMissed={() => {
        setHovered(null);
        onHover?.(null);
      }}
    >
      <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Main pressure hull */}
      <group
        position={[0, shift(0, 0), 0]}
        scale={active === "compute" ? 1.05 : 1}
        onPointerOver={hover("compute")}
        onPointerOut={hover(null)}
        onClick={handle("compute")}
      >
        <mesh material={mats.hull} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 1.55, 32]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.55, 0]} material={mats.titanium}>
          <torusGeometry args={[0.282, 0.018, 12, 40]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.15, 0]} material={mats.titanium}>
          <torusGeometry args={[0.282, 0.018, 12, 40]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.72, 0]} material={mats.titanium}>
          <torusGeometry args={[0.282, 0.016, 12, 40]} />
        </mesh>
        {/* Cyan status ring */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.2, 0]} material={mats.cyan}>
          <torusGeometry args={[0.286, 0.006, 8, 40]} />
        </mesh>
      </group>

      {/* Nose / perception */}
      <group
        position={[0, shift(1.02, 0.55), 0]}
        scale={active === "perception" ? 1.08 : 1}
        onPointerOver={hover("perception")}
        onPointerOut={hover(null)}
        onClick={handle("perception")}
      >
        <mesh material={mats.hullDark}>
          <cylinderGeometry args={[0.22, 0.28, 0.28, 32]} />
        </mesh>
        <mesh position={[0, 0.22, 0]} material={mats.glass}>
          <sphereGeometry args={[0.22, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, 0.12, 0]} material={mats.black}>
          <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
        </mesh>
        <mesh position={[0, 0.18, 0]} material={mats.cyan}>
          <sphereGeometry args={[0.05, 16, 12]} />
        </mesh>
        {/* Light bars */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[0.16 * s, 0.02, 0.16]} rotation={[0.4, 0, 0]} material={mats.amber}>
            <boxGeometry args={[0.04, 0.04, 0.14]} />
          </mesh>
        ))}
        {/* Imaging sonar chin */}
        <mesh position={[0, -0.12, 0.18]} rotation={[0.6, 0, 0]} material={mats.sonar}>
          <boxGeometry args={[0.28, 0.06, 0.16]} />
        </mesh>
      </group>

      {/* Rear / navigation housing */}
      <group
        position={[0, shift(-1.02, -0.45), 0]}
        scale={active === "navigation" ? 1.08 : 1}
        onPointerOver={hover("navigation")}
        onPointerOut={hover(null)}
        onClick={handle("navigation")}
      >
        <mesh material={mats.hullDark}>
          <cylinderGeometry args={[0.28, 0.18, 0.38, 32]} />
        </mesh>
        {/* Fins */}
        {[0, 90, 180, 270].map((deg) => (
          <mesh
            key={deg}
            rotation={[0, THREE.MathUtils.degToRad(deg), 0]}
            position={[0, -0.05, 0]}
            material={mats.hull}
          >
            <boxGeometry args={[0.02, 0.22, 0.34]} />
          </mesh>
        ))}
        <mesh position={[0, -0.26, 0]} material={mats.titanium}>
          <cylinderGeometry args={[0.06, 0.08, 0.12, 12]} />
        </mesh>
      </group>

      {/* Mid thruster ring / propulsion */}
      <group
        position={[0, shift(-0.15, 0), 0]}
        scale={active === "propulsion" ? 1.08 : 1}
        onPointerOver={hover("propulsion")}
        onPointerOut={hover(null)}
        onClick={handle("propulsion")}
      >
        {[0, 90, 180, 270].map((deg, i) => {
          const r = 0.48;
          const rad = THREE.MathUtils.degToRad(deg);
          const x = Math.cos(rad) * r;
          const z = Math.sin(rad) * r;
          return (
            <group key={deg} position={[x, 0, z]} rotation={[Math.PI / 2, 0, rad]}>
              <mesh material={mats.titanium}>
                <cylinderGeometry args={[0.13, 0.13, 0.08, 20]} />
              </mesh>
              <mesh material={mats.hullDark}>
                <cylinderGeometry args={[0.11, 0.11, 0.09, 20, 1, true]} />
              </mesh>
              <group ref={i === 0 ? rotor : undefined}>
                <mesh material={mats.black}>
                  <boxGeometry args={[0.18, 0.012, 0.03]} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} material={mats.black}>
                  <boxGeometry args={[0.18, 0.012, 0.03]} />
                </mesh>
              </group>
            </group>
          );
        })}
        {/* Vertical hover thrusters */}
        {[-1, 1].map((s) => (
          <group key={s} position={[0.38 * s, 0.22, 0]} rotation={[0, 0, 0]}>
            <mesh material={mats.titanium}>
              <cylinderGeometry args={[0.1, 0.1, 0.07, 16]} />
            </mesh>
            <mesh material={mats.hullDark}>
              <cylinderGeometry args={[0.08, 0.08, 0.08, 16, 1, true]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Payload sled */}
      <group
        position={[0, shift(-0.22, -0.7), 0.42]}
        scale={active === "payload" ? 1.1 : 1}
        onPointerOver={hover("payload")}
        onPointerOut={hover(null)}
        onClick={handle("payload")}
      >
        <mesh material={mats.payload} rotation={[0.05, 0, 0]}>
          <boxGeometry args={[0.42, 0.7, 0.16]} />
        </mesh>
        <mesh position={[0, 0.05, 0.09]} material={mats.hullDark}>
          <boxGeometry args={[0.32, 0.48, 0.04]} />
        </mesh>
        <mesh position={[0.16, 0.28, 0.02]} material={mats.amber}>
          <boxGeometry args={[0.04, 0.08, 0.04]} />
        </mesh>
      </group>

      {/* Dorsal comms mast */}
      <group
        position={[0, shift(-0.55, 0.85), -0.32]}
        scale={active === "communication" ? 1.15 : 1}
        onPointerOver={hover("communication")}
        onPointerOut={hover(null)}
        onClick={handle("communication")}
      >
        <mesh material={mats.titanium}>
          <cylinderGeometry args={[0.025, 0.03, 0.28, 10]} />
        </mesh>
        <mesh position={[0, 0.2, 0]} material={mats.cyan}>
          <sphereGeometry args={[0.035, 12, 12]} />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.sonar}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
        </mesh>
      </group>

      {/* Battery / power pack (internal-looking module on hull) */}
      <group
        position={[0, shift(0.35, -0.95), 0]}
        scale={active === "power" ? 1.1 : 1}
        onPointerOver={hover("power")}
        onPointerOut={hover(null)}
        onClick={handle("power")}
      >
        <mesh material={mats.hullDark}>
          <boxGeometry args={[0.5, 0.42, 0.22]} />
        </mesh>
        <mesh position={[0, 0, 0.12]} material={mats.cyan}>
          <boxGeometry args={[0.22, 0.02, 0.01]} />
        </mesh>
      </group>

      {/* Side sonar panels — navigation/perception */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[0.3 * s, shift(0.15, 0), 0]}
          rotation={[0, 0, 0.12 * s]}
          material={mats.sonar}
          onPointerOver={hover("perception")}
          onPointerOut={hover(null)}
          onClick={handle("perception")}
        >
          <boxGeometry args={[0.03, 0.55, 0.16]} />
        </mesh>
      ))}
      </group>
    </group>
  );
}


