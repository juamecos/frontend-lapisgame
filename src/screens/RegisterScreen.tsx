/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Keyboard,
  View,
  ActivityIndicator,
} from 'react-native';

import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {Link, useTheme} from '@react-navigation/native';
// import Background from '../components/Background';
import Logo from '../components/Logo';

import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAddUserMutation} from '../generated/graphql';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTranslation} from 'react-i18next';
import CustomInput from '../components/forms/CustomInput';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
  const {colors, secondaryColor, tertiaryColor, formError} = useTheme();
  const [addUserMutation, {data, loading, error}] = useAddUserMutation();
  const {t} = useTranslation('register');

  const initialValues = {
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  if (loading) {
    return (
      <View style={styles.screenContainer}>
        <ActivityIndicator color={colors.primary} size={50} />
        <Text>Loading ... </Text>
      </View>
    );
  }

  return (
    <>
      {/* <Background /> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.screenContainer}>
          <Logo />

          <Text>{t('title')}</Text>

          {!data?.register?.status && <Text>{data?.register?.message}</Text>}

          <Formik
            initialValues={initialValues}
            onSubmit={async ({userName, email, password}) => {
              try {
                await addUserMutation({
                  variables: {
                    user: {
                      userName,
                      email,
                      password,
                    },
                  },
                });
                Keyboard.dismiss();
                navigation.navigate('LoginScreen');
              } catch (err) {
                console.log(err);
              }
            }}
            validationSchema={yup.object().shape({
              userName: yup.string().required('Please, provide a username!'),
              email: yup.string().email().required(),
              password: yup
                .string()
                .min(4)
                .max(10, 'Password should not excced 10 chars.')
                .required(),
              confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required(),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              isSubmitting,
            }) => (
              <View style={styles.formContainer}>
                <Field
                  component={CustomInput}
                  name="userName"
                  placeholder="Username"
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />
                <View style={styles.formButton}>
                  <Button
                    color={secondaryColor}
                    title="Submit"
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.littleText}>Have an account. Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('LanguajetestScreen')}>
            <Text style={styles.littleText}>Languaje Screen</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;

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
