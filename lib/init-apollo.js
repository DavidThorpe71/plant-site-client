import ApolloClient from 'apollo-client';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';

let apolloClient = null;

const link = createPersistedQueryLink({
  useGETForHashedQueries: true
})
  // .concat(
  //   onError(({ graphQLErrors, networkError }) => {
  //     if (graphQLErrors)
  //       graphQLErrors.map(({ message, locations, path }) =>
  //         console.log(
  //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //         )
  //       );
  //     if (networkError) console.log(`[Network error]: ${networkError}`);
  //   })
  // )
  .concat(
    new HttpLink({
      uri: 'http://localhost:2121/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !process.browser && fetch
    })
  );

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
