import styled, { css } from 'styled-components';
import { SliderProps } from './SlidingModal';

interface ContainerProps extends SliderProps {
  isSlidingModalOpen: boolean;
  isAppCenterOpen: boolean;
  areSettingsOpen: boolean;
  isSearchOpen: boolean;
  isCalendarOpen: boolean;
}

/* Whisker Menu - slides down from top-left */
const systemTrayModalStyles = css<ContainerProps>`
  background-color: #161622;
  border: 1px solid rgba(60, 60, 70, 0.4);
  border-top: none;
  transform: ${({ isAppCenterOpen }) =>
    isAppCenterOpen ? `translateY(0)` : `translateY(-120%)`};
  opacity: ${({ isAppCenterOpen }) => (isAppCenterOpen ? 1 : 0)};
  pointer-events: ${({ isAppCenterOpen }) => (isAppCenterOpen ? 'auto' : 'none')};
  max-height: calc(100vh - 40px);
`;

const searchModalStyles = css<ContainerProps>`
  background-color: ${({ theme }) => theme.kali.whiskerMenu.bg};
  border: 1px solid rgba(54, 123, 240, 0.2);
  transform: ${({ isSearchOpen }) =>
    isSearchOpen ? `translateY(0)` : `translateY(-120%)`};
  opacity: ${({ isSearchOpen }) => (isSearchOpen ? 1 : 0)};
  pointer-events: ${({ isSearchOpen }) => (isSearchOpen ? 'auto' : 'none')};
`;

const widgetModalStyles = css<ContainerProps>`
  padding: ${({ theme }) => theme.space.sm};
  background: ${({ theme }) => theme.colors.modals.widgetModalBg};
  height: calc(100vh - 5rem);
  transform: ${({ width, isSlidingModalOpen }) =>
    isSlidingModalOpen ? `translateX(1rem)` : `translateX(-${width})`};
  overflow: visible;
  overflow-y: auto;
`;

const settingsModalStyles = css<ContainerProps>`
  padding: ${({ theme }) => theme.space.sm};
  background-color: ${({ theme }) => theme.colors.appCenter.bg};
  height: calc(100vh - 5rem);
  transform: ${({ areSettingsOpen, width }) =>
    areSettingsOpen ? `translateX(-1rem)` : `translateX(${width})`};
`;

const calendarModalStyles = css<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.systemTray.bg};
  transform: ${({ isCalendarOpen, width }) =>
    isCalendarOpen ? `translateY(0)` : `translateY(-${width})`};
  pointer-events: ${({ isCalendarOpen }) => (isCalendarOpen ? 'auto' : 'none')};
`;

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

  /* show/hide modal*/
  ${({ variant }) => variant === 'widgetsModal' && widgetModalStyles}
  ${({ variant }) => variant === 'systemTrayModal' && systemTrayModalStyles}
  ${({ variant }) => variant === 'settingsModal' && settingsModalStyles}
  ${({ variant }) => variant === 'searchModal' && searchModalStyles}
  ${({ variant }) => variant === 'calendarModal' && calendarModalStyles}

  /* styling */
  width: ${({ width }) => width};
  border-radius: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`;
