import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Emotion colors that cycle through
const emotionColors = [
  { color: "#4a8fe7", name: "calm" },      // Blue - calm
  { color: "#c9a54d", name: "happy" },     // Gold - happy
  { color: "#8b7dc9", name: "thoughtful" }, // Purple - thoughtful
  { color: "#5bb98c", name: "peaceful" },  // Green - peaceful
  { color: "#e7894a", name: "energetic" }, // Amber - energetic
];

interface AnimatedSphereProps {
  isActive?: boolean;
}

function AnimatedSphere({ isActive = false }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState(new THREE.Color(emotionColors[0].color));
  const targetColor = useRef(new THREE.Color(emotionColors[0].color));

  // Cycle through emotion colors
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % emotionColors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    targetColor.current = new THREE.Color(emotionColors[colorIndex].color);
  }, [colorIndex]);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.06;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
      
      // Smooth color transition
      currentColor.lerp(targetColor.current, 0.02);
      setCurrentColor(currentColor.clone());
    }
  });

  const colorHex = useMemo(() => {
    return `#${currentColor.getHexString()}`;
  }, [currentColor]);

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={1.6}>
      <MeshDistortMaterial
        color={colorHex}
        attach="material"
        distort={isActive ? 0.45 : 0.2}
        speed={isActive ? 2 : 1}
        roughness={0.1}
        metalness={0.95}
        emissive={colorHex}
        emissiveIntensity={0.35}
        transparent
        opacity={0.85}
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
    <div className={`relative ${className}`}>
      {/* Glow effect behind sphere */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(74, 143, 231, 0.4) 0%, rgba(201, 165, 77, 0.2) 50%, transparent 70%)",
        }}
      />
      
      {/* Glass blur overlay */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "radial-gradient(circle, transparent 30%, rgba(13, 15, 20, 0.1) 70%)",
        }}
      />
      
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4a8fe7" />
        <pointLight position={[10, -10, 5]} intensity={0.5} color="#c9a54d" />
        <pointLight position={[0, 10, 0]} intensity={0.3} color="#8b7dc9" />
        <AnimatedSphere isActive={isActive} />
      </Canvas>
      
      {/* Inner glow ring */}
      <div 
        className="absolute inset-8 rounded-full pointer-events-none"
        style={{
          boxShadow: "inset 0 0 60px rgba(74, 143, 231, 0.15), inset 0 0 120px rgba(201, 165, 77, 0.1)",
        }}
      />
    </div>
  );
}
