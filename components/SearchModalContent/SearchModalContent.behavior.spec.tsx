import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import SearchModalContent from './SearchModalContent';
import * as Styled from './SearchModalContent.styles';
import SearchBar from '../SearchBar/SearchBar';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const store = storeFactory(mockReduxStore);
  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <SearchModalContent />
      </Provider>
    </ThemeProvider>
  );
  return { wrap, store };
};

describe('SearchModalContent behavior', () => {
  it('performs a search and opens Chrome', () => {
    const { wrap, store } = setup();

    wrap
      .find(SearchBar)
      .find('input')
      .simulate('change', { target: { value: 'nmap' } });
    wrap.find('form').simulate('submit', { preventDefault: jest.fn() });

    const windows = store.getState().windows.openedWindows;
    expect(windows).toHaveLength(1);
    expect(windows[0].windowName).toBe('Google Chrome');
  });

  it('runs a quick search', () => {
    const { wrap, store } = setup();

    wrap.find(Styled.QuickSearch).first().simulate('click');

    expect(store.getState().windows.openedWindows).toHaveLength(1);
  });

  it('renders top apps', () => {
    const { wrap } = setup();

    expect(wrap.find(Styled.TopApp)).toHaveLength(5);
    expect(wrap.text()).toContain('Bash');
  });
});
