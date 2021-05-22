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
  const [loginMutation, {data, loading, error}] = useLoginMutation();
  // const {t} = useTranslation('login');
  // useEffect(() => {
  //   if (data?.login?.status && data.login.token !== null) {
  //     navigation.navigate('UsersScreen');
  //   }
  // }, [data]);

  // if (loading) return <Text>Loading ...</Text>;

  const initialValues = {
    email: '',
  };
  return (
    <>
      {/* <Background /> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.screenContainer}>
          <Logo />
          {!data?.login?.status && <Text>{data?.login?.message}</Text>}
          <Text>Forgot Password</Text>
          {/* <Text>{t('title')}</Text> */}
          <Formik
            initialValues={initialValues}
            onSubmit={async values => {
              try {
                console.log(values);

                // await loginMutation({
                //   variables: {email: values.email},
                // });
                Keyboard.dismiss();
              } catch (error) {}
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email().required(),
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
                  placeholder="email" //{t('form.email.placeholder')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={{fontSize: 12, color: tertiaryColor}}>
                    {errors.email}
                  </Text>
                )}

                <Button
                  color="#3740FE"
                  title="Reset Password"
                  disabled={!isValid}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.littleText}>Back to login</Text>
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
