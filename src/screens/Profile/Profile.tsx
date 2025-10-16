import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from './../../Context/UserContext';

const Profile = () => {
  const auth = useAuth();

  const HandleLogout = () => {
    if (auth) {
      auth.deleteUser();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 {auth?.user?.fullName}</Text>
      <Text style={styles.email}>{auth?.user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={HandleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
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
