import {
  IWindow,
  WindowsAction,
  WindowsActionTypes,
  WindowsState,
} from '../../../types/redux/windows-reducer-types';
import { windowsReducer } from '../windowsReducer';

const initialState: WindowsState = {
  openedWindows: [],
  activeWindowName: null,
  activeWorkspace: 1,
};

test('when previous state is undefined, returns initial state', () => {
  const newState = windowsReducer(undefined, {} as WindowsAction);
  expect(newState).toStrictEqual(initialState);
});

const dummyWindowContent: IWindow = {
  size: { height: 50, width: 50 },
  isOpen: true,
  windowIcon: 'icon',
  windowContent: '🍅',
  windowName: '🍅 TOMATO 🍅',
};

describe('Open windows correctly', () => {
  test('add newly opened window to state, thereby rendering it on OPEN_WINDOW', () => {
    const newState = windowsReducer(initialState, {
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: dummyWindowContent,
    });
    expect(newState).toStrictEqual({
      ...initialState,
      openedWindows: [
        {
          ...dummyWindowContent,
          isMinimized: false,
          workspace: 1,
        },
      ],
      activeWindowName: '🍅 TOMATO 🍅',
    });
  });
});

describe('Closes windows correctly', () => {
  test('closes opened window correctly', () => {
    const openedState: WindowsState = {
      openedWindows: [
        {
          ...dummyWindowContent,
          isMinimized: false,
          workspace: 1,
        },
      ],
      activeWindowName: '🍅 TOMATO 🍅',
      activeWorkspace: 1,
    };
    const newState = windowsReducer(openedState, {
      type: WindowsActionTypes.CLOSE_WINDOW,
      payload: '🍅 TOMATO 🍅',
    });
    expect(newState).toStrictEqual({
      ...openedState,
      openedWindows: [
        {
          ...dummyWindowContent,
          isMinimized: false,
          workspace: 1,
          isOpen: false,
        },
      ],
      activeWindowName: null,
    });
  });
});
