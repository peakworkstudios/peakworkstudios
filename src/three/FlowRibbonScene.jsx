import React from 'react';
import CanvasStage from './CanvasStage';
import FlowRibbon from './FlowRibbon';
import { usePrefersReducedMotion } from './reducedMotion';

function FlowRibbonScene({ primaryColor, secondaryColor }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <CanvasStage camera={{ position: [0, 0, 7], fov: 45 }}>
      <FlowRibbon primaryColor={primaryColor} secondaryColor={secondaryColor} reduceMotion={reduceMotion} />
    </CanvasStage>
  );
}

export default FlowRibbonScene;
