import {Welcome2} from '@assets/index';
import AuthFooter from '@components/shared/AuthFooter';
import AuthHero from '@components/shared/AuthHero';
import AuthSubHero from '@components/shared/AuthSubhero';
import LoginAuthForm from '@components/shared/LoginAuthForm';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '@styles/theme';
import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackNavigationProp} from '../../navigation/types/authTypes';
import {signIn} from '../../services/firebase/auth';

const Login = () => {
  const navigation = useNavigation<AuthStackNavigationProp<'LoginScreen'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please enter email and password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await signIn(email.trim(), password);
      // Navigation will happen automatically when auth state updates
    } catch (error: any) {
      let errorMessage = 'Login failed';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHero
        imageSource={Welcome2}
        containerStyle={{flex: 0.6}}
        imageStyle={{top: -60}}
      />
      <View style={styles.contentSection}>
        <AuthSubHero
          welcomeTitle="Welcome Back !"
          welcomeSubtitle="Sign in to your account."
        />
        <LoginAuthForm onSubmit={handleLogin} loading={loading} />
        <AuthFooter
          footerText="Don't have an account?"
          linkText="Sign Up"
          navigationTarget="SignupScreen"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // Content Section
  contentSection: {
    flex: 0.4,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
});

export default Login;
