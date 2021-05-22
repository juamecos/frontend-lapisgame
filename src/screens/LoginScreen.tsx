import {StackScreenProps} from '@react-navigation/stack';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import React, {useEffect} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Logo from '../components/Logo';
import {useTheme} from '@react-navigation/native';
import {useLoginMutation} from '../generated/graphql';
import {useTranslation} from 'react-i18next';
import CustomInput from '../components/forms/CustomInput';
import {getToken, storeToken, storeRefreshToken} from '../utils/tokens';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const {
    // colors,
    // secondaryColor,
    // tertiaryColor,
    // formError,
    screenContainer,
    formContainer,
  } = useTheme();
  const [loginMutation, {data, loading, error}] = useLoginMutation();
  const {t} = useTranslation('login');

  useEffect(() => {
    const token = getToken();
    console.log(token);
  }, []);
  useEffect(() => {
    if (
      data?.login?.status &&
      data?.login?.token !== null &&
      data?.login?.token !== undefined &&
      data?.login?.refreshToken !== null &&
      data?.login?.refreshToken !== undefined
    ) {
      const accessToken = data.login.token;
      const refreshToken = data.login.refreshToken;
      console.log(accessToken);

      storeToken(accessToken);

      storeRefreshToken(refreshToken);

      navigation.navigate('UserScreen');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <Text>Loading ...</Text>;

  if (error) return <Text> Something went wrong {error}</Text>;

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      {/* <Background /> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={screenContainer}>
          <Logo />
          {!data?.login?.status && <Text>{data?.login?.message}</Text>}
          <Text>{t('title')}</Text>
          <Formik
            initialValues={initialValues}
            onSubmit={async values => {
              try {
                await loginMutation({
                  variables: {email: values.email, password: values.password},
                });
                Keyboard.dismiss();
                // eslint-disable-next-line no-catch-shadow
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email(t('form.email.error.valid'))
                .required(t('form.email.error.required')),
              password: yup
                .string()
                .min(4, t('form.passwword.error.min'))
                .max(16, t('form.passwword.error.max'))
                .required(t('form.passwword.error.required')),
            })}>
            {({isValid, handleSubmit}) => (
              <View style={formContainer}>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder={t('form.email.placeholder')}
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder={t('form.passwword.placeholder')}
                  keyboardType="email-address"
                />
                <View style={styles.formButton}>
                  <Button
                    color="#3740FE"
                    title={t('form.button')}
                    disabled={!isValid}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.littleText}>{t('register')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ForgotScreen')}>
            <Text style={styles.littleText}>{t('forgot')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  formContainer: {
    borderWidth: 1,
    width: 250,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
  },
  formErrorText: {
    fontSize: 14,
  },
  formButton: {
    marginTop: 20,
  },
  littleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
