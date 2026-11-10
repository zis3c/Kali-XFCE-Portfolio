import { State } from '../../reducers';
import { UIactionTypes } from '../../../types/redux/ui-reducer-types';
import {
  changeDesktopIconSize,
  changeScreenBrightness,
  changeTheme,
  closeAppCenterModal,
  closeCalendarModal,
  closeContextMenu,
  closeSearchModal,
  closeSettingsModal,
  closeWidgetsModal,
  compressDesktopApp,
  deleteDesktopApp,
  notShowIntroAgain,
  openCalendarModal,
  openContextMenu,
  sortDesktopIcons,
  toggleAppCenterModal,
  toggleCalendarModal,
  toggleNightLightMode,
  toggleSearchModal,
  toggleSettingsModal,
  toggleWidgetsModal,
  undoLastDeleteDesktopApp,
} from '../ui-action-creators';

const makeState = (overrides: Partial<State['ui']> = {}): State =>
  ({
    ui: {
      theme: 'dark',
      isWidgetOpen: false,
      isSearchOpen: false,
      areSettingsOpen: false,
      isAppCenterOpen: false,
      isInNightLightMode: false,
      isCalendarOpen: false,
      ...overrides,
    },
  } as unknown as State);

describe('ui action creators', () => {
  it('changeTheme dispatches and persists the next theme', () => {
    const dispatch = jest.fn();
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const getState = jest.fn(() => makeState());

    changeTheme()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: UIactionTypes.CHANGE_THEME,
    });
    expect(setItem).toHaveBeenCalledWith('theme', 'dark');
    setItem.mockRestore();
  });

  it.each([
    [
      'toggleWidgetsModal',
      toggleWidgetsModal,
      'isWidgetOpen',
      UIactionTypes.OPEN_WIDGETS_MODAL,
      UIactionTypes.CLOSE_WIDGETS_MODAL,
    ],
    [
      'toggleAppCenterModal',
      toggleAppCenterModal,
      'isAppCenterOpen',
      UIactionTypes.OPEN_APP_CENTER_MODAL,
      UIactionTypes.CLOSE_APP_CENTER_MODAL,
    ],
    [
      'toggleSettingsModal',
      toggleSettingsModal,
      'areSettingsOpen',
      UIactionTypes.OPEN_SETTINGS_MODAL,
      UIactionTypes.CLOSE_SETTINGS_MODAL,
    ],
    [
      'toggleSearchModal',
      toggleSearchModal,
      'isSearchOpen',
      UIactionTypes.OPEN_SEARCH_MODAL,
      UIactionTypes.CLOSE_SEARCH_MODAL,
    ],
    [
      'toggleCalendarModal',
      toggleCalendarModal,
      'isCalendarOpen',
      UIactionTypes.OPEN_CALENDAR_MODAL,
      UIactionTypes.CLOSE_CALENDAR_MODAL,
    ],
  ] as const)(
    '%s opens when closed and closes when open',
    async (_name, creator, flag, openType, closeType) => {
      const dispatch = jest.fn();
      const closedState = makeState({
        [flag]: false,
      } as Partial<State['ui']>);

      await creator()(dispatch, () => closedState);

      expect(dispatch).toHaveBeenCalledWith({ type: openType });

      dispatch.mockClear();
      const openState = makeState({
        [flag]: true,
      } as Partial<State['ui']>);

      await creator()(dispatch, () => openState);

      expect(dispatch).toHaveBeenCalledWith({ type: closeType });
    }
  );

  it('toggleNightLightMode toggles the night mode', async () => {
    const dispatch = jest.fn();

    await toggleNightLightMode()(dispatch, () =>
      makeState({ isInNightLightMode: false })
    );
    expect(dispatch).toHaveBeenLastCalledWith({
      type: UIactionTypes.TURN_ON_NIGHT_MODE,
    });

    await toggleNightLightMode()(dispatch, () =>
      makeState({ isInNightLightMode: true })
    );
    expect(dispatch).toHaveBeenLastCalledWith({
      type: UIactionTypes.TURN_OFF_NIGHT_MODE,
    });
  });

  it('changeScreenBrightness dispatches the brightness payload', async () => {
    const dispatch = jest.fn();

    await changeScreenBrightness('42')(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: UIactionTypes.CHANGE_BRIGHTNESS,
      payload: '42',
    });
  });

  it('creates the simple direct actions', () => {
    expect(closeWidgetsModal()).toEqual({
      type: UIactionTypes.CLOSE_WIDGETS_MODAL,
    });
    expect(closeAppCenterModal()).toEqual({
      type: UIactionTypes.CLOSE_APP_CENTER_MODAL,
    });
    expect(closeSettingsModal()).toEqual({
      type: UIactionTypes.CLOSE_SETTINGS_MODAL,
    });
    expect(closeSearchModal()).toEqual({
      type: UIactionTypes.CLOSE_SEARCH_MODAL,
    });
    expect(openCalendarModal()).toEqual({
      type: UIactionTypes.OPEN_CALENDAR_MODAL,
    });
    expect(closeCalendarModal()).toEqual({
      type: UIactionTypes.CLOSE_CALENDAR_MODAL,
    });
    expect(notShowIntroAgain()).toEqual({
      type: UIactionTypes.INTRO_WAS_SHOWN,
    });
    expect(openContextMenu({ x: 4, y: 8 })).toEqual({
      type: UIactionTypes.OPEN_CONTEXT_MENU,
      payload: { x: 4, y: 8 },
    });
    expect(closeContextMenu()).toEqual({
      type: UIactionTypes.CLOSE_CONTEXT_MENU,
    });
    expect(sortDesktopIcons('name')).toEqual({
      type: UIactionTypes.SORT_DESKTOP_ICONS,
      payload: 'name',
    });
    expect(changeDesktopIconSize('large')).toEqual({
      type: UIactionTypes.CHANGE_ICON_SIZE,
      payload: 'large',
    });
    expect(deleteDesktopApp('Terminal')).toEqual({
      type: UIactionTypes.DELETE_APP,
      payload: 'Terminal',
    });
    expect(undoLastDeleteDesktopApp()).toEqual({
      type: UIactionTypes.UNDO_DELETE_APP,
    });
    expect(compressDesktopApp('Terminal')).toEqual({
      type: UIactionTypes.COMPRESS_DESKTOP_APP,
      payload: 'Terminal',
    });
  });
});
