// Root Navigator Types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

// Combined types for global navigation
import type { MainTabParamList } from './mainTabsTypes';

// Declare global types for React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainTabParamList {}
  }
}

// Export all types from sub-modules
export * from './authTypes';
export * from './mainTabsTypes';

// Root Navigation Props
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootStackRouteProp<T extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, T>;
