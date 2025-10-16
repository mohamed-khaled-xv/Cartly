import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthStackParamList} from './types/authTypes';

// Import screens
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import Welcome from '../screens/Welcome/Welcome';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
      initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={Welcome}
        options={{
          gestureEnabled: false, // Disable back gesture on welcome
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{
          title: 'Sign In',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333333',
          },
          headerTintColor: '#6CC51D',
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={Signup}
        options={{
          title: 'Create Account',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333333',
          },
          headerTintColor: '#6CC51D',
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPassword}
        options={{
          title: 'Reset Password',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333333',
          },
          headerTintColor: '#6CC51D',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
