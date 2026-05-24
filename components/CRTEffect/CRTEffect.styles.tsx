import styled, { keyframes } from 'styled-components';

const flickerAnimation = keyframes`
  0% { opacity: 0.99; }
  25% { opacity: 0.985; }
  50% { opacity: 0.995; }
  75% { opacity: 0.98; }
  100% { opacity: 0.99; }
`;

const scanlineRoll = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const noiseJitter = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-0.5%, -0.5%); }
  20% { transform: translate(0.5%, 0.5%); }
  30% { transform: translate(-1%, 0.5%); }
  40% { transform: translate(0.5%, -0.5%); }
  50% { transform: translate(-0.5%, 1%); }
  60% { transform: translate(1%, -0.5%); }
  70% { transform: translate(0.5%, 0.5%); }
  80% { transform: translate(-0.5%, -1%); }
  90% { transform: translate(1%, 0.5%); }
`;

export const CRTWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  pointer-events: none; /* CRITICAL: Must not block clicks */
  overflow: hidden;
  
  /* Flicker: subtle and slow to prevent eye strain */
  animation: ${flickerAnimation} 4s infinite;
`;

export const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  /* Scanlines: clear but moderated horizontal lines */
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.18) 50%
  );
  background-size: 100% 3px;
  opacity: 0.85;
  animation: ${scanlineRoll} 12s linear infinite;
`;

export const VignetteAndCurve = styled.div`
  position: absolute;
  inset: 0;
  /* Vignette: moderate curved edge shadow and glass border reflection */
  box-shadow: 
    inset 0 0 110px rgba(0, 0, 0, 0.65),
    inset 0 0 3px rgba(255, 255, 255, 0.06);
`;

export const NoiseOverlay = styled.div`
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  /* Screen noise/grain: SVG static */
  background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
  opacity: 0.09; /* Subtle grain layer */
  mix-blend-mode: overlay;
  animation: ${noiseJitter} 0.2s steps(4) infinite;
`;
