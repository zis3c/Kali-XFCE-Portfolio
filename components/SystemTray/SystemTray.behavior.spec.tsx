import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import { SESSION_ACTION_EVENT } from '../../utils/session-actions';
import SystemTray from './SystemTray';
import * as Styled from './SystemTray.styles';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <SystemTray />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

describe('SystemTray behavior', () => {
  it('opens the app center', () => {
    const { wrap, store } = setup();

    wrap.find(Styled.ApplicationsButton).simulate('click');

    expect(store.getState().ui.isAppCenterOpen).toBe(true);
  });

  it('renders an active window task button and focuses it', () => {
    const store = storeFactory({
      ...mockReduxStore,
      windows: {
        openedWindows: [
          {
            windowName: 'Terminal',
            isOpen: true,
            windowIcon: 'KALI_TERMINAL',
            size: { width: 100, height: 100 },
            windowContent: null,
            isMinimized: false,
            workspace: 1,
          },
        ],
        activeWindowName: null,
        activeWorkspace: 1,
      },
    });
    const wrap = mount(
      <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
          <SystemTray />
        </Provider>
      </ThemeProvider>
    );

    wrap.find(Styled.TaskButton).simulate('click');

    expect(store.getState().windows.activeWindowName).toBe('Terminal');
  });

  it('opens the panel context menu and logs out', () => {
    const { wrap } = setup();
    const listener = jest.fn();
    window.addEventListener(SESSION_ACTION_EVENT, listener);

    wrap.find(Styled.Container).simulate('contextmenu', {
      preventDefault: jest.fn(),
      clientX: 10,
      clientY: 20,
    });
    wrap.update();

    expect(wrap.text()).toContain('Panel Preferences');

    wrap
      .find(Styled.PanelItem)
      .filterWhere((n) => n.text() === 'Log Out')
      .simulate('click');

    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('logout');

    window.removeEventListener(SESSION_ACTION_EVENT, listener);
  });

  it('closes the panel menu with Escape', () => {
    const { wrap } = setup();

    wrap.find(Styled.Container).simulate('contextmenu', {
      preventDefault: jest.fn(),
      clientX: 10,
      clientY: 20,
    });
    wrap.update();
    expect(wrap.find(Styled.PanelMenu)).toHaveLength(1);

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    wrap.update();

    expect(wrap.find(Styled.PanelMenu)).toHaveLength(0);
  });
});
