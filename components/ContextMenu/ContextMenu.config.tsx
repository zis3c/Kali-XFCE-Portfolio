import React from 'react';
import { IContextMenuItem } from '../ContextMenuItem/ContextMenuItem';
import { useActions } from '../../hooks/useActions';
import { IconSortVariant } from '../../types/redux/ui-reducer-types';
import Terminal from '../Apps/Terminal/Terminal';
import {
  FiFilter,
  FiGrid,
  FiInfo,
  FiMonitor,
  FiRefreshCw,
  FiRotateCw,
  FiTrello,
} from 'react-icons/fi';
import About from '../About/About';

/**
 * Custom hook that is used to get initial configuration for desktop context menu
 *@function useContextMenuConfig
 *@returns {object} desktopContextMenuContent - returns object with configuration for desktop context menu (icons, text, actions)
 */
export const useContextMenuConfig = (): {
  desktopContextMenuContent: IContextMenuItem[];
  systemTrayContextMenuContent: IContextMenuItem[];
} => {
  const { sortDesktopIcons, openWindow, undoLastDeleteDesktopApp } =
    useActions();

  const sortIconsBy = (way: IconSortVariant) => sortDesktopIcons(way);

  const openTerminal = () => {
    openWindow({
      windowName: 'Terminal - zis3c@kali:~',
      isOpen: true,
      windowIcon: 'KALI_TERMINAL',
      size: {
        width: 640,
        height: 420,
      },
      windowContent: <Terminal />,
    });
  };

  const openAbout = () => {
    openWindow({
      windowName: 'About OS',
      isOpen: true,
      windowIcon: '/assets/portfolio/skills/linux-original.svg',
      size: {
        width: 0.4 * window.innerWidth,
        height: 0.6 * window.innerHeight,
      },
      windowContent: <About />,
    });
  };

  const desktopContextMenuContent: IContextMenuItem[] = [
    {
      id: 1,
      text: 'Open Terminal Here',
      action: openTerminal,
      withIcon: <FiTrello className={'icon'} />,
      withUnderline: true,
    },
    {
      id: 2,
      text: 'Sort by',
      withIcon: <FiFilter className={'icon'} />,
      action: null,
      hoverMenuItems: [
        { id: 1, text: 'Name', action: () => sortIconsBy('name') },
        { id: 2, text: 'Size', action: () => sortIconsBy('size') },
        { id: 3, text: 'Date Modified', action: () => sortIconsBy('date') },
      ],
      withUnderline: true,
    },
    {
      id: 3,
      text: 'Paste',
      action: null,
      withIcon: <FiRotateCw className={'icon'} />,
    },
    {
      id: 4,
      text: 'Undo Delete',
      action: undoLastDeleteDesktopApp,
      withIcon: <FiRefreshCw className={'icon'} />,
      withUnderline: true,
    },
    {
      id: 5,
      text: 'Desktop Settings',
      action: null,
      withIcon: <FiMonitor className={'icon'} />,
    },
    {
      id: 6,
      text: 'Applications',
      action: null,
      withIcon: <FiGrid className={'icon'} />,
    },
    {
      id: 7,
      text: 'About',
      action: openAbout,
      withUnderline: true,
      withIcon: <FiInfo className={'icon'} />,
    },
  ];

  const systemTrayContextMenuContent: IContextMenuItem[] = [
    {
      id: 1,
      text: 'Align Icons',
      action: null,
      hoverMenuItems: [
        { id: 1, text: 'Left', action: null },
        { id: 2, text: 'Center', action: null },
        { id: 3, text: 'Right', action: null },
      ],
      withUnderline: true,
    },
    {
      id: 2,
      text: 'Search',
      action: null,
      hoverMenuItems: [
        { id: 1, text: 'Show', action: null },
        { id: 2, text: 'Hide', action: null },
      ],
    },
    {
      id: 3,
      text: 'Widgets',
      action: null,
      hoverMenuItems: [
        { id: 1, text: 'Show', action: null },
        { id: 2, text: 'Hide', action: null },
      ],
      withUnderline: true,
    },
    {
      id: 4,
      text: 'Show Desktop',
      action: null,
    },
  ];

  return { desktopContextMenuContent, systemTrayContextMenuContent };
};
