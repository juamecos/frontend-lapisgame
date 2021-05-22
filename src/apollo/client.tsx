import {ApolloClient, InMemoryCache, ApolloLink} from '@apollo/client';

import {authLink} from './links/authLink';
import {errorLink} from './links/errorLink';
import {httpLink} from './links/httpLink';

const links = [errorLink, authLink, httpLink];
const link = ApolloLink.from(links as any);

const cache = new InMemoryCache();
export const client = new ApolloClient({
  cache,
  link: link as any,
});
