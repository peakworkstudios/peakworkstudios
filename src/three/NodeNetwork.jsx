import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NodeNetwork({ primaryColor = '#c1931b', secondaryColor = '#10213b', reduceMotion = false }) {
  const group = useRef();

  const nodes = useMemo(() => {
    const count = 8;
    const items = [];
    for (let i = 0; i < count; i += 1) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.3;
      items.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ));
    }
    return items;
  }, []);

  const linePositions = useMemo(() => {
    const positions = [];
    nodes.forEach((node, i) => {
      const next = nodes[(i + 1) % nodes.length];
      positions.push(node.x, node.y, node.z, next.x, next.y, next.z);
      positions.push(0, 0, 0, node.x, node.y, node.z);
    });
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state, delta) => {
    if (reduceMotion || !group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1} />

      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={secondaryColor} wireframe />
      </mesh>

      {nodes.map((node, i) => (
        <mesh key={i} position={node}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.3} />
        </mesh>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={primaryColor} transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

export default NodeNetwork;
