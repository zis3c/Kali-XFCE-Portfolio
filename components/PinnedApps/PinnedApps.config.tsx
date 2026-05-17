import React, { ReactNode } from 'react';
import Terminal from '../Apps/Terminal/Terminal';
import FileManager from '../Apps/FileManager/FileManager';
import GoogleSearch from '../Apps/GoogleSearch/GoogleSearch';

export const usePinnedAppsConfig = (): { pinnedApps: IPinnedApp[] } => {
  const pinnedApps: IPinnedApp[] = [
    {
      id: 1,
      text: 'Terminal',
      icon: 'KALI_TERMINAL',
      action: null,
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: <Terminal />,
    },
    {
      id: 2,
      text: 'Files',
      icon: 'KALI_FILEMANAGER',
      action: null,
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: <FileManager />,
    },
    {
      id: 3,
      text: 'Firefox ESR',
      icon: '/assets/icons/startmenu/firefox-nightly.svg',
      action: null,
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: <GoogleSearch />,
    },
    {
      id: 4,
      text: 'GitHub',
      icon: '/assets/icons/startmenu/github.svg',
      action: () => window.open('https://github.com/zis3c', '_blank'),
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: null,
    },
    {
      id: 5,
      text: 'VSCode',
      icon: '/assets/icons/startmenu/vscode.svg',
      action: null,
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: null,
    },
    {
      id: 6,
      text: 'Burp Suite',
      icon: 'KALI_CODE',
      action: null,
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: null,
    },
    {
      id: 7,
      text: 'Wireshark',
      icon: 'KALI_CODE',
      action: null,
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: null,
    },
    {
      id: 8,
      text: 'Docker',
      icon: '/assets/icons/startmenu/docker.png',
      action: null,
      iconSize: { height: 36, width: 36 },
      willOpenWindowWith: null,
    },
  ];

  return {
    pinnedApps,
  };
};

interface IPinnedApp {
  id: number;
  text: string;
  icon: string;
  action: (() => void) | null;
  iconSize: { height: number; width: number };
  willOpenWindowWith: ReactNode | null;
}
