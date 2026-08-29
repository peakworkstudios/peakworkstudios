import React from 'react';
import CanvasStage from './CanvasStage';
import PeakRange from './PeakRange';
import { usePrefersReducedMotion } from './reducedMotion';

function PeakRangeScene({ primaryColor, secondaryColor }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <CanvasStage camera={{ position: [0, 0.4, 8], fov: 38 }}>
      <PeakRange primaryColor={primaryColor} secondaryColor={secondaryColor} reduceMotion={reduceMotion} />
    </CanvasStage>
  );
}

export default PeakRangeScene;
