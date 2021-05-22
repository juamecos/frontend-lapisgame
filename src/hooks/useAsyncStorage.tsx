import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (
  key: string,
  initialValue?: string | [] | object,
) => {
  const [storedValue, setStoredValue] = useState();
  const [retrievedFromStorage, setRetrievedFromStorage] = useState(false);

  async function getStoredItem(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : '';
      setStoredValue(value);
      setRetrievedFromStorage(true);
    } catch (error) {
      console.error('useAsyncStorage getItem error:', error);
    }
  }

  useEffect(() => {
    getStoredItem(key);
  }, [key]);

  const setValue = async (value: typeof initialValue) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('useAsyncStorage setItem error:', error);
    }
  };

  return [storedValue, setValue, retrievedFromStorage] as const;
};
