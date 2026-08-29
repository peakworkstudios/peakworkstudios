import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Peak({ position, height, radius, color, wireframe }) {
  return (
    <mesh position={position}>
      <coneGeometry args={[radius, height, 4, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.5 : 0.88}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

function PeakRange({ primaryColor = '#c1931b', secondaryColor = '#10213b', reduceMotion = false }) {
  const group = useRef();

  const peaks = useMemo(() => ([
    { position: [-3.2, -0.4, -2], height: 2.6, radius: 1.3, color: secondaryColor, wireframe: false },
    { position: [-1.1, -0.9, 0.4], height: 3.4, radius: 1.6, color: primaryColor, wireframe: false },
    { position: [1.3, -0.6, -1], height: 2.9, radius: 1.4, color: secondaryColor, wireframe: false },
    { position: [3, -1, 0.6], height: 2.2, radius: 1.1, color: primaryColor, wireframe: true },
    { position: [0, 1.6, -3], height: 4.6, radius: 2.2, color: secondaryColor, wireframe: true },
  ]), [primaryColor, secondaryColor]);

  useFrame((state, delta) => {
    if (reduceMotion || !group.current) return;
    group.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={group} position={[2.4, -1.4, -1]}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color={primaryColor} />
      {peaks.map((peak, index) => (
        <Peak key={index} {...peak} />
      ))}
    </group>
  );
}

export default PeakRange;
