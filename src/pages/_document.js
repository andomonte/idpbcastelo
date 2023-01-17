import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from 'src/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pr-BR" content="notranslate" translate="no">
        <Head>
          {/* PWA primary color */}

          <meta name="google" content="notranslate" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="yes" name="mobile-web-app-capable" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@200;400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Fugaz One:wght@200;400&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href="/images/filadelfia.ico" type="image/x-icon" />

          <link rel="manifest" href="/images/manifest.json" />
          <link rel="apple-touch-icon" href="/images/apple-icon.png" />

          <link rel="icon" href="/images/filadelfia.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
