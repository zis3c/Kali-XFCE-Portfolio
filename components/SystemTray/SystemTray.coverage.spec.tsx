import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import { DESKTOP_NOTIFICATION_EVENT } from '../../utils/notifications';
import SystemTray from './SystemTray';
import * as Styled from './SystemTray.styles';

const { darkTheme } = useSystemDesign();

const windowFor = (name: string, icon: string, overrides = {}) => ({
  windowName: name,
  isOpen: true,
  windowIcon: icon,
  size: { width: 100, height: 100 },
  windowContent: null,
  isMinimized: false,
  workspace: 1,
  ...overrides,
});

const render = (windows: ReturnType<typeof windowFor>[] = [], ui = {}) => {
  const store = storeFactory({
    ...mockReduxStore,
    ui: { ...mockReduxStore.ui, ...ui },
    windows: {
      openedWindows: windows,
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
  return { wrap, store };
};

describe('SystemTray coverage', () => {
  it('renders every Kali window icon variant', () => {
    const icons = [
      '/assets/icon.png',
      'KALI_TERMINAL',
      'KALI_FILEMANAGER',
      'KALI_USER',
      'KALI_FOLDER',
      'KALI_CODE',
      'KALI_MAIL',
      'KALI_SETTINGS',
      'KALI_TEXTFILE',
      'UNKNOWN_ICON',
    ];
    const { wrap } = render(
      icons.map((icon, index) => windowFor(`Window ${index}`, icon))
    );

    expect(wrap.find(Styled.TaskButton)).toHaveLength(icons.length);
  });

  it('focuses an inactive window and minimizes the active one', () => {
    const { wrap, store } = render([
      windowFor('Terminal', 'KALI_TERMINAL'),
      windowFor('Files', 'KALI_FILEMANAGER'),
    ]);

    wrap.find(Styled.TaskButton).at(0).simulate('click');
    expect(store.getState().windows.activeWindowName).toBe('Terminal');

    act(() => {
      wrap.find(Styled.TaskButton).at(0).simulate('click');
    });

    expect(store.getState().windows.openedWindows[0].isMinimized).toBe(true);
  });

  it('closes the app center when clicking outside', () => {
    const { wrap, store } = render([], { isAppCenterOpen: true });

    act(() => {
      document.body.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );
    });
    wrap.update();

    expect(store.getState().ui.isAppCenterOpen).toBe(false);
  });

  it('closes the app center with Escape', () => {
    const { wrap, store } = render([], { isAppCenterOpen: true });

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    wrap.update();

    expect(store.getState().ui.isAppCenterOpen).toBe(false);
  });

  it('emits desktop notifications from the panel menu', () => {
    const { wrap } = render();
    const listener = jest.fn();
    window.addEventListener(DESKTOP_NOTIFICATION_EVENT, listener);

    wrap.find(Styled.Container).simulate('contextmenu', {
      preventDefault: jest.fn(),
      clientX: 4,
      clientY: 8,
    });
    wrap.update();

    wrap
      .find(Styled.PanelItem)
      .filterWhere((node) => node.text() === 'Panel Preferences')
      .simulate('click');
    wrap.update();

    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail.title).toBe(
      'Panel Preferences'
    );

    window.removeEventListener(DESKTOP_NOTIFICATION_EVENT, listener);
  });

  it('updates the active workspace through Taskbar', () => {
    const { wrap, store } = render();
    const taskbar = wrap.find('Taskbar');
    const onChange = taskbar.prop('onWorkspaceChange') as (
      value: number
    ) => void;

    act(() => {
      onChange(3);
    });

    expect(store.getState().windows.activeWorkspace).toBe(3);
  });
});
