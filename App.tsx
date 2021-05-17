import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/client';

import {Navigator} from './src/navigation/Navigator';

const MyTheme = {
  dark: false,
  secondaryColor: '#e4a40f',
  tertiaryColor: '#e8373d',
  formError: '#ffffff',
  colors: {
    primary: '#035392',
    background: '#deecff',
    card: 'rgb(255, 255, 255)',
    text: 'rgba(28, 28, 30, 0.8)',
    border: 'rgb(199, 199, 204)',
    notification: 'green',
  },
};

const RootProvider = ({children}: any) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <RootProvider>
      <Navigator />
    </RootProvider>
  );
}
