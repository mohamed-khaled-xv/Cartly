import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '../../../navigation/types/authTypes';
import {Colors} from '../../../styles/theme';
import {FontFamily} from '../../../styles/typography';


const Footer = () => {
    const navigation = useNavigation<AuthStackNavigationProp<'WelcomeScreen'>>();
    
    return (
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.loginLink}>Login</Text>
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
  }
});

export default Footer;
