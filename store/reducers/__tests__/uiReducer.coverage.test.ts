import { mockReduxStore } from '../../../test/mockReduxStore';
import {
  UIaction,
  UIactionTypes,
  UIstate,
} from '../../../types/redux/ui-reducer-types';
import { uiReducer } from '../uiReducer';

const state = mockReduxStore.ui as UIstate;

const reduced = (action: UIaction): UIstate => uiReducer(state, action);

describe('uiReducer coverage', () => {
  it('closes every modal independently', () => {
    expect(
      reduced({ type: UIactionTypes.CLOSE_SETTINGS_MODAL }).areSettingsOpen
    ).toBe(false);
    expect(
      reduced({ type: UIactionTypes.CLOSE_SEARCH_MODAL }).isSearchOpen
    ).toBe(false);
    expect(
      reduced({ type: UIactionTypes.CLOSE_CALENDAR_MODAL }).isCalendarOpen
    ).toBe(false);
  });

  it('opens search and closes the other panels', () => {
    const next = reduced({
      type: UIactionTypes.OPEN_SEARCH_MODAL,
    });

    expect(next.isSearchOpen).toBe(true);
    expect(next.areSettingsOpen).toBe(false);
    expect(next.isAppCenterOpen).toBe(false);
    expect(next.isWidgetOpen).toBe(false);
    expect(next.isCalendarOpen).toBe(false);
  });

  it('opens calendar and closes the other panels', () => {
    const next = reduced({
      type: UIactionTypes.OPEN_CALENDAR_MODAL,
    });

    expect(next.isCalendarOpen).toBe(true);
    expect(next.isSearchOpen).toBe(false);
    expect(next.areSettingsOpen).toBe(false);
    expect(next.isAppCenterOpen).toBe(false);
    expect(next.isWidgetOpen).toBe(false);
  });

  it('toggles night light mode', () => {
    expect(
      reduced({ type: UIactionTypes.TURN_ON_NIGHT_MODE }).isInNightLightMode
    ).toBe(true);
    expect(
      reduced({ type: UIactionTypes.TURN_OFF_NIGHT_MODE }).isInNightLightMode
    ).toBe(false);
  });

  it('updates brightness, icon size, and icon sorting', () => {
    expect(
      reduced({ type: UIactionTypes.CHANGE_BRIGHTNESS, payload: '40' })
        .screenBrightness
    ).toBe('40');
    expect(
      reduced({ type: UIactionTypes.CHANGE_ICON_SIZE, payload: 'large' })
        .iconsSize
    ).toBe('large');
    expect(
      reduced({ type: UIactionTypes.SORT_DESKTOP_ICONS, payload: 'name' })
        .sortDesktopIconsBy
    ).toBe('name');
  });

  it('closes the context menu', () => {
    expect(
      reduced({ type: UIactionTypes.CLOSE_CONTEXT_MENU }).isContextMenuOpen
    ).toBe(false);
  });

  it('deletes, restores, and compresses apps', () => {
    const deleted = reduced({
      type: UIactionTypes.DELETE_APP,
      payload: 'Terminal',
    });
    expect(deleted.removedApps).toContain('Terminal');

    expect(
      reduced({ type: UIactionTypes.UNDO_DELETE_APP }).removedApps
    ).toEqual([]);

    const compressed = reduced({
      type: UIactionTypes.COMPRESS_DESKTOP_APP,
      payload: 'Terminal',
    });
    expect(compressed.compressedApps).toContain('Terminal');
  });

  it('returns the current state for unknown actions', () => {
    expect(uiReducer(state, { type: 'UNKNOWN' } as unknown as UIaction)).toBe(
      state
    );
  });
});
