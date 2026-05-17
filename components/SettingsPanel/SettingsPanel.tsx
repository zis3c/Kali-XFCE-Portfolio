import React, { useMemo } from 'react';
import * as Styled from './SettingsPanel.styles';
import { BatteryIcon } from '../icons/KaliIcons';

/**
 *Renders system tray icons in Xfce panel style.
 *Network and Volume are now handled directly in Taskbar.tsx
 *This component only renders the battery indicator to avoid duplicates.
 *@function SettingsPanel
 *@returns {JSX.Element} - Rendered SettingsPanel component
 */
const SettingsPanel = (): JSX.Element => {
  const battery = useMemo(() => 82, []);

  return (
    <Styled.Container>
      <Styled.TrayIcon title={`Battery: ${battery}%`}>
        <BatteryIcon size={14} />
        <Styled.Tooltip>
          <div>Battery: {battery}%</div>
          <div>Status: Discharging</div>
          <div>Time remaining: 2h 18m</div>
        </Styled.Tooltip>
      </Styled.TrayIcon>
    </Styled.Container>
  );
};

export default SettingsPanel;
