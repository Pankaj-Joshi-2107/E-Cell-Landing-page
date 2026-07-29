"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Dust() {
  const points = useRef();

  const particles = useMemo(() => {
    const count = 3500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y += 0.00025;
    points.current.rotation.x += 0.00005;

    points.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.08) * 0.2;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GalaxyDust() {
  return (
    <div
      style={{
        position: "fixed",
top: 0,
left: 0,
width: "100vw",
height: "100vh",
zIndex: -1,
pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 65,
        }}
      >
        <Dust />
      </Canvas>
    </div>
  );
}