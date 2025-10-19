import {Product} from '@/services/home/models/cart-types';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './../../../infrastructure/redux/store';
import AddToCartButton from './AddToCartButton';
import QuantityController from './QuantityController';

const CartController = React.memo((Props: {ProductItem: Product}) => {
  const cartItems = useSelector((state: RootState) => state.cart.Products);

  // Memoize the check so it only recalculates when cartItems or ProductItem changes
  const isAddedToCart = useMemo(
    () =>
      cartItems.some((item: {id: number}) => item.id === Props.ProductItem.id),
    [cartItems, Props.ProductItem.id],
  );

  return (
    <>
      {isAddedToCart ? (
        <QuantityController ProductItem={Props.ProductItem} />
      ) : (
        <AddToCartButton ProductItem={Props.ProductItem} />
      )}
    </>
  );
});

CartController.displayName = 'CartController';

export default CartController;
