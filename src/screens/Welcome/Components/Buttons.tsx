import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../../../components/shared/CustomButton';
import {AuthStackNavigationProp} from '../../../navigation/types/authTypes';
import {Icons} from '@/assets';

const Buttons = () => {
  const navigation = useNavigation<AuthStackNavigationProp<'WelcomeScreen'>>();

  return (
    <View style={styles.buttonContainer}>
      <CustomButton
        Icon={Icons.Google}
        IconStyle={styles.googleIcon}
        IncomingOnPress={() => {
          navigation.navigate('LoginScreen');
        }}
        Label="Continue with Google"
      />

      <CustomButton
        Icon={Icons.Profile}
        IconStyle={styles.createAccountIcon}
        IncomingOnPress={() => {
          navigation.navigate('SignupScreen');
        }}
        Label="Create an account"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Buttons
  buttonContainer: {
    gap: 12,
    marginBottom: 20,
  },
  googleIcon: {
    marginLeft: '5%',
    width: 18,
    height: 18,
  },
  createAccountIcon: {
    marginLeft: '5%',
    width: 20,
    height: 20,
  },
});

export default Buttons;
