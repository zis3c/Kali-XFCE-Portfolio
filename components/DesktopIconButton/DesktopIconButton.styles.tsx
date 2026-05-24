import styled, { css } from 'styled-components';
import { IconSize } from '../../types/redux/ui-reducer-types';

interface Props {
  variant: 'desktop' | 'systemTray' | 'pinnedApp' | 'recommendedApp';
  iconSize: IconSize;
  isSelected?: boolean;
}

interface DesktopBtnProps {
  iconSize: IconSize;
  isSelected?: boolean;
}

const DesktopIconButtonStyles = css<DesktopBtnProps>`
  padding: 4px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  border-radius: 4px;
  background: ${({ isSelected }) =>
    isSelected ? 'rgba(54, 123, 240, 0.4)' : 'transparent'};
  border: 1px solid
    ${({ isSelected }) =>
      isSelected ? 'rgba(54, 123, 240, 0.6)' : 'transparent'};

  :hover {
    background: ${({ isSelected }) =>
      isSelected ? 'rgba(54, 123, 240, 0.5)' : 'rgba(255, 255, 255, 0.08)'};
  }
`;
const systemTrayButtonStyles = css`
  padding: 4px;
  cursor: pointer;

  :hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;
const pinnedAppButtonStyles = css`
  cursor: pointer;

  :hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const recommendedAppButtonStyles = css`
  justify-content: flex-start;
  flex-direction: row;
  padding: 3px 10px;
  cursor: pointer;

  figure {
    display: flex;
  }

  :hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const ButtonContainer = styled.div<Props>`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: transparent;
  border: 0;

  ${({ variant }) => variant === 'desktop' && DesktopIconButtonStyles};
  ${({ variant }) => variant === 'systemTray' && systemTrayButtonStyles};
  ${({ variant }) => variant === 'pinnedApp' && pinnedAppButtonStyles};
  ${({ variant }) =>
    variant === 'recommendedApp' && recommendedAppButtonStyles};

  border-radius: 0;
`;

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const Figcaption = styled.figcaption`
  p {
    font-size: 10px;
    color: rgba(210, 215, 220, 0.85);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
    text-align: center;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-family: 'Inter', 'Noto Sans', sans-serif;
    font-weight: 400;
  }
`;

export const RecommendedAppDescription = styled.figcaption`
  text-align: start;
  margin-left: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const FileName = styled.h4`
  color: rgba(200, 205, 210, 0.9);
  font-size: 11px;
  font-weight: 400;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  img,
  svg {
    pointer-events: none;
  }
`;

export const IconSpinner = styled.div`
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.14);
  border-top-color: rgba(106, 154, 222, 0.95);
  animation: iconSpin 0.85s linear infinite;

  @keyframes iconSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
