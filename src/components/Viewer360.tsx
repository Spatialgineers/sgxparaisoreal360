import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function SphereImage({ url }: { url: string }) {
  // Load texture
  const texture = useLoader(THREE.TextureLoader, url, (loader) => {
    loader.setCrossOrigin('anonymous');
  });

  return (
    <mesh scale={[-1, 1, 1]}>
      {/* 
        Scaling X by -1 flips the sphere inside out, 
        making the texture look correct when viewed from the inside.
      */}
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

export default function Viewer360({ url }: { url: string }) {
  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden cursor-move">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          rotateSpeed={-0.5} // Invert controls to feel natural when inside the sphere
        />
        <Suspense fallback={null}>
          <SphereImage url={url} />
        </Suspense>
      </Canvas>
      
      {/* Loading state indicator could go here using Suspense boundary */}
      <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500 italic">
        Arrastra para explorar el espacio (Usa scroll para hacer zoom)
      </div>
    </div>
  );
}
