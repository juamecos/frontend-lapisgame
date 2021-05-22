import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotScreen from '../screens/ForgotScreen';
import UsersScreen from '../screens/UsersScreen';
import LanguajetestScreen from '../screens/LanguajetestScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator();
export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="LanguajetestScreen" component={LanguajetestScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
      <Stack.Screen name="UsersScreen" component={UsersScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};
