import React from 'react';
import * as Styled from './CRTEffect.styles';

/**
 * Global CRT Monitor Effect
 * Implements subtle scanlines, vignette, noise, and screen flicker.
 * Wrapped in a pointer-events: none container so it does not block UI interactions.
 */
const CRTEffect = (): JSX.Element => {
  return (
    <Styled.CRTWrapper>
      <Styled.Scanlines />
      <Styled.NoiseOverlay />
      <Styled.VignetteAndCurve />
    </Styled.CRTWrapper>
  );
};

export default CRTEffect;
