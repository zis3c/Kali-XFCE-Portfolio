import styled from 'styled-components';

export const Container = styled.div`
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: calc(100% + 2px);
  padding: 3px 0;
  width: 190px;
  background: #2b2d3a;
  border: 1px solid #1a1b26;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;
