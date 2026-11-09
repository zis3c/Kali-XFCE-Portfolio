import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import { SESSION_ACTION_EVENT } from '../../utils/session-actions';
import AppCenter from './AppCenter';
import * as Styled from './AppCenter.styles';

const { darkTheme } = useSystemDesign();

const setup = () => {
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

describe('AppCenter behavior', () => {
  it('shows the favorite apps by default', () => {
    const { wrap } = setup();
    expect(wrap.find(Styled.AppItem)).toHaveLength(6);
  });

  it('filters apps by category', () => {
    const { wrap } = setup();

    wrap
      .find(Styled.CategoryItem)
      .filterWhere((n) => n.text().includes('Development'))
      .simulate('click');

    expect(wrap.find(Styled.AppItem)).toHaveLength(3);
  });

  it('filters apps by search term', () => {
    const { wrap } = setup();

    wrap
      .find(Styled.SearchInput)
      .simulate('change', { target: { value: 'chrome' } });

    expect(wrap.find(Styled.AppItem)).toHaveLength(1);
    expect(wrap.text()).toContain('Google Chrome');
  });

  it('shows an empty state when nothing matches', () => {
    const { wrap } = setup();

    wrap
      .find(Styled.SearchInput)
      .simulate('change', { target: { value: 'zzzz' } });

    expect(wrap.text()).toContain('No applications found');
  });

  it('opens the selected app with Enter', () => {
    const { wrap, store } = setup();

    wrap
      .find(Styled.SearchInput)
      .simulate('change', { target: { value: 'terminal' } })
      .simulate('keydown', { key: 'Enter', preventDefault: jest.fn() });

    expect(store.getState().windows.openedWindows).toHaveLength(1);
    expect(store.getState().windows.openedWindows[0].windowName).toContain(
      'Terminal'
    );
  });

  it('moves the active app with arrow keys', () => {
    const { wrap } = setup();
    const search = wrap.find(Styled.SearchInput);

    search.simulate('keydown', { key: 'ArrowDown', preventDefault: jest.fn() });
    expect(wrap.find(Styled.AppItem).at(1).prop('isActive')).toBe(true);

    search.simulate('keydown', { key: 'ArrowUp', preventDefault: jest.fn() });
    expect(wrap.find(Styled.AppItem).at(0).prop('isActive')).toBe(true);
  });

  it('dispatches the logout session action from the footer', () => {
    const { wrap } = setup();
    const listener = jest.fn();
    window.addEventListener(SESSION_ACTION_EVENT, listener);

    wrap
      .find(Styled.FooterButton)
      .filterWhere((n) => n.text() === 'Log Out')
      .simulate('click');

    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('logout');

    window.removeEventListener(SESSION_ACTION_EVENT, listener);
  });

  it('dispatches the restart session action from the footer', () => {
    const { wrap } = setup();
    const listener = jest.fn();
    window.addEventListener(SESSION_ACTION_EVENT, listener);

    wrap
      .find(Styled.FooterButton)
      .filterWhere((n) => n.text() === 'Restart')
      .simulate('click');

    expect((listener.mock.calls[0][0] as CustomEvent).detail).toBe('restart');

    window.removeEventListener(SESSION_ACTION_EVENT, listener);
  });
});
