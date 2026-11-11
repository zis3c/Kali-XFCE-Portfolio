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
