import styled, { css } from 'styled-components';

const isOpenStyle = css`
  visibility: visible;
  opacity: 1;
`;

const isClosedStyle = css`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.15s, opacity 0.15s ease;
`;

interface Props {
  isOpen: boolean;
  isActive: boolean;
}

export const Container = styled.div<Props>`
  ${({ isOpen }) => (isOpen ? isOpenStyle : isClosedStyle)};
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0;
  background-color: #1e1e2a;
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'rgba(106, 154, 222, 0.75)' : 'rgba(60, 60, 80, 0.5)'};
  box-shadow: ${({ isActive }) =>
    isActive
      ? '0 3px 14px rgba(0, 0, 0, 0.46), 0 0 0 1px rgba(106, 154, 222, 0.24)'
      : '0 2px 8px rgba(0, 0, 0, 0.35)'};
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const TitleBar = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  min-height: 26px;
  padding: 0 3px 0 8px;
  background: ${({ isActive }) =>
    isActive
      ? 'linear-gradient(180deg, #3d4f64 0%, #2d3f56 100%)'
      : 'linear-gradient(180deg, #2a2a3a 0%, #222233 100%)'};
  border-bottom: 1px solid rgba(40, 40, 55, 0.8);
  cursor: default;
  user-select: none;
`;

export const WindowTitle = styled.span`
  font-family: 'Inter', 'Noto Sans', sans-serif;
  font-size: 10.5px;
  font-weight: 400;
  color: rgba(190, 195, 200, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
`;

interface BtnProps {
  variant: 'minimize' | 'maximize' | 'close';
}

export const WinButton = styled.button<BtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 0;
  color: rgba(160, 165, 170, 0.7);

  &:hover {
    background: ${({ variant }) =>
      variant === 'close'
        ? 'rgba(200, 50, 50, 0.7)'
        : 'rgba(255, 255, 255, 0.08)'};
    ${({ variant }) =>
      variant === 'close' &&
      css`
        color: #ffffff;
      `}
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #1a1a2a;
`;

/* Legacy exports for backward compatibility */
export const Navigation = styled.div``;
export const WindowInfo = styled.div``;
export const ButtonWrapper = styled.div``;
export const NavButton = styled.div``;
