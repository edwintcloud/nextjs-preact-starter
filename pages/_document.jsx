// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// Information for OG and Meta Tags
export const title = 'PreactX Demo';
const description =
  'A starter pack for a Next.js SSR Preact PWA deployable on Now.sh.';
const url = `https://preactxdemo.now.sh`;
const thumbnail = `${url}/static/images/thumbnail.png`;

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {/* Performance: Inject the page’s critical CSS in the <head> tag */}
          {this.props.styleTags}

          {/* Progressive Web App: Match the width of app’s content with width of viewport for mobile devices */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Progressive Web App: Have address bar match brand colors */}
          <meta name="theme-color" content="#000" />

          {/* Progressive Web App: Provide manifest file for metadata */}
          <link rel="manifest" href="./static/manifest.json" />

          {/* SEO: App description for search-engine optimization */}
          <meta name="Description" content={description} />

          {/* SEO: Search index and allow web crawlers to scrape the site */}
          <meta name="robots" content="index, follow" />

          {/* SEO: Search engine keywords */}
          <meta name="keywords" content="preact,pwa,nextjs" />

          {/* Bonus: Have beautiful preview tiles when users share your website on social media */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={thumbnail} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={thumbnail} />

          {/* FavIcon: Display icon in browser title bar. */}
          <link
            rel="shortcut icon"
            href="static/images/favicon.ico"
            type="image/x-icon"
          />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
