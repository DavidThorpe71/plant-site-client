import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import withApolloClient from "../lib/with-apollo-client";
import Layout from "../components/Layout";

const theme = {
  colors: {
    primary: "#57976d",
    background: "#f2f2f2"
  }
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

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
            <Layout>
              <Component url={url} {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
