import styled, { css } from 'styled-components';
import { Props } from './ContextMenu';

type ContainerProps = Pick<Props, 'locationCoordinates' | 'isOpen'>;

/**
 * CLOSED STYLES
 */
const isClosedStyle = css`
  visibility: hidden;
  opacity: 0;
`;
/**
 * OPEN STYLES
 */
const isOpenStyle = css`
  visibility: visible;
  opacity: 1;
`;
/**
 * Xfce/GTK3-style flat dark context menu
 */
export const Container = styled.nav<ContainerProps>`
  ${({ isOpen }) => (isOpen ? isOpenStyle : isClosedStyle)};

  z-index: ${({ theme }) => theme.zIndex.modal};

  display: flex;
  flex-direction: column;

  position: absolute;
  top: ${({ locationCoordinates }) => `${locationCoordinates.y}px`};
  left: ${({ locationCoordinates }) => `${locationCoordinates.x}px`};

  padding: 3px 0;
  width: 190px;
  background: #2b2d3a;
  border: 1px solid #1a1b26;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
`;

export const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
export const LI = styled.li``;
