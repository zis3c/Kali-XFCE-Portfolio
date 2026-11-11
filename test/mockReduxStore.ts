import { LocalRootState } from '../store/reducers';

export const mockReduxStore: LocalRootState = {
  ui: {
    theme: 'dark',
    isAppCenterOpen: false,
    isInNightLightMode: false,
    screenBrightness: '100',
    shouldIntroBeShown: true,
    isContextMenuOpen: false,
    contextMenuCoords: { x: 0, y: 0 },
    iconsSize: 'medium',
    sortDesktopIconsBy: 'size',
    removedApps: [],
    compressedApps: [],
  },

  windows: {
    openedWindows: [],
    activeWindowName: null,
    activeWorkspace: 1,
  },
};
