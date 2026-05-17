import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 0 8px;
  height: 100%;
  cursor: default;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;

  p,
  span {
    font-size: 10.5px;
    line-height: 1;
    color: rgba(180, 185, 190, 0.9);
  }
`;

export const DateText = styled.time`
  font-size: 9px;
  line-height: 1;
  color: rgba(150, 156, 164, 0.92);
  letter-spacing: 0.2px;
`;
