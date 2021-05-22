import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/client';

import {GlobalTheme} from './src/theme/GlobalTheme';
import {Navigator} from './src/navigation/Navigator';

export default function App() {
  return (
    <NavigationContainer theme={GlobalTheme}>
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    </NavigationContainer>
  );
}
