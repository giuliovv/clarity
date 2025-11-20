"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import BrainParticles from "./BrainParticles";

export default function Scene3D() {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
                {/* <color attach="background" args={['#000000']} />  Removed for transparency */}
                {/* Transparent background handled by parent, but we can set clear color if needed. 
            Actually, let's make canvas transparent so CSS gradients show through. */}

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <BrainParticles count={3000} />

                {/* Add some floating "synapses" or connections if we want later */}

                <OrbitControls
                    enableZoom={false}
                    autoRotate={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
