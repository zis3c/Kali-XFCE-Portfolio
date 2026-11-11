import {
  UIaction,
  UIactionTypes,
  UIstate,
} from '../../types/redux/ui-reducer-types';

const initialUIstate: UIstate = {
  theme: 'dark',
  screenBrightness: '100',
  isAppCenterOpen: false,
  isInNightLightMode: false,
  shouldIntroBeShown: true,
  isContextMenuOpen: false,
  contextMenuCoords: { x: 0, y: 0 },
  iconsSize: 'medium',
  sortDesktopIconsBy: 'size',
  removedApps: [],
  compressedApps: [],
};

/**
 *@function uiReducer
 *@param {UIstate} state - state of reducer
 *@param {object} action - action to be reduced
 *@returns {object} - new review state
 */

export const uiReducer = (
  state = initialUIstate,
  action: UIaction
): UIstate => {
  switch (action.type) {
    case UIactionTypes.INTRO_WAS_SHOWN:
      return { ...state, shouldIntroBeShown: false };

    case UIactionTypes.CHANGE_THEME:
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      return { ...state, theme: newTheme };

    case UIactionTypes.OPEN_APP_CENTER_MODAL:
      return { ...state, isAppCenterOpen: true };

    case UIactionTypes.CLOSE_APP_CENTER_MODAL:
      return { ...state, isAppCenterOpen: false };

    case UIactionTypes.TURN_ON_NIGHT_MODE:
      return { ...state, isInNightLightMode: true };

    case UIactionTypes.TURN_OFF_NIGHT_MODE:
      return { ...state, isInNightLightMode: false };

    case UIactionTypes.CHANGE_BRIGHTNESS:
      return { ...state, screenBrightness: action.payload };

    case UIactionTypes.OPEN_CONTEXT_MENU:
      return {
        ...state,
        isContextMenuOpen: true,
        contextMenuCoords: action.payload,
      };

    case UIactionTypes.CLOSE_CONTEXT_MENU:
      return { ...state, isContextMenuOpen: false };

    case UIactionTypes.CHANGE_ICON_SIZE:
      return { ...state, iconsSize: action.payload };

    case UIactionTypes.SORT_DESKTOP_ICONS:
      return { ...state, sortDesktopIconsBy: action.payload };

    case UIactionTypes.DELETE_APP:
      return { ...state, removedApps: [...state.removedApps, action.payload] };

    case UIactionTypes.UNDO_DELETE_APP:
      return { ...state, removedApps: [] };

    case UIactionTypes.COMPRESS_DESKTOP_APP:
      return {
        ...state,
        compressedApps: [...state.compressedApps, action.payload],
      };

    default:
      return state;
  }
};
