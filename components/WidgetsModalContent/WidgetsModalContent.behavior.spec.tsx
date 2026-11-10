import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { storeFactory } from '../../test/testUtils';
import { mockReduxStore } from '../../test/mockReduxStore';
import { useSystemDesign } from '../../design-system/useSystemDesign';
import { LocalRootState } from '../../store/reducers';
import WidgetsModalContent from './WidgetsModalContent';
import NewsWidget from '../NewsWidget/NewsWidget';

const { darkTheme } = useSystemDesign();

const setup = () => {
  const state = {
    ...mockReduxStore,
    news: {
      newsArticles: [
        {
          source: { id: null, name: 'Kali News' },
          author: null,
          title: 'New release',
          description: null,
          url: 'https://example.com/news',
          urlToImage: 'https://example.com/thumb.png',
          publishedAt: '2026-01-01',
          content: null,
        },
        {
          source: { id: null, name: 'No image' },
          author: null,
          title: 'Skipped',
          description: null,
          url: 'https://example.com/skipped',
          urlToImage: null,
          publishedAt: '2026-01-02',
          content: null,
        },
      ],
      areNewsLoading: false,
      error: null,
    },
  } as LocalRootState;

  const wrap = mount(
    <ThemeProvider theme={darkTheme}>
      <Provider store={storeFactory(state)}>
        <WidgetsModalContent />
      </Provider>
    </ThemeProvider>
  );
  return wrap;
};

describe('WidgetsModalContent behavior', () => {
  it('renders only news articles with images and links', () => {
    const wrap = setup();

    expect(wrap.find(NewsWidget)).toHaveLength(1);
    expect(wrap.text()).toContain('New release');
  });
});
