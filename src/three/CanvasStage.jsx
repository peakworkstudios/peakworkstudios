import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import CanvasErrorBoundary from './CanvasErrorBoundary';

const Stage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

function CanvasStage({ camera, children, className }) {
  return (
    <Stage className={className}>
      <CanvasErrorBoundary>
        <Canvas dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} camera={camera}>
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </Stage>
  );
}

export default CanvasStage;
