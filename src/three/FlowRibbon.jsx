import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FlowRibbon({ primaryColor = '#c1931b', secondaryColor = '#10213b', reduceMotion = false }) {
  const group = useRef();

  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-4, -0.6, 0),
    new THREE.Vector3(-1.6, 1.1, -1.2),
    new THREE.Vector3(0.4, -0.9, 0.8),
    new THREE.Vector3(2.2, 0.8, -0.6),
    new THREE.Vector3(4.2, -0.4, 0.4),
  ]), []);

  const markers = useMemo(() => [0, 0.28, 0.56, 0.84].map(t => curve.getPointAt(t)), [curve]);

  useFrame((state, delta) => {
    if (reduceMotion || !group.current) return;
    group.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 4]} intensity={1} />

      <mesh>
        <tubeGeometry args={[curve, 120, 0.09, 12, false]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} metalness={0.2} />
      </mesh>

      {markers.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default FlowRibbon;
