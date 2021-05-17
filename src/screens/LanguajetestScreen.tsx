import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as RNLocalize from 'react-native-localize';

interface Props extends StackScreenProps<any, any> {}
const detectedLanguage = RNLocalize.getLocales()[0].languageCode;

const LanguajetestScreen = ({navigation}: Props) => {
  const {t, i18n} = useTranslation('register');
  const [selectedLanguage, setSelectedLanguage] = useState(detectedLanguage);

  return (
    <View>
      <Text>Settings</Text>
      <Picker
        selectedValue={
          detectedLanguage === selectedLanguage
            ? detectedLanguage
            : selectedLanguage
        }
        onValueChange={itemValue => {
          setSelectedLanguage(itemValue);
          i18n.changeLanguage(itemValue);
        }}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Español" value="es" />
        <Picker.Item label="Cestina" value="cs" />
      </Picker>
      <Text>{t('title')}</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text>Register Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguajetestScreen;
