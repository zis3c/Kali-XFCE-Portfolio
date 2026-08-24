import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import * as React from 'react';
import type { DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Poppins:wght@300;400;700;900&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href="/tab-header.png" />
          <link rel="apple-touch-icon" href="/tab-header.png" />
          <link rel="manifest" href="/app.webmanifest" />

          <meta property="og:title" content="Radzi Zamri" />
          <meta name="author" content="Radzi Zamri" />
          <meta property="og:locale" content="en_US" />
          <meta
            name="description"
            content="Radzi Zamri | Cybersecurity Student | Purple Team | Dot Zero"
          />
          <meta
            property="og:description"
            content="Radzi Zamri | Cybersecurity Student | Purple Team | Dot Zero"
          />

          <meta property="og:url" content="https://github.com/zis3c" />
          <meta property="og:site_name" content="zis3c" />
          <meta property="og:type" content="website" />

          <meta name="keywords" content="Radzi Zamri, Cybersecurity, Portfolio, Dot Zero, Purple Team, zis3c, Kali Linux, Web Development, InfoSec, Security" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Radzi Zamri" />
          <meta name="twitter:description" content="Radzi Zamri | Cybersecurity Student | Purple Team | Dot Zero" />
          <script src="/init-sw.js" defer></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
