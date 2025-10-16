import {View, Text} from 'react-native';
import AddToCartButton from './AddToCartButton';
import QuantityController from './QuantityController';
import {useState} from 'react';
import {useSelector, UseSelector} from 'react-redux';
import {RootState} from './../../../infrastructure/redux/store';
import {Product} from '@/services/home/models/cart-types';


const CartController = (Props: {ProductItem: Product }) => {
  const cartItems = useSelector((state: RootState) => state.cart.Products);
  const isAddedToCart = cartItems.some((item: {id: number}) => item.id === Props.ProductItem.id);

  return (
    <>
      {isAddedToCart ? (
        <QuantityController ProductItem={Props.ProductItem} />
      ) : (
        <AddToCartButton ProductItem={Props.ProductItem} />
      )}
    </>
  );
};

export default CartController;
