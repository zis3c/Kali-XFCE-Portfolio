import styled, { keyframes } from 'styled-components';

const flickerAnimation = keyframes`
  0% { opacity: 0.98; }
  5% { opacity: 0.96; }
  10% { opacity: 0.99; }
  15% { opacity: 1; }
  30% { opacity: 0.97; }
  50% { opacity: 1; }
  80% { opacity: 0.98; }
  100% { opacity: 1; }
`;

const scanlineRoll = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const noiseJitter = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -1%); }
  20% { transform: translate(1%, 1%); }
  30% { transform: translate(-2%, 1%); }
  40% { transform: translate(1%, -1%); }
  50% { transform: translate(-1%, 2%); }
  60% { transform: translate(2%, -1%); }
  70% { transform: translate(1%, 2%); }
  80% { transform: translate(-1%, -2%); }
  90% { transform: translate(2%, 1%); }
`;

export const CRTWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  pointer-events: none; /* CRITICAL: Must not block clicks */
  overflow: hidden;
  
  /* 2. Flicker: slightly faster and more noticeable opacity shifts */
  animation: ${flickerAnimation} 5s infinite;
`;

export const Scanlines = styled.div`
  position: absolute;
  inset: 0;
  /* 1. Scanlines: very light horizontal lines */
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.12) 50%
  );
  background-size: 100% 3px;
  opacity: 0.9;
  animation: ${scanlineRoll} 8s linear infinite;
`;

export const VignetteAndCurve = styled.div`
  position: absolute;
  inset: 0;
  /* 4. Vignette: edge darkening */
  /* 5. Curvature/8. Reflection: faint inner border reflection simulating thick glass */
  box-shadow: 
    inset 0 0 100px rgba(0, 0, 0, 0.5),
    inset 0 0 2px rgba(255, 255, 255, 0.06);
`;

export const NoiseOverlay = styled.div`
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  /* 7. Screen noise/grain: SVG static */
  background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
  opacity: 0.07; /* Increased to be noticeably alive */
  mix-blend-mode: overlay;
  animation: ${noiseJitter} 0.3s steps(4) infinite;
`;
