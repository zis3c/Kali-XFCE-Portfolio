import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import Desktop from './Desktop';
import * as Styled from './Desktop.styles';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Desktop />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

describe('Desktop behavior', () => {
  it('opens a terminal with Ctrl+Alt+T', () => {
    const { store } = setup();

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 't', ctrlKey: true, altKey: true })
    );

    expect(store.getState().windows.openedWindows).toHaveLength(1);
    expect(store.getState().windows.openedWindows[0].windowIcon).toBe(
      'KALI_TERMINAL'
    );
  });

  it('opens the desktop context menu on right click', () => {
    const { wrap, store } = setup();

    wrap
      .find(Styled.Container)
      .simulate('contextmenu', { preventDefault: jest.fn() });
    wrap.update();

    expect(store.getState().ui.isContextMenuOpen).toBe(true);
  });
});
