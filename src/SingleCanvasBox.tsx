import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const clock = new THREE.Clock();
const PARTICLE_LIFETIME = 1.5;

// === 粒子元件 ===
function PetalParticle({
    position,
    color,
    size,
}: {
    position: [number, number, number];
    color: string;
    size: [number, number, number];
}) {
    const mesh = React.useRef<THREE.Mesh>(null);
    const startTime = React.useRef(clock.getElapsedTime());
    const velocity = React.useRef(
        new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
        )
    );

    useFrame(() => {
        const t = clock.getElapsedTime() - startTime.current;
        if (mesh.current) {
            mesh.current.position.addScaledVector(velocity.current, 0.02);
            const material = mesh.current.material as THREE.Material
            material.opacity = Math.max(0, 1 - t / PARTICLE_LIFETIME)
        }
    });

    return (
        <mesh position={position} ref={mesh}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} transparent opacity={1} />
        </mesh>
    );
}

/// 花朵元件
function PixelChrysanthemum({
    hovered,
    petalColor,
    centerColor,
    speed,
    segmentCount,
    segmentSpacing,
    petalCount,
    petalDistance,
}: {
    hovered: boolean
    petalColor: string
    centerColor: string
    speed: number
    segmentCount: number
    segmentSpacing: number
    petalCount: number
    petalDistance: number
}) {
    const group = React.useRef<THREE.Group>(null)
    const centerRef = React.useRef<THREE.Mesh>(null)

    useFrame(() => {
        const elapsed = clock.getElapsedTime()

        if (group.current) {
            group.current.rotation.y += hovered ? speed : speed / 5
        }

        if (centerRef.current) {
            const scale = 1.5 + 0.5 * Math.sin(elapsed * 3)
            centerRef.current.scale.set(scale, scale, scale)
        }
    })

    const petals = []

    for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2
        const baseX = Math.cos(angle) * petalDistance
        const baseY = Math.sin(angle) * petalDistance

        for (let j = 0; j < segmentCount; j++) {
            petals.push(
                <mesh
                    key={`petal-${i}-${j}`}
                    position={[
                        baseX + Math.cos(angle) * j * segmentSpacing,
                        baseY + Math.sin(angle) * j * segmentSpacing,
                        0,
                    ]}
                >
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshBasicMaterial color={petalColor} />
                </mesh>
            )
        }
    }

    return (
        <group ref={group} position={[0, 0, 0]}>
            <mesh ref={centerRef}>
                <boxGeometry args={[0.35, 0.35, 0.35]} />
                <meshBasicMaterial color={centerColor} />
            </mesh>
            {petals}
        </group>
    )
}

/// 主元件
type Props = {
    size: number;
    petalColor: string;
    speed: number;
    segmentCount: number;
    segmentSpacing: number;
    centerColor: string;
    petalCount: number;
    petalDistance: number;
    particleSizeX: number;
    particleSizeY: number;
    particleSizeZ: number;
};

// 主元件
export function SingleCanvasBox(props: Props) {
    const [hovered, setHovered] = React.useState(false);
    const [particles, setParticles] = React.useState<React.JSX.Element[]>([]);

    const emitParticles = () => {
        const newParticles = Array.from({ length: 15 }, (_, i) => (
            <PetalParticle
                key={Date.now() + i}
                position={[0, 0, 0]}
                color={props.petalColor}
                size={[props.particleSizeX, props.particleSizeY, props.particleSizeZ]}
            />
        ));
        setParticles((prev) => [...prev, ...newParticles]);
        setTimeout(() => {
            setParticles((prev) => prev.slice(newParticles.length));
        }, PARTICLE_LIFETIME * 1000);
    };

    return (
        <div
            style={{ width: props.size, height: props.size }}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={emitParticles}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ width: "100%", height: "100%", background: "transparent" }}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={1.0} />
                <pointLight position={[5, 5, 5]} intensity={2.0} />
                <PixelChrysanthemum
                    hovered={hovered}
                    petalColor={props.petalColor}
                    centerColor={props.centerColor}
                    speed={props.speed}
                    segmentCount={props.segmentCount}
                    segmentSpacing={props.segmentSpacing}
                    petalCount={props.petalCount}
                    petalDistance={props.petalDistance}
                />
                {particles}
            </Canvas>
        </div>
    );
}

// SingleCanvasBox,
//   {
//     size: {
//       type: ControlType.Number,
//       title: "Size",
//       defaultValue: 150,
//       min: 50,
//       max: 400,
//     },
//     petalColor: {
//       type: ControlType.Color,
//       title: "Petal Color",
//       defaultValue: "#ffffff",
//     },
//     centerColor: {
//       type: ControlType.Color,
//       title: "Center Color",
//       defaultValue: "#ffcc00",
//     },
//     speed: {
//       type: ControlType.Number,
//       title: "Rotation Speed",
//       defaultValue: 0.05,
//       min: 0.01,
//       max: 0.2,
//       step: 0.01,
//     },
//     segmentCount: {
//       type: ControlType.Number,
//       title: "Petal Segments",
//       defaultValue: 3,
//       min: 1,
//       max: 10,
//     },
//     segmentSpacing: {
//       type: ControlType.Number,
//       title: "Segment Spacing",
//       defaultValue: 0.45,
//       min: 0.1,
//       max: 1,
//       step: 0.05,
//     },
//     petalCount: {
//       type: ControlType.Number,
//       title: "Petal Count",
//       defaultValue: 6,
//       min: 1,
//       max: 20,
//     },
//     petalDistance: {
//       type: ControlType.Number,
//       title: "Distance from Center",
//       defaultValue: 1.2,
//       min: 0.2,
//       max: 3,
//       step: 0.1,
//     },
//     particleSizeX: {
//       type: ControlType.Number,
//       title: "Particle Width",
//       defaultValue: 0.15,
//       min: 0.05,
//       max: 1,
//       step: 0.05,
//     },
//     particleSizeY: {
//       type: ControlType.Number,
//       title: "Particle Height",
//       defaultValue: 0.15,
//       min: 0.05,
//       max: 1,
//       step: 0.05,
//     },
//     particleSizeZ: {
//       type: ControlType.Number,
//       title: "Particle Depth",
//       defaultValue: 0.15,
//       min: 0.05,
//       max: 1,
//       step: 0.05,
//     },
//   };