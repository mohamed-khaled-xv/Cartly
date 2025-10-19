import {addToCart} from '@/infrastructure/redux/slices/cartSlice';
import {Product} from '@/services/home/models/cart-types';
import {CartIcon} from '@assets/index';
import {Colors} from '@styles/theme';
import {FontFamily} from '@styles/typography';
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';

const AddToCartButton = React.memo((Props: {ProductItem: Product}) => {
  const dispatch = useDispatch();

  const handleCartPress = useCallback(() => {
    dispatch(addToCart(Props.ProductItem));
  }, [dispatch, Props.ProductItem]);

  return (
    <TouchableOpacity style={styles.ButtonContainer} onPress={handleCartPress}>
      <View style={styles.ButtonContent}>
        <Image source={CartIcon} />
        <Text style={styles.ButtonText}>Add to Cart</Text>
      </View>
    </TouchableOpacity>
  );
});

AddToCartButton.displayName = 'AddToCartButton';

const styles = StyleSheet.create({
  ButtonContainer: {
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: 0,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: Colors.border,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  ButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  ButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
  },
});

export default AddToCartButton;
