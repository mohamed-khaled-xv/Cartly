import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {AuthUser, subscribeToAuthStateChanges} from '../services/firebase/auth';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

const RootNavigator = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = subscribeToAuthStateChanges(
      (authUser: AuthUser | null) => {
        setUser(authUser);
        setLoading(false);
      },
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#6CC51D" />
      </View>
    );
  }

  const isAuthenticated = !!user;

  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
};

export default RootNavigator;
