import React from 'react';
import {ImageBackground, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {FontFamily} from '../../styles/typography';

type Props = {
    imageSource?: ImageSourcePropType;
    containerStyle?: object;
    imageStyle?: object;
};

const Hero = (props: Props) => {
  return (
    <View style={[styles.heroSection, props.containerStyle]}>
      <ImageBackground
        source={props.imageSource}
        style={styles.heroImage}
        imageStyle={[styles.heroImageStyle, props.imageStyle]}
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
    top: '5%',
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
