import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../styles/theme';
import {FontFamily} from '../../styles/typography';

type Props = {
  welcomeTitle?: string;
  welcomeSubtitle?: string;
};

const Subhero = (props: Props) => {
  return (
    <View style={styles.welcomeContent}>
      <Text style={styles.welcomeTitle}>{props.welcomeTitle}</Text>
      <Text style={styles.welcomeSubtitle}>{props.welcomeSubtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContent: {
    alignItems: 'flex-start',
    gap: 2,
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default Subhero;
