import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types/mainTabsTypes';
import Profile from '../screens/Profile/Profile';
import Home from '../screens/Home/Home';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={Profile} />
      <ProfileStack.Screen name="HomeScreen" component={Home} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
