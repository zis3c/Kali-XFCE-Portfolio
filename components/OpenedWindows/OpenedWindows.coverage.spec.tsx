import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import OpenedWindows from './OpenedWindows';
import Window from '../Window/Window';

const { darkTheme } = useSystemDesign();

const makeWindow = (overrides: Record<string, unknown>) => ({
  windowName: 'Terminal',
  isOpen: true,
  windowIcon: 'KALI_TERMINAL',
  size: { width: 100, height: 100 },
  windowContent: null,
  isMinimized: false,
  workspace: 1,
  ...overrides,
});

describe('OpenedWindows coverage', () => {
  it('only renders open, non-minimized windows from the active workspace', () => {
    const store = storeFactory({
      ...mockReduxStore,
      windows: {
        openedWindows: [
          makeWindow({ windowName: 'Eligible', workspace: undefined }),
          makeWindow({ windowName: 'Minimized', isMinimized: true }),
          makeWindow({ windowName: 'OtherWorkspace', workspace: 2 }),
          makeWindow({ windowName: 'Closed', isOpen: false }),
        ],
        activeWindowName: 'Eligible',
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

    expect(wrap.find(Window)).toHaveLength(1);
    expect(wrap.text()).toContain('Eligible');
  });
});
