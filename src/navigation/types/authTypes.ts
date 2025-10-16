// Auth Stack Types
export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  WelcomeScreen: undefined;
  MainTabs: undefined;
};

// Auth Stack Navigation Props
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

export type AuthStackNavigationProp<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type AuthStackRouteProp<T extends keyof AuthStackParamList> = RouteProp<
  AuthStackParamList,
  T
>;
