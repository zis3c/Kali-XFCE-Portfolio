import {
  IWindow,
  WindowsActionTypes,
} from '../../../types/redux/windows-reducer-types';
import {
  closeOpenedWindow,
  focusWindow,
  openWindow,
  setActiveWorkspace,
  toggleMinimizeWindow,
} from '../windows-action-creators';

const windowParams: IWindow = {
  windowName: 'Terminal',
  isOpen: true,
  windowIcon: 'KALI_TERMINAL',
  size: { width: 640, height: 420 },
  windowContent: null,
};

describe('windows action creators', () => {
  it('creates an OPEN_WINDOW action', () => {
    expect(openWindow(windowParams)).toEqual({
      type: WindowsActionTypes.OPEN_WINDOW,
      payload: windowParams,
    });
  });

  it('creates a TOGGLE_MINIMIZE_WINDOW action', () => {
    expect(toggleMinimizeWindow('Terminal')).toEqual({
      type: WindowsActionTypes.TOGGLE_MINIMIZE_WINDOW,
      payload: 'Terminal',
    });
  });

  it('creates a FOCUS_WINDOW action', () => {
    expect(focusWindow('Terminal')).toEqual({
      type: WindowsActionTypes.FOCUS_WINDOW,
      payload: 'Terminal',
    });
  });

  it('creates a SET_ACTIVE_WORKSPACE action', () => {
    expect(setActiveWorkspace(3)).toEqual({
      type: WindowsActionTypes.SET_ACTIVE_WORKSPACE,
      payload: 3,
    });
  });

  describe('closeOpenedWindow', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('closes immediately and clears the window after the animation', async () => {
      const dispatch = jest.fn();

      const promise = closeOpenedWindow('Terminal')(dispatch);
      await promise;

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: WindowsActionTypes.CLOSE_WINDOW,
        payload: 'Terminal',
      });
      expect(dispatch).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: WindowsActionTypes.CLEAR_CLOSED_WINDOWS,
        payload: 'Terminal',
      });
    });
  });
});
