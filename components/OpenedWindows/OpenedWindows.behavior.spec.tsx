import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import OpenedWindows from './OpenedWindows';
import Window from '../Window/Window';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const store = storeFactory({
    ...mockReduxStore,
    windows: {
      openedWindows: [
        {
          windowName: 'Terminal',
          isOpen: true,
          windowIcon: 'KALI_TERMINAL',
          size: { width: 400, height: 300 },
          windowContent: <span>shell</span>,
          isMinimized: false,
          workspace: 1,
        },
      ],
      activeWindowName: 'Terminal',
      activeWorkspace: 1,
    },
  });
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <OpenedWindows />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

describe('OpenedWindows behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders open windows for the active workspace', () => {
    const { wrap } = setup();

    expect(wrap.find(Window)).toHaveLength(1);
    expect(wrap.text()).toContain('Terminal');
  });

  it('closes and clears a window', () => {
    const { wrap, store } = setup();

    act(() => {
      wrap.find(Window).prop('closeWindow')();
    });

    expect(store.getState().windows.openedWindows[0].isOpen).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(store.getState().windows.openedWindows).toHaveLength(0);
  });

  it('minimizes windows', () => {
    const { wrap, store } = setup();

    act(() => {
      wrap.find(Window).prop('minimizeWindow')();
    });

    expect(store.getState().windows.openedWindows[0].isMinimized).toBe(true);
  });
});
