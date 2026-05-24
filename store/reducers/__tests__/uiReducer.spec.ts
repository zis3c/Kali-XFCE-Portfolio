import { uiReducer } from '../uiReducer';
import { UIactionTypes, UIstate } from '../../../types/redux/ui-reducer-types';

const defaultState: UIstate = {
  theme: 'dark',
  screenBrightness: '100',
  isWidgetOpen: false,
  isAppCenterOpen: false,
  areSettingsOpen: false,
  isSearchOpen: false,
  isCalendarOpen: false,
  isInNightLightMode: false,
  shouldIntroBeShown: true,
  isContextMenuOpen: false,
  contextMenuCoords: { x: 0, y: 0 },
  iconsSize: 'medium',
  sortDesktopIconsBy: 'size',
  removedApps: [],
  compressedApps: [],
};

describe('uiReducer', () => {
  it('returns default state', () => {
    const state = uiReducer(undefined, { type: '@@INIT' } as any);
    expect(state).toEqual(defaultState);
  });

  it('toggles theme from dark to light', () => {
    const state = uiReducer(defaultState, { type: UIactionTypes.CHANGE_THEME });
    expect(state.theme).toBe('light');
  });

  it('toggles theme from light to dark', () => {
    const lightState = { ...defaultState, theme: 'light' as const };
    const state = uiReducer(lightState, { type: UIactionTypes.CHANGE_THEME });
    expect(state.theme).toBe('dark');
  });

  it('opens and closes widgets modal', () => {
    const opened = uiReducer(defaultState, { type: UIactionTypes.OPEN_WIDGETS_MODAL });
    expect(opened.isWidgetOpen).toBe(true);

    const closed = uiReducer(opened, { type: UIactionTypes.CLOSE_WIDGETS_MODAL });
    expect(closed.isWidgetOpen).toBe(false);
  });

  it('opens one modal closes others', () => {
    const state = uiReducer(defaultState, { type: UIactionTypes.OPEN_SETTINGS_MODAL });
    expect(state.areSettingsOpen).toBe(true);
    expect(state.isWidgetOpen).toBe(false);
    expect(state.isAppCenterOpen).toBe(false);
  });

  it('opens context menu at coordinates', () => {
    const state = uiReducer(defaultState, {
      type: UIactionTypes.OPEN_CONTEXT_MENU,
      payload: { x: 150, y: 300 },
    });
    expect(state.isContextMenuOpen).toBe(true);
    expect(state.contextMenuCoords).toEqual({ x: 150, y: 300 });
  });

  it('closes context menu', () => {
    const openState = { ...defaultState, isContextMenuOpen: true };
    const state = uiReducer(openState, { type: UIactionTypes.CLOSE_CONTEXT_MENU });
    expect(state.isContextMenuOpen).toBe(false);
  });

  it('marks intro as shown', () => {
    const state = uiReducer(defaultState, { type: UIactionTypes.INTRO_WAS_SHOWN });
    expect(state.shouldIntroBeShown).toBe(false);
  });

  it('changes screen brightness', () => {
    const state = uiReducer(defaultState, {
      type: UIactionTypes.CHANGE_BRIGHTNESS,
      payload: '75',
    });
    expect(state.screenBrightness).toBe('75');
  });

  it('changes icon size', () => {
    const state = uiReducer(defaultState, {
      type: UIactionTypes.CHANGE_ICON_SIZE,
      payload: 'large',
    });
    expect(state.iconsSize).toBe('large');
  });

  it('sorts desktop icons', () => {
    const state = uiReducer(defaultState, {
      type: UIactionTypes.SORT_DESKTOP_ICONS,
      payload: 'name',
    });
    expect(state.sortDesktopIconsBy).toBe('name');
  });

  it('deletes and undoes app removal', () => {
    const deleted = uiReducer(defaultState, {
      type: UIactionTypes.DELETE_APP,
      payload: 'Firefox',
    });
    expect(deleted.removedApps).toContain('Firefox');

    const undone = uiReducer(deleted, { type: UIactionTypes.UNDO_DELETE_APP });
    expect(undone.removedApps).toEqual([]);
  });
});
