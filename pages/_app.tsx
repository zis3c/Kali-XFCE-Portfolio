import type { AppProps } from 'next/app';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { wrapper } from '../store';
import { GlobalStyles } from '../design-system/globalStyle';
import '../design-system/index.css';
import Head from 'next/head';
import { useSystemDesign } from '../design-system/useSystemDesign';
import CRTEffect from '../components/CRTEffect/CRTEffect';
import { validateEnv } from '../utils/env';
import { logger } from '../utils/logger';

// Validate environment at module load time (server-side only)
if (typeof window === 'undefined') {
  const envResult = validateEnv();
  if (!envResult.valid) {
    logger.error(
      `[ENV] Missing required variables: ${envResult.missing.join(', ')}`
    );
  }
  if (envResult.warnings.length > 0) {
    logger.warn(`[ENV] ${envResult.warnings.join('\n[ENV] ')}`);
  }
}

const AppContent: FC<AppProps> = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  const { theme } = useTypedSelector((state) => state.ui);
  const { darkTheme, lightTheme } = useSystemDesign();

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <Head>
        <title>Radzi Zamri</title>
      </Head>
      <GlobalStyles />
      <CRTEffect />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

const WrappedApp: FC<AppProps> = (props): JSX.Element => {
  const { store, props: wrappedProps } = wrapper.useWrappedStore(props);

  return (
    <Provider store={store}>
      <AppContent {...wrappedProps} />
    </Provider>
  );
};

export default WrappedApp;
