import React, { useState, useRef } from 'react';
import * as Styled from './Taskbar.styles';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import TimePanel from '../TimePanel/TimePanel';
import { PowerIcon, NetworkIcon, VolumeIcon } from '../icons/KaliIcons';
import { useCloseModalIfClickedOutside } from '../../hooks/useCloseIfClickedOutside';
import styled from 'styled-components';
import {
  SESSION_ACTION_EVENT,
  SessionAction,
} from '../../utils/session-actions';
import { notifyDesktop } from '../../utils/notifications';

export interface TaskbarProps {
  activeWorkspace: number;
  onWorkspaceChange: (workspace: number) => void;
}

/* ===== Workspace Indicator ===== */
const WorkspaceBar = ({
  activeWorkspace,
  onWorkspaceChange,
}: {
  activeWorkspace: number;
  onWorkspaceChange: (workspace: number) => void;
}) => {
  return (
    <WsContainer>
      {[1, 2, 3, 4].map((n) => (
        <WsBox
          key={n}
          isActive={n === activeWorkspace}
          onClick={() => onWorkspaceChange(n)}
        >
          {n}
        </WsBox>
      ))}
    </WsContainer>
  );
};

const WsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 100%;
  padding: 0 4px;
`;

const WsBox = styled.button<{ isActive: boolean }>`
  width: 18px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  background: ${({ isActive }) =>
    isActive ? 'rgba(54, 123, 240, 0.4)' : 'rgba(255,255,255,0.05)'};
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'rgba(54, 123, 240, 0.6)' : 'rgba(255,255,255,0.08)'};
  color: ${({ isActive }) =>
    isActive ? '#d0d5dc' : 'rgba(160,170,180,0.5)'};
  cursor: pointer;
  outline: none;
  border-radius: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

/* ===== Volume Popup ===== */
const VolumePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(75);
  const ref = useRef(null);

  useCloseModalIfClickedOutside({
    isModalOpen: isOpen,
    closeModalFunction: () => setIsOpen(false),
    modalRef: ref,
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <TrayButton onClick={() => setIsOpen(!isOpen)} title={`Volume: ${volume}%`}>
        <VolumeIcon size={14} color="rgba(180, 185, 190, 0.9)" />
      </TrayButton>
      {isOpen && (
        <PopupPanel style={{ width: '140px' }}>
          <PopupLabel>Volume</PopupLabel>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#367bf0' }}
          />
          <PopupLabel style={{ textAlign: 'center' }}>{volume}%</PopupLabel>
        </PopupPanel>
      )}
    </div>
  );
};

/* ===== Power Menu ===== */
const PowerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useCloseModalIfClickedOutside({
    isModalOpen: isOpen,
    closeModalFunction: () => setIsOpen(false),
    modalRef: ref,
  });

  const triggerSessionAction = (action: SessionAction) => {
    window.dispatchEvent(new CustomEvent(SESSION_ACTION_EVENT, { detail: action }));
    if (action === 'logout') {
      notifyDesktop({ title: 'Session', message: 'Logging out to greeter...' });
    }
    if (action === 'restart') {
      notifyDesktop({ title: 'Session', message: 'Restarting desktop...' });
    }
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Lock Screen', action: () => undefined, isDisabled: true },
    { label: 'Log Out...', action: () => triggerSessionAction('logout') },
    { label: 'Restart...', action: () => triggerSessionAction('restart') },
    { label: 'Shut Down...', action: () => undefined, isDisabled: true },
  ];

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <TrayButton
        onClick={() => setIsOpen(!isOpen)}
        title="Session Menu"
        style={{ background: isOpen ? 'rgba(255,255,255,0.1)' : 'transparent' }}
      >
        <PowerIcon size={14} color="rgba(180, 185, 190, 0.9)" />
      </TrayButton>

      {isOpen && (
        <PopupPanel>
          {menuItems.map((item, i) => (
            <PopupItem
              key={i}
              onClick={item.action}
              isDisabled={item.isDisabled}
            >
              {item.label}
            </PopupItem>
          ))}
        </PopupPanel>
      )}
    </div>
  );
};

/* ===== Styled Helpers ===== */
const TrayButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  &:hover > div {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const TooltipPanel = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  min-width: 170px;
  padding: 6px 8px;
  background: linear-gradient(180deg, #2a2d34 0%, #24272e 100%);
  border: 1px solid rgba(8, 10, 12, 0.92);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5);
  font-size: 10px;
  color: rgba(210, 216, 224, 0.95);
  text-align: left;
  opacity: 0;
  transform: translateY(-3px);
  pointer-events: none;
  transition: 0.14s ease;
  z-index: 999;

  div + div {
    margin-top: 3px;
    color: rgba(175, 184, 194, 0.94);
  }
`;

const PopupPanel = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  background: linear-gradient(180deg, #2a2d34 0%, #24272e 100%);
  border: 1px solid rgba(8, 10, 12, 0.92);
  min-width: 150px;
  z-index: 9999;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  padding: 4px 0;
`;

const PopupItem = styled.div<{ isDisabled?: boolean }>`
  padding: 6px 16px;
  font-size: 11px;
  color: ${({ isDisabled }) =>
    isDisabled ? 'rgba(208, 213, 220, 0.4)' : '#d0d5dc'};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};

  &:hover {
    background: ${({ isDisabled }) =>
      isDisabled ? 'transparent' : 'rgba(106, 154, 222, 0.35)'};
  }
`;

const PopupLabel = styled.div`
  padding: 4px 10px;
  font-size: 10px;
  color: rgba(160, 170, 180, 0.6);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
`;

/**
 *Renders right side of Xfce panel: workspace indicator, system tray icons, and clock
 *@function Taskbar
 *@returns {JSX.Element} - Rendered Taskbar component
 */
const Taskbar = ({
  activeWorkspace,
  onWorkspaceChange,
}: TaskbarProps): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.Separator />
      <WorkspaceBar
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={onWorkspaceChange}
      />
      <Styled.Separator />
      <TrayButton title="Network: Connected">
        <NetworkIcon size={14} color="rgba(180, 185, 190, 0.9)" />
        <TooltipPanel>
          <div>Wi-Fi: KaliLab-5G</div>
          <div>Signal: 92% (Excellent)</div>
          <div>IPv4: 192.168.1.42</div>
        </TooltipPanel>
      </TrayButton>
      <VolumePopup />
      <SettingsPanel />
      <Styled.Separator />
      <TimePanel />
      <Styled.Separator />
      <PowerMenu />
    </Styled.Container>
  );
};

export default Taskbar;
