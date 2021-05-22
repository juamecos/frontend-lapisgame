import {createHttpLink} from '@apollo/client';
// TODO uri in .env
export const httpLink = createHttpLink({
  uri: 'http://192.168.0.183:2004/graphql',
});
