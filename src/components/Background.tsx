import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Background = () => {
  const {colors} = useTheme();
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        position: 'absolute',
        backgroundColor: colors.primary,
        top: -250,
        width: 800,
        height: 950,
        transform: [{rotate: '-70deg'}],
      }}
    />
  );
};

export default Background;
