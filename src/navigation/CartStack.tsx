import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../screens/Profile/Profile';
import Cart from '../screens/Cart/Cart';
import {CartStackParamList} from './types';

const CartStack = createNativeStackNavigator<CartStackParamList>();

// Cart Stack Navigator
const CartStackNavigator = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CartStack.Screen name="CartScreen" component={Cart} />
      <CartStack.Screen name="ProfileScreen" component={Profile} />
    </CartStack.Navigator>
  );
};

export default CartStackNavigator;
