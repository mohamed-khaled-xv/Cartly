import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../styles/theme';
import {FontFamily} from '../../styles/typography';

type ButtonType = {
  Label: string;
  IncomingOnPress: () => void;
  Icon: ImageSourcePropType;
  IconStyle?: object;
  ContainerStyle?: object;
  LabelStyle?: object;
};


const CustomButton = ({
  Icon,
  IconStyle,
  IncomingOnPress,
  Label,
  LabelStyle,
  ContainerStyle,
}: ButtonType) => {
  return (
    <TouchableOpacity style={[styles.Container, ContainerStyle]} onPress={IncomingOnPress}>
      <View style={styles.ButtonContent}>
        <Image style={IconStyle} source={Icon} />
        <Text style={[styles.label, LabelStyle]}>{Label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.text,
    alignSelf: 'center',
    marginLeft: '15%',
  },
});

export default CustomButton;
