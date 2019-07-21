import { h } from 'preact';
import App, { Container } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { title } from './_document';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          <Component {...pageProps} />
          <GlobalStyle />
        </Container>
      </>
    );
  }
}

// Global CSS Styles
const GlobalStyle = createGlobalStyle`
  body, html {
    height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default MyApp;
