// Hero.tsx

/*****************************/
//Study the pattern of image slider with dots indicator
/*****************************/

import HeroBackgroundImage from '@assets/images/home-hero-background.png';
import {Colors} from '@styles/theme';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';

const Hero = () => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const images: ImageSourcePropType[] = [
    HeroBackgroundImage,
    HeroBackgroundImage,
    HeroBackgroundImage,
    HeroBackgroundImage,
    HeroBackgroundImage,
  ];

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      console.log(viewableItems);
      const i = viewableItems[0]?.index;
      if (i != null) setIndex(i);
    },
  ).current;
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 51,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        renderItem={({item}) => (
          <Image
            source={item}
            style={[styles.imageBackground, {width}]}
            resizeMode="cover"
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, i) => ({length: width, offset: width * i, index: i})}
        initialNumToRender={1}
        windowSize={3}
        removeClippedSubviews
      />

      <View style={styles.dots}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 10, marginBottom: 20},
  imageBackground: {
    height: 283,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    gap: 6,
  },
  dot: {width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.surface},
  dotActive: {backgroundColor: '#6CC51D', width: 16, borderRadius: 3},
});

export default Hero;
