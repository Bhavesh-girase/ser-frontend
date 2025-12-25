import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface AnimatedSphereProps {
  isActive?: boolean;
}

function AnimatedSphere({ isActive = false }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const color = useMemo(() => {
    return isActive ? "#00d4ff" : "#a855f7";
  }, [isActive]);

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={isActive ? 0.6 : 0.3}
        speed={isActive ? 3 : 1.5}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
}

interface FloatingSphereProps {
  isActive?: boolean;
  className?: string;
}

export default function FloatingSphere({ isActive = false, className = "" }: FloatingSphereProps) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#00d4ff" />
        <AnimatedSphere isActive={isActive} />
      </Canvas>
    </div>
  );
}
