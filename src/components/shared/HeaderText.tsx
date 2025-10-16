import {FontFamily} from '@styles/typography';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from './CustomText';

const HeaderText = ({
  InputText,
  style,
  ContainerStyle,
}: {
  InputText: string;
  style?: object;
  ContainerStyle?: object;
}) => {
  return (
    <View>
      <CustomText style={styles.headerText}>{InputText}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
  },
});
export default HeaderText;
