import AsyncStorage from '@react-native-async-storage/async-storage';
const storeToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (err) {
    console.log(err);
  }
};
const storeRefreshToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('refreshToken', value);
  } catch (err) {
    console.log(err);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (err) {
    console.log(err);
  }
};
const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return refreshToken;
  } catch (err) {
    console.log(err);
  }
};

export {storeToken, storeRefreshToken, getToken, getRefreshToken};
