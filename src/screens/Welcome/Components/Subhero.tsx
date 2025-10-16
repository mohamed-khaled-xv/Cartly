import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../styles/theme';
import {FontFamily} from '../../../styles/typography';

const Subhero = () => {
  return (
    <View style={styles.welcomeContent}>
      <Text style={styles.welcomeTitle}>Welcome</Text>
      <Text style={styles.welcomeSubtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContent: {
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default Subhero;

