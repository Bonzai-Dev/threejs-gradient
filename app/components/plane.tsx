import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Material, ShaderMaterial, Vector2 } from "three";

export default function Plane({
  fragmentShader,
  vertexShader,
}: {
  fragmentShader: string;
  vertexShader: string;
}) {
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current)
      materialRef.current.uniforms.miliseconds.value =
        state.clock.getElapsedTime() * 1000;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[3, 3]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          miliseconds: { value: 0 },
          resolution: { value: 100 },
        }}
      />
    </mesh>
  );
}
