import CustomImage from '@components/shared/CustomImage';
import {Colors} from '@styles/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  isFavorite: boolean;
  handleFavoriteToggle: () => void;
  image: string[] | number | string;
};

const ProductHero = React.memo(
  ({isFavorite, handleFavoriteToggle, image}: props) => {
    return (
      <>
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={handleFavoriteToggle}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? Colors.warning : Colors.textLight}
          />
        </TouchableOpacity>

        <View style={[styles.ImageContainer]}>
          <CustomImage
            source={image}
            style={styles.Image}
            resizeMode="contain"
          />
        </View>
      </>
    );
  },
);

ProductHero.displayName = 'ProductHero';

const styles = StyleSheet.create({
  ImageContainer: {
    height: 84,
    width: 84,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
    marginTop: 30,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
export default ProductHero;
