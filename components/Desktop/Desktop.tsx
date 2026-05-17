import React, { useEffect } from 'react';
import * as Styled from './Desktop.styles';
import DesktopApps from '../DesktopApps/DesktopApps';
import { useGetMouseCoordinates } from '../../hooks/useGetMouseCoordinates';
import ContextMenu from '../ContextMenu/ContextMenu';
import { useContextMenuConfig } from '../ContextMenu/ContextMenu.config';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Terminal from '../Apps/Terminal/Terminal';

/**
 *Renders main Kali Linux Xfce desktop
 *@function Desktop
 *@returns {JSX.Element} - Rendered Desktop component
 */
const Desktop = (): JSX.Element => {
  const { isContextMenuOpen } = useTypedSelector((state) => state.ui);
  const { openContextMenu, openWindow } = useActions();
  const { desktopContextMenuContent } = useContextMenuConfig();

  // Ctrl+Alt+T opens terminal (standard Xfce shortcut)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        openWindow({
          windowName: 'Terminal — zis3c@kali:~',
          isOpen: true,
          windowIcon: 'KALI_TERMINAL',
          size: { width: 640, height: 420 },
          windowContent: <Terminal />,
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openWindow]);

  const mouseCoords = useGetMouseCoordinates();
  const handleRightMouseClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!isContextMenuOpen) openContextMenu(mouseCoords);
  };

  return (
    <Styled.Container onContextMenu={handleRightMouseClick}>
      <DesktopApps />

      <ContextMenu
        isOpen={isContextMenuOpen}
        contextMenuItems={desktopContextMenuContent}
        locationCoordinates={mouseCoords}
      />
    </Styled.Container>
  );
};

export default Desktop;
