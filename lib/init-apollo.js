import ApolloClient from "apollo-client";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";
import { from } from "apollo-link";
import { onError } from "apollo-link-error";

let apolloClient = null;

const link = createPersistedQueryLink({
  useGETForHashedQueries: true
}).concat(
  new HttpLink({
    uri: "http://localhost:2121/graphql",
    credentials: "same-origin",
    fetch: !process.browser && fetch
  })
);

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {}),
    link
  });
}

export default function initApollo(initialState) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
