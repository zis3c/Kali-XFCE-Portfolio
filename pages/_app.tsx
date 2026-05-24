import type { AppProps } from 'next/app';
import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { wrapper } from '../store';
import { GlobalStyles } from '../design-system/globalStyle';
import '../design-system/index.css';
import Head from 'next/head';
import { useSystemDesign } from '../design-system/useSystemDesign';
import CRTEffect from '../components/CRTEffect/CRTEffect';
import { validateEnv } from '../utils/env';

// Validate environment at module load time (server-side only)
if (typeof window === 'undefined') {
  const envResult = validateEnv();
  if (!envResult.valid) {
    // eslint-disable-next-line no-console
    console.error(
      `[ENV] Missing required variables: ${envResult.missing.join(', ')}`
    );
  }
  if (envResult.warnings.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(`[ENV] ${envResult.warnings.join('\n[ENV] ')}`);
  }
}

const WrappedApp: FC<AppProps> = ({
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

export default wrapper.withRedux(WrappedApp);
