import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const Logo = () => {
  return (
    <View style={styles.imgContainer}>
      <Image
        source={require('../assets/lapis-logo-200x130path28.png')}
        style={styles.img}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  imgContainer: {alignItems: 'center'},
  img: {width: 150, height: 95},
});
