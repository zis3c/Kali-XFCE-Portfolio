import styled, { keyframes } from 'styled-components';

const quickFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

interface Props {
  isInNightLightMode: boolean;
  screenBrightness: string;
  animationDelay: number;
}

export const Container = styled.section<Props>`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #0e0e1a;

  filter: ${({ screenBrightness, isInNightLightMode }) =>
    `brightness(${screenBrightness}%) ${
      isInNightLightMode ? `sepia(70%)` : ''
    }`};

  /* Quick fade only — no cinematic animation */
  animation: ${quickFade} 0.3s ease-in-out both;
`;
