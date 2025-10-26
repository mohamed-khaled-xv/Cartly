// MainTabs.tsx
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import type {RouteProp} from '@react-navigation/native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MainTabParamList} from './types/mainTabsTypes';

import CartStackNavigator from './CartStack';
import CategoriesStackNavigator from './CategoriesStack';
import HomeStackNavigator from './HomeStack';
import ProfileStackNavigator from './ProfileStack';

type TabKey = keyof MainTabParamList;
const Tab = createBottomTabNavigator<MainTabParamList>();

const TABS = [
  {
    name: 'HomeTab',
    label: 'Home',
    component: HomeStackNavigator,
    icons: {active: 'home', inactive: 'home-outline'},
  },
  {
    name: 'CategoriesTab',
    label: 'Categories',
    component: CategoriesStackNavigator,
    icons: {active: 'grid', inactive: 'grid-outline'},
  },
  {
    name: 'CartTab',
    label: 'Cart',
    component: CartStackNavigator,
    icons: {active: 'cart', inactive: 'cart-outline'},
  },
  {
    name: 'ProfileTab',
    label: 'Profile',
    component: ProfileStackNavigator,
    icons: {active: 'person', inactive: 'person-outline'},
  },
] as const satisfies ReadonlyArray<{
  name: TabKey;
  label: string;
  component: React.ComponentType<any>;
  icons: {active: string; inactive: string};
}>;

// Build stable icon renderers (no functions created during render)
const tabIconRenderers: Record<
  TabKey,
  NonNullable<BottomTabNavigationOptions['tabBarIcon']>
> = TABS.reduce((acc, t) => {
  acc[t.name] = ({color, size, focused}) => (
    <Ionicons
      name={focused ? t.icons.active : t.icons.inactive}
      size={size}
      color={color}
    />
  );
  return acc;
}, {} as Record<TabKey, NonNullable<BottomTabNavigationOptions['tabBarIcon']>>);

const COMMON_OPTIONS: BottomTabNavigationOptions = {
  tabBarActiveTintColor: '#6CC51D',
  tabBarInactiveTintColor: '#8E8E93',
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
  tabBarLabelStyle: {fontSize: 12, fontWeight: '600', marginTop: -2},
  headerShown: false,
};

// Stable screenOptions defined OUTSIDE the component
const screenOptions = ({
  route,
}: {
  route: RouteProp<MainTabParamList, TabKey>;
}): BottomTabNavigationOptions => ({
  ...COMMON_OPTIONS,
  tabBarIcon: tabIconRenderers[route.name],
});

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName={'HomeTab'}>
      {TABS.map(({name, label, component: Comp}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={Comp}
          options={{tabBarLabel: label}}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainTabs;
