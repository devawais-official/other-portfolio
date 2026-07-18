"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(THREE.TextureLoader, "https://unpkg.com/three-globe/example/img/earth-night.jpg");

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Glow Effect */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>

      {/* Main Earth */}
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        {/* meshBasicMaterial light ke asar se free hota hai */}
        <meshBasicMaterial map={texture} />
      </Sphere>
    </group>
  );
}

export function Globe({ className }: { className?: string }) {
  return (
    <div className={className || "h-[500px] w-full"}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }} // FOV kam kiya taake zyada area dikhe
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} />

        {/* Globe ko scale aur position adjust karo */}
        <group scale={1.2}>
          <Earth />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}