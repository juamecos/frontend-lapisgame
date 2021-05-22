import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';

interface CustomInputProps {
  style?: StyleProp<TextStyle>;
  placeholder?: string | undefined;
  autoCapitalize?: AutocapitalizeEnum;
  keyBoardType?: KeyboardTypeOptions | undefined;
  field: {
    name: string;
    onBlur: (text: string) => void | undefined;
    onChange: (text: string) => (name: string) => void | undefined;
    value: string | undefined;
  };
  form: {
    errors: any; // Set as any to suport i18n
    touched: any;
    setFieldTouched: (name: string) => void;
  };
}

type AutocapitalizeEnum =
  | 'none'
  | 'sentences'
  | 'words'
  | 'characters'
  | undefined;

const CustomInput = (props: CustomInputProps) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
