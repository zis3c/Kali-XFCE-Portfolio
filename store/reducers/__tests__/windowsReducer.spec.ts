import { windowsReducer } from '../windowsReducer';
import { WindowsActionTypes, WindowsState } from '../../../types/redux/windows-reducer-types';

const defaultState: WindowsState = {
  openedWindows: [],
  activeWindowName: null,
  activeWorkspace: 1,
};

const mockWindow = {
  windowName: 'Terminal',
  windowIcon: '/terminal.svg',
  size: { height: 400, width: 600 },
  isOpen: true,
  isMinimized: false,
  windowContent: null,
};

describe('windowsReducer', () => {
  it('returns default state', () => {
    const state = windowsReducer(undefined, { type: '@@INIT' } as any);
    expect(state).toEqual(defaultState);
  });

  it('opens a new window', () => {
    const state = windowsReducer(defaultState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    expect(state.openedWindows).toHaveLength(1);
    expect(state.openedWindows[0].windowName).toBe('Terminal');
    expect(state.activeWindowName).toBe('Terminal');
  });

  it('does not duplicate already-opened windows', () => {
    const withWindow = windowsReducer(defaultState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    const again = windowsReducer(withWindow, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    expect(again.openedWindows).toHaveLength(1);
  });

  it('re-opens a closed window', () => {
    const opened = windowsReducer(defaultState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    const closed = windowsReducer(opened, {
      type: WindowsActionTypes.CLOSE_WINDOW,
      payload: 'Terminal',
    });
    expect(closed.openedWindows[0].isOpen).toBe(false);

    const reopened = windowsReducer(closed, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    expect(reopened.openedWindows[0].isOpen).toBe(true);
  });

  it('closes a window', () => {
    const withWindow = windowsReducer(defaultState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    const closed = windowsReducer(withWindow, {
      type: WindowsActionTypes.CLOSE_WINDOW,
      payload: 'Terminal',
    });
    expect(closed.openedWindows[0].isOpen).toBe(false);
  });

  it('clears closed windows from state', () => {
    const opened = windowsReducer(defaultState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    const closed = windowsReducer(opened, {
      type: WindowsActionTypes.CLOSE_WINDOW,
      payload: 'Terminal',
    });
    const cleared = windowsReducer(closed, {
      type: WindowsActionTypes.CLEAR_CLOSED_WINDOWS,
      payload: 'Terminal',
    });
    expect(cleared.openedWindows).toHaveLength(0);
  });

  it('toggles minimize', () => {
    const opened = windowsReducer(defaultState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    const minimized = windowsReducer(opened, {
      type: WindowsActionTypes.TOGGLE_MINIMIZE_WINDOW,
      payload: 'Terminal',
    });
    expect(minimized.openedWindows[0].isMinimized).toBe(true);

    const unminimized = windowsReducer(minimized, {
      type: WindowsActionTypes.TOGGLE_MINIMIZE_WINDOW,
      payload: 'Terminal',
    });
    expect(unminimized.openedWindows[0].isMinimized).toBe(false);
  });

  it('focuses a window', () => {
    const opened = windowsReducer(defaultState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: mockWindow,
    });
    const closed = windowsReducer(opened, {
      type: WindowsActionTypes.CLOSE_WINDOW,
      payload: 'Terminal',
    });
    const focused = windowsReducer(closed, {
      type: WindowsActionTypes.FOCUS_WINDOW,
      payload: 'Terminal',
    });
    expect(focused.openedWindows[0].isOpen).toBe(true);
    expect(focused.openedWindows[0].isMinimized).toBe(false);
  });

  it('sets active workspace', () => {
    const state = windowsReducer(defaultState, {
      type: WindowsActionTypes.SET_ACTIVE_WORKSPACE,
      payload: 3,
    });
    expect(state.activeWorkspace).toBe(3);
    expect(state.activeWindowName).toBeNull();
  });
});
