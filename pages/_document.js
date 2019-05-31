import Document from "next/document";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";
import Head from "next/head";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f2f2f2;
    margin: 0;
    box-sizing: border-box;
  }
`;
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            sheet.collectStyles(
              <>
                <GlobalStyles />
                <Head>
                  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                  />
                  <title>Website Title</title>
                  <link rel="shortcut icon" href="/static/favicon.ico" />
                </Head>
                <App {...props} />
              </>
            )
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
}
