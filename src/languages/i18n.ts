// import the original type declarations
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import register from '../languages/en/register.json';
import registerES from '../languages/es/register.json';
import registerCS from '../languages/cs/register.json';
import login from '../languages/en/login.json';
import loginES from '../languages/es/login.json';
import loginCS from '../languages/cs/login.json';
import * as RNLocalize from 'react-native-localize';

export const resources = {
  en: {
    register,
    login,
  },
  es: {
    register: registerES,
    login: loginES,
  },
  cs: {
    register: registerCS,
    login: loginCS,
  },
} as const;

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (callback) => void) => {
    return callback(RNLocalize.getLocales()[0].languageCode);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['register', 'login'],
    resources,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
