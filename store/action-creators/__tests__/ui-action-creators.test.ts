import { State } from '../../reducers';
import { UIactionTypes } from '../../../types/redux/ui-reducer-types';
import {
  changeDesktopIconSize,
  changeScreenBrightness,
  changeTheme,
  closeAppCenterModal,
  closeContextMenu,
  compressDesktopApp,
  deleteDesktopApp,
  notShowIntroAgain,
  openContextMenu,
  sortDesktopIcons,
  toggleAppCenterModal,
  toggleNightLightMode,
  undoLastDeleteDesktopApp,
} from '../ui-action-creators';

const makeState = (overrides: Partial<State['ui']> = {}): State =>
  ({
    ui: {
      theme: 'dark',
      isAppCenterOpen: false,
      isInNightLightMode: false,
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

  it('toggleAppCenterModal opens when closed and closes when open', async () => {
    const dispatch = jest.fn();

    await toggleAppCenterModal()(dispatch, () =>
      makeState({ isAppCenterOpen: false })
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: UIactionTypes.OPEN_APP_CENTER_MODAL,
    });

    dispatch.mockClear();
    await toggleAppCenterModal()(dispatch, () =>
      makeState({ isAppCenterOpen: true })
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: UIactionTypes.CLOSE_APP_CENTER_MODAL,
    });
  });

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
    expect(closeAppCenterModal()).toEqual({
      type: UIactionTypes.CLOSE_APP_CENTER_MODAL,
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
