import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface CustomTextInputProps {
  InputText: string;
  style?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ InputText, style }) => {
  return (
    <TextInput
      style={style}
      placeholder={InputText}
    />
  );
};

export default CustomTextInput
