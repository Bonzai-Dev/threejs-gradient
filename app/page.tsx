"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Plane from "@/app/components/plane";

import fragmentShader from "@/public/assets/shaders/fragment.frag";
import vertexShader from "@/public/assets/shaders/vertex.vert";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Canvas camera={{ position: [0, 10, 0], fov: 50 }}>
        <ambientLight intensity={5} />
        <Plane fragmentShader={fragmentShader} vertexShader={vertexShader} />
      
        <OrbitControls />
      </Canvas>
    </main>
  );
}
