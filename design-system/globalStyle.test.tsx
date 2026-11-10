import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyle';
import { useSystemDesign } from './useSystemDesign';

describe('GlobalStyles', () => {
  it('renders the global theme CSS', () => {
    const { darkTheme } = useSystemDesign();
    const sheet = new ServerStyleSheet();

    const html = renderToString(
      sheet.collectStyles(
        <ThemeProvider theme={darkTheme}>
          <GlobalStyles />
        </ThemeProvider>
      )
    );

    expect(html).toBe('');
    expect(sheet.getStyleTags()).toContain('body');
    expect(sheet.getStyleTags()).toContain(darkTheme.primary.background);
    sheet.seal();
  });
});
