
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PresentationControls } from '@react-three/drei';
import { Group } from 'three';

const FoodObject = () => {
  const group = useRef<Group>(null);
  
  // Simple shapes to represent food items
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Plate */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Burger representation */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
      
      {/* Burger top bun */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.3, 32]} />
        <meshStandardMaterial color="#f39c12" />
      </mesh>
      
      {/* Lettuce */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
        <meshStandardMaterial color="#2ecc71" roughness={0.8} />
      </mesh>
      
      {/* Tomato slices around */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i * Math.PI / 2) * 0.7, 
            0.2, 
            Math.cos(i * Math.PI / 2) * 0.7
          ]}
          rotation={[Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2]}
        >
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#e74c3c" />
        </mesh>
      ))}
    </group>
  );
};

export const FoodScene: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        
        <PresentationControls
          global
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
        >
          <Float rotationIntensity={0.5} floatIntensity={1}>
            <FoodObject />
          </Float>
        </PresentationControls>
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
