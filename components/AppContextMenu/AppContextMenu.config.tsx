import { useActions } from '../../hooks/useActions';
import React, { ReactNode } from 'react';
import { IContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import {
  FiExternalLink,
  FiCopy,
  FiFolderPlus,
  FiStar,
  FiTrash2,
  FiTrello,
  FiInfo,
  FiEdit,
} from 'react-icons/fi';
import Terminal from '../Apps/Terminal/Terminal';

type AppContextMenuItem = Pick<
  IContextMenuItem,
  'id' | 'text' | 'withUnderline' | 'appName' | 'withIcon'
> & {
  action: null | ((appName: string) => void);
};

/**
 * Xfce-style desktop icon context menu.
 * Right-click on a desktop icon to see: Open, Open Terminal Here, Cut, Copy, Move to Trash, Pin, Compress, Rename, Properties.
 */
export const useAppContextMenuConfig = ({
  appName,
  iconSrc,
  willOpenWindowWith,
}: {
  appName: string;
  willOpenWindowWith: ReactNode | null;
  iconSrc: string;
}): {
  desktopContextMenuContent: AppContextMenuItem[];
} => {
  const { deleteDesktopApp, openWindow, compressDesktopApp } = useActions();

  const handleDeleteApp = (appName: string) => {
    deleteDesktopApp(appName);
  };

  const openTerminal = () => {
    openWindow({
      windowName: 'Terminal — zis3c@kali:~',
      isOpen: true,
      windowIcon: 'KALI_TERMINAL',
      size: { width: 640, height: 420 },
      windowContent: <Terminal />,
    });
  };

  const openApp = (appName: string) => {
    openWindow({
      windowName: appName,
      isOpen: true,
      windowIcon: iconSrc,
      size: {
        width: 0.65 * window.innerWidth,
        height: 0.6 * window.innerHeight,
      },
      windowContent: willOpenWindowWith,
    });
  };

  const desktopContextMenuContent: AppContextMenuItem[] = [
    {
      id: 1,
      text: 'Open',
      action: openApp,
      withIcon: <FiExternalLink className={'icon'} />,
      withUnderline: true,
    },
    {
      id: 2,
      text: 'Open Terminal Here',
      action: openTerminal,
      withIcon: <FiTrello className={'icon'} />,
      withUnderline: true,
    },
    {
      id: 3,
      text: 'Cut',
      action: null,
      withIcon: <FiEdit className={'icon'} />,
    },
    {
      id: 4,
      text: 'Copy',
      action: null,
      withIcon: <FiCopy className={'icon'} />,
    },
    {
      id: 5,
      text: 'Move to Trash',
      action: (appName: string) => handleDeleteApp(appName),
      withIcon: <FiTrash2 className={'icon'} />,
      withUnderline: true,
    },
    {
      id: 6,
      text: 'Add to Favorites',
      action: null,
      withIcon: <FiStar className={'icon'} />,
    },
    {
      id: 7,
      text: 'Compress...',
      action: () => compressDesktopApp(appName),
      withIcon: <FiFolderPlus className={'icon'} />,
      withUnderline: true,
    },
    {
      id: 8,
      text: 'Properties',
      action: null,
      withIcon: <FiInfo className={'icon'} />,
    },
  ];

  return { desktopContextMenuContent };
};
