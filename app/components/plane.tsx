import { useRef } from "react";
import { useFrame, useThree, Viewport } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";

export default function Plane({
  fragmentShader,
  vertexShader,
}: {
  fragmentShader: string;
  vertexShader: string;
}) {
  const material = useRef<ShaderMaterial>(null);
  const viewport = useThree((state) => state.viewport);

  useFrame((state) => {
    if (!material.current || !viewport) return;
    material.current.uniforms.time.value = state.clock.getElapsedTime();
    material.current.uniforms.resolution.value = new Vector2(
      viewport.width,
      viewport.height
    );
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 50]} />
      <shaderMaterial
        ref={material}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          time: { value: 0 },
          resolution: { value: new Vector2() },
        }}
      />
    </mesh>
  );
}
