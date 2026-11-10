import styled from 'styled-components';

export const DesktopContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 28px);
  pointer-events: auto;
`;

export const SelectionBox = styled.div`
  position: absolute;
  border: 1px solid rgba(54, 123, 240, 0.8);
  background: rgba(54, 123, 240, 0.3);
  pointer-events: none;
  z-index: 100;
`;
