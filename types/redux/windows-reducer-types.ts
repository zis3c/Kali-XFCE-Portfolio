import { ReactNode } from 'react';

export interface IWindow {
  windowName: string;
  windowIcon: string;
  size: { height: number; width: number };
  isOpen: boolean;
  isMinimized?: boolean;
  workspace?: number;
  windowContent: ReactNode | null;
}

export interface WindowsState {
  openedWindows: IWindow[];
  activeWindowName: string | null;
  activeWorkspace: number;
}

export enum WindowsActionTypes {
  OPEN_WINDOW = 'OPEN_WINDOW',
  CLOSE_WINDOW = 'CLOSE_WINDOW',
  CLEAR_CLOSED_WINDOWS = 'CLEAR_CLOSED_WINDOWS',
  TOGGLE_MINIMIZE_WINDOW = 'TOGGLE_MINIMIZE_WINDOW',
  FOCUS_WINDOW = 'FOCUS_WINDOW',
  SET_ACTIVE_WORKSPACE = 'SET_ACTIVE_WORKSPACE',
}

export type WindowsAction =
  | {
      type: WindowsActionTypes.OPEN_WINDOW;
      payload: IWindow;
    }
  | {
      type: WindowsActionTypes.CLOSE_WINDOW;
      payload: string;
    }
  | {
      type: WindowsActionTypes.CLEAR_CLOSED_WINDOWS;
      payload: string;
    }
  | {
      type: WindowsActionTypes.TOGGLE_MINIMIZE_WINDOW;
      payload: string;
    }
  | {
      type: WindowsActionTypes.FOCUS_WINDOW;
      payload: string;
    }
  | {
      type: WindowsActionTypes.SET_ACTIVE_WORKSPACE;
      payload: number;
    };
