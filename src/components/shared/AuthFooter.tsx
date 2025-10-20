import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthStackNavigationProp} from '../../navigation/types/authTypes';
import {Colors} from '../../styles/theme';
import {FontFamily} from '../../styles/typography';

type Props = {
  footerText: string;
  linkText: string;
  navigationTarget:
    | 'WelcomeScreen'
    | 'LoginScreen'
    | 'SignupScreen'
    | 'ForgotPasswordScreen';
};
const Footer = ({footerText, linkText, navigationTarget}: Props) => {
  const navigation = useNavigation<AuthStackNavigationProp<'WelcomeScreen'>>();

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>{footerText} </Text>
      <TouchableOpacity onPress={() => navigation.navigate(navigationTarget)}>
        <Text style={styles.loginLink}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Login section
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: Colors.text,
  },
});

export default Footer;
