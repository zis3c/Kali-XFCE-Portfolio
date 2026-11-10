import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import AppCenter from './AppCenter';
import * as Styled from './AppCenter.styles';

const { darkTheme } = useSystemDesign();

const render = () => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <AppCenter />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

const clickCategory = (wrap: ReturnType<typeof mount>, name: string) =>
  wrap
    .find(Styled.CategoryItem)
    .filterWhere((node) => node.text().includes(name))
    .simulate('click');
const clickApp = (wrap: ReturnType<typeof mount>, name: string) =>
  wrap
    .find(Styled.AppItem)
    .filterWhere((node) => node.text().includes(name))
    .simulate('click');

describe('AppCenter coverage', () => {
  it('opens every favorite app action', () => {
    const { wrap, store } = render();

    for (const name of [
      'Thunar File Manager',
      'Mousepad',
      'Google Chrome',
      'Projects',
      'Contact',
    ]) {
      clickApp(wrap, name);
    }

    expect(
      store.getState().windows.openedWindows.length
    ).toBeGreaterThanOrEqual(4);
  });

  it('opens terminal from favorites', () => {
    const { wrap, store } = render();

    clickApp(wrap, 'Terminal Emulator');

    expect(store.getState().windows.openedWindows).toHaveLength(1);
    expect(store.getState().windows.openedWindows[0].windowName).toContain(
      'Terminal'
    );
  });

  it('opens development apps', () => {
    const { wrap, store } = render();
    clickCategory(wrap, 'Development');

    clickApp(wrap, 'Skills');
    clickApp(wrap, 'Projects');

    expect(store.getState().windows.openedWindows.length).toBe(2);
  });

  it('opens internet apps', () => {
    const { wrap, store } = render();
    clickCategory(wrap, 'Internet');

    clickApp(wrap, 'Google Chrome');

    expect(store.getState().windows.openedWindows).toHaveLength(1);
  });

  it('handles the settings manager no-op action', () => {
    const { wrap, store } = render();
    clickCategory(wrap, 'Settings');

    clickApp(wrap, 'Settings Manager');

    expect(store.getState().windows.openedWindows).toHaveLength(0);
  });

  it('opens the selected app with Enter', () => {
    const { wrap, store } = render();

    wrap
      .find(Styled.SearchInput)
      .simulate('change', { target: { value: 'mousepad' } })
      .simulate('keydown', { key: 'Enter', preventDefault: jest.fn() });

    expect(store.getState().windows.openedWindows).toHaveLength(1);
    expect(store.getState().windows.openedWindows[0].windowName).toContain(
      'Mousepad'
    );
  });
});
