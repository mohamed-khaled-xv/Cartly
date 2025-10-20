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
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
