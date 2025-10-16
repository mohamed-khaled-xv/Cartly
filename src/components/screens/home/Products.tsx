import {Product} from '@api/home/models/cart-types';
import {ImagePlaceholder} from '@assets/index';
import {Colors} from '@styles/theme';
import {FontFamily} from '@styles/typography';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AddToCartButton from './AddToCartButton';
import ProductHero from './ProductHero';
import ProductInfo from './ProductInfo';
import CartController from './CartController';

// Destructure props for clarity
const Products = (ProductItem: Product) => {
  const handleFavoriteToggle = () => {
    console.log('Toggle favorite for', ProductItem.title);
  };

  const isFavorite = false; // This would typically come from state or props
  return (
    <View style={styles.card}>
      <ProductHero
        isFavorite={isFavorite}
        handleFavoriteToggle={handleFavoriteToggle}
        image={ProductItem.images?.[0] || ImagePlaceholder}
      />
      <ProductInfo price={ProductItem.price} name={ProductItem.title} weight={ProductItem.weight} />
      <CartController
        ProductItem={ProductItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
    paddingTop: 25,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: '#333',
  },
  price: {
    fontSize: 12,
    color: Colors.success,
    fontFamily: FontFamily.medium,
  },
  ImageContainer: {
    // width: '70%',
    // height: 100,
    // marginVertical: 24,
    // alignItems: 'center',

    height: 84,
    width: 84,
    backgroundColor: 'red',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: 91,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 8,
    marginTop: 30,
  },
  weight: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 8,
  },
  nutritionRow: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  nutritionItem: {
    fontSize: 13,
    color: '#4B5563',
  },
  viewIcon: {
    borderWidth: 1,
    borderRadius: 9999,
    padding: 12,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export default Products;
