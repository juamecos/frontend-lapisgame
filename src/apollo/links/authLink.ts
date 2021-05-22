import {setContext} from 'apollo-link-context';
import {getToken} from '../../utils/tokens';
export const authLink = setContext(async (req, {headers}) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? token : null,
    },
  };
});
