import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {FontFamily} from '../../../styles/typography';
import {Images} from '@/assets'

const Hero = () => {
  return (
    <View style={styles.heroSection}>
      <ImageBackground
        source={Images.Welcome1}
        style={styles.heroImage}
        imageStyle={styles.heroImageStyle}
      />

      {/* Welcome Text Overlay */}
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitle}>Welcome</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    flex: 0.6,
  },
  heroImage: {
    flex: 1,
    width: '100%',
  },
  heroImageStyle: {
    resizeMode: 'cover',
    top: -60,
    height: '140%',
    width: '100%',
  },
  heroTextContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: '#FFFFFF',
    textShadowRadius: 3,
  },
});
export default Hero;
