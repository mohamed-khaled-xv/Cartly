import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesStackParamList } from './types/mainTabsTypes';
import Categories from '../screens/Categories/Categories';
import Profile from '../screens/Profile/Profile';

const CategoriesStack = createNativeStackNavigator<CategoriesStackParamList>();

// Categories Stack Navigator
const CategoriesStackNavigator = () => {
  return (
    <CategoriesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CategoriesStack.Screen
        name="CategoriesScreen"
        component={Categories}
        options={{ title: 'Categories' }}
      />
      <CategoriesStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ title: 'Profile' }}
      />
    </CategoriesStack.Navigator>
  );
};

export default CategoriesStackNavigator;
