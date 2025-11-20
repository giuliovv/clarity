"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BrainParticles({ count = 2000 }) {
    const points = useRef<THREE.Points>(null!);
    const linesMesh = useRef<THREE.LineSegments>(null!);

    // Signal state
    const signalRef = useRef({
        active: false,
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
        current: new THREE.Vector3(),
        progress: 0,
        speed: 0.5
    });

    // Generate particles and connections
    const { positions, colors, connections, particleCoords } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const particleCoords: { x: number, y: number, z: number }[] = [];

        for (let i = 0; i < count; i++) {
            // Random point in sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const r = Math.cbrt(Math.random()) * 2;

            let x = r * Math.sin(phi) * Math.cos(theta);
            let y = r * Math.sin(phi) * Math.sin(theta);
            let z = r * Math.cos(phi);

            // Morph sphere into brain shape
            if (y < 0) y *= 0.5;
            x += x > 0 ? 0.2 : -0.2;
            z *= 1.2;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Base color (Indigo/Purple)
            colors[i * 3] = 0.39; // R (approx #6366f1)
            colors[i * 3 + 1] = 0.4; // G
            colors[i * 3 + 2] = 0.95; // B

            particleCoords.push({ x, y, z });
        }

        // Generate connections (wires)
        const connections: number[] = [];
        const maxDistance = 0.3;
        const maxConnections = count * 2;

        for (let i = 0; i < count; i++) {
            if (connections.length >= maxConnections * 2) break;

            let connected = 0;
            for (let j = i + 1; j < count; j++) {
                if (connected >= 2) break;

                const dx = particleCoords[i].x - particleCoords[j].x;
                const dy = particleCoords[i].y - particleCoords[j].y;
                const dz = particleCoords[i].z - particleCoords[j].z;
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDistance) {
                    connections.push(
                        particleCoords[i].x, particleCoords[i].y, particleCoords[i].z,
                        particleCoords[j].x, particleCoords[j].y, particleCoords[j].z
                    );
                    connected++;
                }
            }
        }

        return { positions, colors, connections: new Float32Array(connections), particleCoords };
    }, [count]);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        // Rotate
        points.current.rotation.y = time * 0.1;
        if (linesMesh.current) {
            linesMesh.current.rotation.y = time * 0.1;
            linesMesh.current.position.y = Math.sin(time * 0.5) * 0.1;

            const mouseX = state.mouse.x * 0.5;
            const mouseY = state.mouse.y * 0.5;
            linesMesh.current.rotation.x = THREE.MathUtils.lerp(linesMesh.current.rotation.x, mouseY, 0.1);
            linesMesh.current.rotation.z = THREE.MathUtils.lerp(linesMesh.current.rotation.z, mouseX * 0.5, 0.1);
        }

        points.current.position.y = Math.sin(time * 0.5) * 0.1;

        const mouseX = state.mouse.x * 0.5;
        const mouseY = state.mouse.y * 0.5;

        points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, mouseY, 0.1);
        points.current.rotation.z = THREE.MathUtils.lerp(points.current.rotation.z, mouseX * 0.5, 0.1);

        // --- Signal Logic ---
        if (!signalRef.current.active) {
            // Start a new signal
            const startIndex = Math.floor(Math.random() * count);
            const endIndex = Math.floor(Math.random() * count);

            signalRef.current.start.set(particleCoords[startIndex].x, particleCoords[startIndex].y, particleCoords[startIndex].z);
            signalRef.current.end.set(particleCoords[endIndex].x, particleCoords[endIndex].y, particleCoords[endIndex].z);
            signalRef.current.progress = 0;
            signalRef.current.active = true;
        } else {
            // Move signal
            signalRef.current.progress += delta * signalRef.current.speed;
            if (signalRef.current.progress >= 1) {
                signalRef.current.active = false;
            } else {
                signalRef.current.current.lerpVectors(signalRef.current.start, signalRef.current.end, signalRef.current.progress);
            }
        }

        // Animate colors
        const colorAttribute = points.current.geometry.attributes.color;
        if (colorAttribute) {
            const signalPos = signalRef.current.current;
            const signalRadius = 0.6; // Radius of influence
            const signalRadiusSq = signalRadius * signalRadius;

            for (let i = 0; i < count; i++) {
                // 1. Random firing (Sparkles)
                if (Math.random() > 0.998) {
                    colorAttribute.setXYZ(i, 1, 1, 1);
                } else {
                    // 2. Signal influence (Yellow Pulse)
                    let isInfluenced = false;
                    if (signalRef.current.active) {
                        const px = particleCoords[i].x;
                        const py = particleCoords[i].y;
                        const pz = particleCoords[i].z;

                        const dx = px - signalPos.x;
                        const dy = py - signalPos.y;
                        const dz = pz - signalPos.z;
                        const distSq = dx * dx + dy * dy + dz * dz;

                        if (distSq < signalRadiusSq) {
                            // Close to signal -> Turn Yellow (#fbbf24 -> 0.98, 0.75, 0.14)
                            // Fade based on distance
                            const intensity = 1 - (distSq / signalRadiusSq);

                            // Lerp towards yellow based on intensity
                            const r = colorAttribute.getX(i);
                            const g = colorAttribute.getY(i);
                            const b = colorAttribute.getZ(i);

                            colorAttribute.setXYZ(
                                i,
                                THREE.MathUtils.lerp(r, 0.98, intensity * 0.2),
                                THREE.MathUtils.lerp(g, 0.75, intensity * 0.2),
                                THREE.MathUtils.lerp(b, 0.14, intensity * 0.2)
                            );
                            isInfluenced = true;
                        }
                    }

                    if (!isInfluenced) {
                        // Return to base color slowly
                        const r = colorAttribute.getX(i);
                        const g = colorAttribute.getY(i);
                        const b = colorAttribute.getZ(i);

                        colorAttribute.setXYZ(
                            i,
                            THREE.MathUtils.lerp(r, 0.39, 0.1),
                            THREE.MathUtils.lerp(g, 0.4, 0.1),
                            THREE.MathUtils.lerp(b, 0.95, 0.1)
                        );
                    }
                }
            }
            colorAttribute.needsUpdate = true;
        }
    });

    return (
        <group>
            <points ref={points}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    vertexColors
                    sizeAttenuation={true}
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Wires */}
            <lineSegments ref={linesMesh}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[connections, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#4f46e5" // Darker indigo for lines
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </lineSegments>
        </group>
    );
}
