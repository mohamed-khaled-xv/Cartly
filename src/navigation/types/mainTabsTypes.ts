// Main Tabs Types
export type MainTabParamList = {
  HomeTab: undefined;
  CategoriesTab: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};

// Individual Stack Types for each tab
export type HomeStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  ProductDetailScreen: {productId: string};
  SearchScreen: {query?: string};
};

export type CategoriesStackParamList = {
  CategoriesScreen: undefined;
  ProfileScreen: undefined;

  CategoryProductsScreen: {categoryId: string; categoryName: string};
  ProductDetailScreen: {productId: string};
};

export type CartStackParamList = {
  CartScreen: undefined;
  CheckoutScreen: undefined;
  OrderConfirmationScreen: {orderId: string};
  PaymentMethodsScreen: undefined;
  ProfileScreen: undefined;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  HomeScreen: undefined;
  SettingsScreen: undefined;
  EditProfileScreen: undefined;
  OrderHistoryScreen: undefined;
  AddressesScreen: undefined;
  PaymentMethodsScreen: undefined;
  HelpCenterScreen: undefined;
};

// Main Tabs Navigation Props
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

export type MainTabNavigationProp<T extends keyof MainTabParamList> =
  BottomTabNavigationProp<MainTabParamList, T>;

// Individual Stack Navigation Props
export type HomeStackNavigationProp<T extends keyof HomeStackParamList> =
  NativeStackNavigationProp<HomeStackParamList, T>;

export type CategoriesStackNavigationProp<
  T extends keyof CategoriesStackParamList,
> = NativeStackNavigationProp<CategoriesStackParamList, T>;

export type CartStackNavigationProp<T extends keyof CartStackParamList> =
  NativeStackNavigationProp<CartStackParamList, T>;

export type ProfileStackNavigationProp<T extends keyof ProfileStackParamList> =
  NativeStackNavigationProp<ProfileStackParamList, T>;

// Route Props
export type HomeStackRouteProp<T extends keyof HomeStackParamList> = RouteProp<
  HomeStackParamList,
  T
>;

export type CategoriesStackRouteProp<T extends keyof CategoriesStackParamList> =
  RouteProp<CategoriesStackParamList, T>;

export type CartStackRouteProp<T extends keyof CartStackParamList> = RouteProp<
  CartStackParamList,
  T
>;

export type ProfileStackRouteProp<T extends keyof ProfileStackParamList> =
  RouteProp<ProfileStackParamList, T>;
