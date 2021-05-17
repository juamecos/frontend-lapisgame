import {ApolloClient, InMemoryCache, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      console.log(
        `Graphql error ${message}  -  location ${location}  - path ${path}`,
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: 'http://192.168.0.183:2004/graphql'}),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
