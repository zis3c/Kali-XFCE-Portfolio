import React, { useEffect, useRef } from 'react';
import Taskbar from '../Taskbar/Taskbar';
import * as Styled from './SystemTray.styles';
import SlidingModal from '../SlidingModal/SlidingModal';
import AppCenter from '../AppCenter/AppCenter';
import Image from 'next/image';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  ApplicationsIcon,
  CodeIcon,
  FileManagerIcon,
  MailIcon,
  SearchIcon,
  SettingsIcon,
  TerminalIcon,
  TextFileIcon,
  UserIcon,
} from '../icons/KaliIcons';
import { SESSION_ACTION_EVENT } from '../../utils/session-actions';
import { notifyDesktop } from '../../utils/notifications';

const renderWindowIcon = (iconSrc: string) => {
  const iconColor = 'rgba(205, 212, 220, 0.88)';
  const iconSize = 14;

  if (iconSrc.startsWith('/')) {
    return (
      <Image
        src={iconSrc}
        alt=""
        width={16}
        height={16}
        style={{ objectFit: 'contain' }}
        quality={100}
      />
    );
  }

  switch (iconSrc) {
    case 'KALI_TERMINAL':
      return <TerminalIcon size={iconSize} color={iconColor} />;
    case 'KALI_FILEMANAGER':
      return <FileManagerIcon size={iconSize} color={iconColor} />;
    case 'KALI_USER':
      return <UserIcon size={iconSize} color={iconColor} />;
    case 'KALI_FOLDER':
      return <FileManagerIcon size={iconSize} color={iconColor} />;
    case 'KALI_CODE':
      return <CodeIcon size={iconSize} color={iconColor} />;
    case 'KALI_MAIL':
      return <MailIcon size={iconSize} color={iconColor} />;
    case 'KALI_SETTINGS':
      return <SettingsIcon size={iconSize} color={iconColor} />;
    case 'KALI_TEXTFILE':
      return <TextFileIcon size={iconSize} color={iconColor} />;
    default:
      return <SearchIcon size={iconSize} color={iconColor} />;
  }
};

/**
 *Renders Xfce-style top panel with Applications button, active windows, and system tray
 *@function SystemTray
 *@returns {JSX.Element} - Rendered SystemTray (Xfce Panel) component
 */
const SystemTray = (): JSX.Element => {
  const containerRef = useRef<HTMLElement>(null);
  const appCenterRef = useRef<HTMLDivElement>(null);
  const {
    toggleAppCenterModal,
    closeAppCenterModal,
    toggleMinimizeWindow,
    focusWindow,
    setActiveWorkspace,
  } = useActions();
  const { openedWindows, activeWindowName, activeWorkspace } = useTypedSelector(
    (state) => state.windows
  );
  const { isAppCenterOpen } = useTypedSelector((state) => state.ui);
  const [panelMenu, setPanelMenu] = React.useState<{
    x: number;
    y: number;
    open: boolean;
  }>({ x: 0, y: 0, open: false });

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!containerRef.current?.contains(target)) {
        setPanelMenu((p) => ({ ...p, open: false }));
      }
      if (
        isAppCenterOpen &&
        !containerRef.current?.contains(target) &&
        !appCenterRef.current?.contains(target)
      ) {
        closeAppCenterModal();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAppCenterOpen) closeAppCenterModal();
        setPanelMenu((p) => ({ ...p, open: false }));
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isAppCenterOpen, closeAppCenterModal]);

  return (
    <>
      <Styled.Container
        ref={containerRef}
        onContextMenu={(e) => {
          e.preventDefault();
          setPanelMenu({ x: e.clientX, y: e.clientY, open: true });
        }}
      >
        {/* Left zone: Applications button */}
        <Styled.LeftZone>
          <Styled.ApplicationsButton
            onClick={() => toggleAppCenterModal()}
            title="Applications"
          >
            <ApplicationsIcon size={12} color="rgba(200,205,210,0.8)" />
          </Styled.ApplicationsButton>
        </Styled.LeftZone>

        {/* Center zone: Active window task buttons */}
        <Styled.CenterZone>
          {openedWindows
            .filter((w) => w.isOpen && (w.workspace ?? 1) === activeWorkspace)
            .map((win) => (
              <Styled.TaskButton
                key={win.windowName}
                onClick={() => {
                  if (activeWindowName === win.windowName && !win.isMinimized) {
                    toggleMinimizeWindow(win.windowName);
                    return;
                  }
                  focusWindow(win.windowName);
                }}
                isActive={
                  activeWindowName === win.windowName && !win.isMinimized
                }
                title={win.windowName}
              >
                {renderWindowIcon(win.windowIcon)}
              </Styled.TaskButton>
            ))}
        </Styled.CenterZone>

        {/* Right zone: System tray + clock */}
        <Styled.RightZone>
          <Taskbar
            activeWorkspace={activeWorkspace}
            onWorkspaceChange={(workspace) => setActiveWorkspace(workspace)}
          />
        </Styled.RightZone>
      </Styled.Container>

      {panelMenu.open && (
        <Styled.PanelMenu style={{ top: panelMenu.y, left: panelMenu.x }}>
          <Styled.PanelItem
            onClick={() => {
              notifyDesktop({
                title: 'Panel Preferences',
                message: 'Preferences dialog not implemented yet.',
              });
              setPanelMenu((p) => ({ ...p, open: false }));
            }}
          >
            Panel Preferences
          </Styled.PanelItem>
          <Styled.PanelItem
            onClick={() => {
              notifyDesktop({
                title: 'XFCE Panel',
                message: 'Kali XFCE panel simulation running.',
              });
              setPanelMenu((p) => ({ ...p, open: false }));
            }}
          >
            About
          </Styled.PanelItem>
          <Styled.PanelItem
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent(SESSION_ACTION_EVENT, { detail: 'logout' })
              );
              setPanelMenu((p) => ({ ...p, open: false }));
            }}
          >
            Log Out
          </Styled.PanelItem>
        </Styled.PanelMenu>
      )}

      {/* Whisker Menu modal - positioned below panel on the left */}
      <div ref={appCenterRef}>
        <SlidingModal
          variant={'systemTrayModal'}
          width={'468px'}
          position={{
            top: '28px',
            left: '1px',
          }}
        >
          <AppCenter />
        </SlidingModal>
      </div>
    </>
  );
};
export default SystemTray;
