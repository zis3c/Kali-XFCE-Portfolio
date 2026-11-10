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

export const WorkspaceIndicator = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 8px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.kali.panel.textColor};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.kali.panel.hoverBg};
  }
`;
