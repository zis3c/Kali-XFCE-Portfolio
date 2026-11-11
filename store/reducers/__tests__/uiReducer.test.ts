import {
  UIaction,
  UIactionTypes,
  UIstate,
} from '../../../types/redux/ui-reducer-types';
import { uiReducer } from '../uiReducer';

const initialState: UIstate = {
  theme: 'dark',
  screenBrightness: '100',
  isAppCenterOpen: false,
  isInNightLightMode: false,
  shouldIntroBeShown: true,
  isContextMenuOpen: false,
  contextMenuCoords: { x: 0, y: 0 },
  sortDesktopIconsBy: 'size',
  iconsSize: 'medium',
  removedApps: [],
  compressedApps: [],
};

test('when previous state is undefined, returns initial state', () => {
  const newState = uiReducer(undefined, {} as UIaction);
  expect(newState).toStrictEqual(initialState);
});

describe('Theme piece of UI state', () => {
  test('should toggle theme on CHANGE_THEME action type', () => {
    const newState = uiReducer(initialState, {
      type: UIactionTypes.CHANGE_THEME,
    });
    expect(newState).toStrictEqual({
      ...initialState,
      theme: 'light',
    });
  });
});

describe('Night light', () => {
  test('turn on night mode on TURN_ON_NIGHT_MODE', () => {
    const newState = uiReducer(initialState, {
      type: UIactionTypes.TURN_ON_NIGHT_MODE,
    });
    expect(newState).toStrictEqual({
      ...initialState,
      isInNightLightMode: true,
    });
  });
});

describe('Brightness', () => {
  test('changes brightness on CHANGE_BRIGHTNESS', () => {
    const newState = uiReducer(initialState, {
      type: UIactionTypes.CHANGE_BRIGHTNESS,
      payload: '777',
    });

    expect(newState).toStrictEqual({
      ...initialState,
      screenBrightness: '777',
    });
  });
});

describe('correctly controls APP_CENTER sliding modal', () => {
  test('should open APP_CENTER modal on OPEN_APP_CENTER_MODAL', () => {
    const newState = uiReducer(initialState, {
      type: UIactionTypes.OPEN_APP_CENTER_MODAL,
    });
    expect(newState).toStrictEqual({
      ...initialState,
      isAppCenterOpen: true,
    });
  });

  test('close APP_CENTER modal on CLOSE_APP_CENTER_MODAL', () => {
    const newState = uiReducer(initialState, {
      type: UIactionTypes.CLOSE_APP_CENTER_MODAL,
    });
    expect(newState).toStrictEqual({
      ...initialState,
      isAppCenterOpen: false,
    });
  });
});
