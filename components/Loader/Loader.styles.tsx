import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
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
  background-color: #000000;
`;

export const BootScreen = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 20px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-y: auto;
  cursor: default;
`;

export const BootLine = styled.div`
  color: rgba(200, 205, 210, 0.9);
  white-space: pre;
  min-height: 18px;
`;

export const OkToken = styled.span`
  color: #55cc55;
  font-weight: bold;
`;
