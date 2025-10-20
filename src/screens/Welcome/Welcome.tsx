import {Welcome1} from '@assets/index';
import Buttons from '@components/screens/welcome/Buttons';
import AuthFooter from '@components/shared/AuthFooter';
import AuthHero from '@components/shared/AuthHero';
import Subhero from '@components/shared/AuthSubhero';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors} from '../../styles/theme';

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthHero imageSource={Welcome1} containerStyle={{flex: 0.6}} />
      <View style={styles.contentSection}>
        <Subhero
          welcomeTitle="Welcome"
          welcomeSubtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <Buttons />
        <AuthFooter
          footerText="Already have an account?"
          linkText="Sign In"
          navigationTarget="LoginScreen"
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

export default Welcome;
