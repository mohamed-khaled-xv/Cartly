import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Categories</Text>
      <Text style={styles.subtitle}>Browse grocery categories</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default Categories;
