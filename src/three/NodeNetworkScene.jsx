import React from 'react';
import CanvasStage from './CanvasStage';
import NodeNetwork from './NodeNetwork';
import { usePrefersReducedMotion } from './reducedMotion';

function NodeNetworkScene({ primaryColor, secondaryColor }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <CanvasStage camera={{ position: [0, 0, 6], fov: 45 }}>
      <NodeNetwork primaryColor={primaryColor} secondaryColor={secondaryColor} reduceMotion={reduceMotion} />
    </CanvasStage>
  );
}

export default NodeNetworkScene;
