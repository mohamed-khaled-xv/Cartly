import {FontFamily} from '@styles/typography';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

const InputText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamily.medium,
    fontSize: 9,
  },
});

export default InputText;
