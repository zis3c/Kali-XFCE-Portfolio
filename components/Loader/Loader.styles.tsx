import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const pulseBar = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
`;

export const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: #050505;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const LoaderCard = styled.div`
  width: min(640px, 100%);
  background: #0a0a0a;
  border: 1px solid #262626;
  border-radius: 12px;
  padding: 28px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65);
`;

export const SpinnerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SpinnerRing = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid #262626;
  border-top-color: #fafafa;
  animation: ${spin} 0.75s linear infinite;
  flex-shrink: 0;
`;

export const SpinnerMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #fafafa;
  }

  p {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      sans-serif;
    font-size: 12.5px;
    color: #a1a1aa;
  }
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 4px;
  background: #1a1a1a;
  border-radius: 999px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 45%;
    height: 100%;
    background: #fafafa;
    border-radius: 999px;
    animation: ${pulseBar} 1.25s ease-in-out infinite;
  }
`;

export const BootScreen = styled.div`
  width: 100%;
  height: 210px;
  padding: 14px 16px;
  background: #050505;
  border: 1px solid #1f1f1f;
  border-radius: 8px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.55;
  overflow-y: auto;
  cursor: default;
`;

export const BootLine = styled.div`
  color: rgba(200, 205, 210, 0.9);
  white-space: pre-wrap;
  min-height: 18px;
`;

export const OkToken = styled.span`
  color: #22c55e;
  font-weight: bold;
`;
