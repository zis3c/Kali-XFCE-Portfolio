import styled from 'styled-components';
import { SliderProps } from './SlidingModal';

interface ContainerProps extends SliderProps {
  isAppCenterOpen: boolean;
}

/* Whisker Menu - slides down from top-left */
export const Container = styled.div<ContainerProps>`
  /* positioning */
  position: fixed;
  top: ${({ position }) => position.top};
  bottom: ${({ position }) => position.bottom};
  right: ${({ position }) => position.right};
  left: ${({ position }) => position.left};
  z-index: ${({ theme }) => theme.zIndex.modal};

  /* display */
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  transition: 0.15s transform ease-out, 0.15s opacity ease-out;

  /* show/hide modal */
  background-color: #161622;
  border: 1px solid rgba(60, 60, 70, 0.4);
  border-top: none;
  transform: ${({ isAppCenterOpen }) =>
    isAppCenterOpen ? `translateY(0)` : `translateY(-120%)`};
  opacity: ${({ isAppCenterOpen }) => (isAppCenterOpen ? 1 : 0)};
  pointer-events: ${({ isAppCenterOpen }) =>
    isAppCenterOpen ? 'auto' : 'none'};
  max-height: calc(100vh - 40px);

  /* styling */
  width: ${({ width }) => width};
  border-radius: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`;
