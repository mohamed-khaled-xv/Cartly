import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AuthUser,
  logout,
  subscribeToAuthStateChanges,
} from '../../services/firebase/auth';

const Profile = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes to get current user
    const unsubscribe = subscribeToAuthStateChanges(
      (authUser: AuthUser | null) => {
        setUser(authUser);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'Logout',
        onPress: async () => {
          setLoading(true);
          try {
            await logout();
            // Navigation will happen automatically when auth state updates
          } catch (error: any) {
            Alert.alert('Logout Error', 'Failed to logout. Please try again.');
            console.error('Logout error:', error);
          } finally {
            setLoading(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 {user?.displayName || 'User'}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogout}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Log Out</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6CC51D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Profile;
