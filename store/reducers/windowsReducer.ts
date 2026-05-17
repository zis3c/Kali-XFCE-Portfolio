import {
  WindowsAction,
  WindowsActionTypes,
  WindowsState,
} from '../../types/redux/windows-reducer-types';

const initialWindowsState: WindowsState = {
  openedWindows: [],
  activeWindowName: null,
  activeWorkspace: 1,
};

/**
 *@function windowsReducer
 *@param {WindowsState} state - state of reducer
 *@param {object} action - action to be reduced
 *@returns {object} - new review state
 */

export const windowsReducer = (
  state = initialWindowsState,
  action: WindowsAction
): WindowsState => {
  switch (action.type) {
    case WindowsActionTypes.OPEN_WINDOW:
      const windowIsAlreadyOpened = state.openedWindows.some(
        (window) => window.windowName === action.payload.windowName
      );
      if (windowIsAlreadyOpened) {
        return {
          ...state,
          openedWindows: state.openedWindows.map((window) =>
            window.windowName === action.payload.windowName
              ? {
                  ...window,
                  isOpen: true,
                  isMinimized: false,
                }
              : window
          ),
          activeWindowName: action.payload.windowName,
        };
      }
      return {
        ...state,
        openedWindows: [
          ...state.openedWindows,
          {
            ...action.payload,
            isMinimized: false,
            workspace: action.payload.workspace ?? state.activeWorkspace,
          },
        ],
        activeWindowName: action.payload.windowName,
      };

    case WindowsActionTypes.CLOSE_WINDOW:
      const withoutClosedWindow = state.openedWindows.map((window) =>
        window.windowName === action.payload
          ? {
              ...window,
              isOpen: false,
            }
          : window
      );
      return {
        ...state,
        openedWindows: withoutClosedWindow,
        activeWindowName:
          state.activeWindowName === action.payload
            ? null
            : state.activeWindowName,
      };

    case WindowsActionTypes.CLEAR_CLOSED_WINDOWS:
      const withoutRemovedWindows = state.openedWindows.filter(
        (window) => window.windowName !== action.payload
      );

      return { ...state, openedWindows: withoutRemovedWindows };

    case WindowsActionTypes.TOGGLE_MINIMIZE_WINDOW:
      return {
        ...state,
        openedWindows: state.openedWindows.map((window) =>
          window.windowName === action.payload
            ? {
                ...window,
                isMinimized: !window.isMinimized,
              }
            : window
        ),
        activeWindowName:
          state.activeWindowName === action.payload
            ? null
            : action.payload,
      };

    case WindowsActionTypes.FOCUS_WINDOW:
      return {
        ...state,
        openedWindows: state.openedWindows.map((window) =>
          window.windowName === action.payload
            ? { ...window, isMinimized: false, isOpen: true }
            : window
        ),
        activeWindowName: action.payload,
      };

    case WindowsActionTypes.SET_ACTIVE_WORKSPACE:
      return {
        ...state,
        activeWorkspace: action.payload,
        activeWindowName: null,
      };

    default:
      return state;
  }
};
