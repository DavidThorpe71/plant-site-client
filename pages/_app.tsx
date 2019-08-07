import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider, WithApolloClient } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { AppContext } from "next/app";

const theme = {
  colors: {
    primary: "#57976d",
    background: "#f2f2f2"
  }
};

class MyApp extends App<WithApolloClient<any>> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps: { query?: {} } = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    const url = {
      pathname: ctx.pathname,
      query: ctx.query
    };

    return { url, pageProps };
  }

  render() {
    const { Component, pageProps, url, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component url={url} {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
