import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from '../components/Logo';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Welcome to LapisGame</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#035392',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#deecff',
    fontFamily: 'lato',
  },
});
