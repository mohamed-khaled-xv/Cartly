import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from '../../styles/theme';
import Buttons from '@components/screens/welcome/Buttons';
import Subhero from '@components/screens/welcome/Subhero';
import Hero from '@components/screens/welcome/Hero';
import Footer from '@components/screens/welcome/Footer';

const Welcome = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Hero />
      <View style={styles.contentSection}>
        <Subhero />
        <Buttons />
        <Footer />
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
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },


});

export default Welcome;
