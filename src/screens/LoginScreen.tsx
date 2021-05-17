import {StackScreenProps} from '@react-navigation/stack';
import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useEffect} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Logo from '../components/Logo';
import {useTheme} from '@react-navigation/native';
import {useLoginMutation} from '../generated/graphql';
import {useTranslation} from 'react-i18next';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const {colors, secondaryColor, tertiaryColor, formError} = useTheme();
  const [loginMutation, {data, loading, error}] = useLoginMutation(); //TODO backend change status to false when password in incorrec
  const {t} = useTranslation('login');
  useEffect(() => {
    if (data?.login?.status && data.login.token !== null) {
      navigation.navigate('UsersScreen');
    }
  }, [data]);

  if (loading) return <Text>Loading ...</Text>;

  const initialValues = {
    email: '',
    password: '',
  };
  return (
    <Text>
      {/* <Background /> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
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
              } catch (error) {}
            }}
            validationSchema={yup.object().shape({
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
                <TextInput
                  value={values.email}
                  style={styles.inputStyle}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholder={t('form.email.placeholder')}
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
                  <Text style={{fontSize: 12, color: formError}}>
                    {errors.password}
                  </Text>
                )}
                <Button
                  color="#3740FE"
                  title="Login"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text>Don't have an account. Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Text>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  formContainer: {},
  inputStyle: {},
});
