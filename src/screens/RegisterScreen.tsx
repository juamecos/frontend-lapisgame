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
} from 'react-native';

import {Formik} from 'formik';
import * as yup from 'yup';
import {Link, useTheme} from '@react-navigation/native';
// import Background from '../components/Background';
import Logo from '../components/Logo';

import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAddUserMutation} from '../generated/graphql';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTranslation} from 'react-i18next';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
  const {colors, secondaryColor, tertiaryColor, formError} = useTheme();
  const [addUserMutation, {data, loading, error}] = useAddUserMutation();
  const {t} = useTranslation('register');

  const initialValues = {
    userName: '',
    email: '',
    password: '',
  };

  if (loading) {
    return <Text>Loading ... </Text>;
  }

  return (
    <>
      {/* <Background /> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.screenContainer}>
          <Text>{t('title')}</Text>

          {!data?.register?.status && <Text>{data?.register?.message}</Text>}
          <Formik
            initialValues={initialValues}
            onSubmit={async values => {
              try {
                await addUserMutation({variables: {user: values}});
                Keyboard.dismiss();
                navigation.navigate('LoginScreen');
              } catch (error) {}
            }}
            validationSchema={yup.object().shape({
              userName: yup.string().required('Please, provide a username!'),
              email: yup.string().email().required(),
              password: yup
                .string()
                .min(4)
                .max(10, 'Password should not excced 10 chars.')
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
            }) => (
              <View style={styles.formContainer}>
                <Logo />
                <TextInput
                  value={values.userName}
                  style={styles.inputStyle}
                  onChangeText={handleChange('userName')}
                  onBlur={() => setFieldTouched('userName')}
                  autoCapitalize="none"
                  placeholder={t('form.userName.placeholder')}
                />
                {touched.userName && errors.userName && (
                  <Text style={{fontSize: 12, color: tertiaryColor}}>
                    {errors.userName}
                  </Text>
                )}
                <TextInput
                  value={values.email}
                  style={styles.inputStyle}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholder="E-mail"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={{fontSize: 12, color: tertiaryColor}}>
                    {errors.email}
                  </Text>
                )}
                <TextInput
                  value={values.password}
                  style={styles.inputStyle}
                  onChangeText={handleChange('password')}
                  placeholder="Password"
                  onBlur={() => setFieldTouched('password')}
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={styles.formErrorText}>{errors.password}</Text>
                )}
                <Button
                  style={{...styles.formButton}}
                  color={colors.primary}
                  title="Submit"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
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
