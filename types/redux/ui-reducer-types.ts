export type IconSortVariant = 'date' | 'name' | 'size';
export type IconSize = 'small' | 'medium' | 'large';

export interface UIstate {
  theme: 'dark' | 'light';
  isAppCenterOpen: boolean;
  isInNightLightMode: boolean;
  screenBrightness: string;
  shouldIntroBeShown: boolean;
  isContextMenuOpen: boolean;
  contextMenuCoords: { x: number; y: number };
  iconsSize: IconSize;
  sortDesktopIconsBy: IconSortVariant;
  removedApps: string[];
  compressedApps: string[];
}

export enum UIactionTypes {
  CHANGE_THEME = 'CHANGE_THEME',

  OPEN_APP_CENTER_MODAL = 'OPEN_APP_CENTER_MODAL',
  CLOSE_APP_CENTER_MODAL = 'CLOSE_APP_CENTER_MODAL',

  TURN_ON_NIGHT_MODE = 'TURN_ON_NIGHT_MODE',
  TURN_OFF_NIGHT_MODE = 'TURN_OFF_NIGHT_MODE',

  OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU',
  CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU',

  INTRO_WAS_SHOWN = 'INTRO_WAS_SHOWN',

  SORT_DESKTOP_ICONS = 'SORT_DESKTOP_ICONS',

  CHANGE_ICON_SIZE = 'CHANGE_ICON_SIZE',

  DELETE_APP = 'DELETE_APP',
  UNDO_DELETE_APP = 'UNDO_DELETE_APP',

  COMPRESS_DESKTOP_APP = 'COMPRESS_DESKTOP_APP',

  CHANGE_BRIGHTNESS = 'CHANGE_BRIGHTNESS',
}

export type UIaction =
  | { type: UIactionTypes.CHANGE_THEME }
  | { type: UIactionTypes.OPEN_APP_CENTER_MODAL }
  | { type: UIactionTypes.CLOSE_APP_CENTER_MODAL }
  | { type: UIactionTypes.TURN_ON_NIGHT_MODE }
  | { type: UIactionTypes.TURN_OFF_NIGHT_MODE }
  | { type: UIactionTypes.CHANGE_BRIGHTNESS; payload: string }
  | { type: UIactionTypes.INTRO_WAS_SHOWN }
  | { type: UIactionTypes.OPEN_CONTEXT_MENU; payload: { x: number; y: number } }
  | { type: UIactionTypes.CLOSE_CONTEXT_MENU }
  | {
      type: UIactionTypes.SORT_DESKTOP_ICONS;
      payload: IconSortVariant;
    }
  | { type: UIactionTypes.CHANGE_ICON_SIZE; payload: IconSize }
  | { type: UIactionTypes.DELETE_APP; payload: string }
  | { type: UIactionTypes.UNDO_DELETE_APP }
  | { type: UIactionTypes.COMPRESS_DESKTOP_APP; payload: string };
