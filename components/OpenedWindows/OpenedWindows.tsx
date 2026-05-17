import React, { useCallback } from 'react';
import * as Styled from './OpenedWindows.styles';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Window from '../Window/Window';
import { useActions } from '../../hooks/useActions';

/**
 *Renders container with all currently opened windows, which are stored in redux
 *@function OpenedWindows
 *@returns {JSX.Element} - Rendered OpenedWindows component
 */
const OpenedWindows = (): JSX.Element => {
  const { openedWindows, activeWindowName, activeWorkspace } = useTypedSelector(
    (state) => state.windows
  );
  const { closeOpenedWindow, focusWindow, toggleMinimizeWindow } = useActions();

  const handleCloseWindow = useCallback(
    (windowName: string) => {
      closeOpenedWindow(windowName);
    },
    [closeOpenedWindow]
  );

  return (
    <Styled.Container>
      {openedWindows
        .filter(
          (window) =>
            (window.workspace ?? 1) === activeWorkspace &&
            !window.isMinimized &&
            window.isOpen
        )
        .map((window) => (
        <Window
          key={window.windowName}
          windowName={window.windowName}
          windowIcon={window.windowIcon}
          size={window.size}
          isOpen={window.isOpen}
          isActive={activeWindowName === window.windowName}
          closeWindow={() => handleCloseWindow(window.windowName)}
          focusWindow={() => focusWindow(window.windowName)}
          minimizeWindow={() => toggleMinimizeWindow(window.windowName)}
        >
          {window.windowContent}
        </Window>
      ))}
    </Styled.Container>
  );
};
export default OpenedWindows;
