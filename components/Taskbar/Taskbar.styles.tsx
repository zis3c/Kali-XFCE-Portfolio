import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0;
  padding-right: 6px;
`;

export const Separator = styled.div`
  width: 1px;
  height: 18px;
  background: ${({ theme }) => theme.kali.panel.separatorColor};
  margin: 0 4px;
`;
