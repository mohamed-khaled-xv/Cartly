import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '../../navigation/types/authTypes';

const Login = () => {
  const navigation = useNavigation<AuthStackNavigationProp<'LoginScreen'>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.secondaryButtonText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#6CC51D',
    minWidth: 250,
  },
  secondaryButtonText: {
    color: '#6CC51D',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Login;
