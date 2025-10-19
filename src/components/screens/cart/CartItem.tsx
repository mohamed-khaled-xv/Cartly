import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import type {CartItem as CartItemType} from './../../../infrastructure/redux/slices/cartSlice';
import {
  removeFromCartById,
  updateQuantityById,
} from './../../../infrastructure/redux/slices/cartSlice';

const CartItem = React.memo((item: CartItemType) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantityById({id: item.id, quantity: newQuantity}));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantityById({id: item.id, quantity: newQuantity}));
    } else {
      dispatch(removeFromCartById(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCartById(item.id));
  };

  return (
    <View style={styles.cartItem}>
      <Image source={{uri: item.thumbnail}} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productPrice}>
          ${item.price.toFixed(2)} x {item.quantity || 1}
        </Text>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productWeight}>{item.id}g</Text>
        <Text style={styles.productWeight}>{item.weight}g</Text>
      </View>

      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecrease}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleIncrease}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
        <View style={styles.removeButtonBackground}>
          <Text style={styles.removeButtonText}>🗑</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

CartItem.displayName = 'CartItem';

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6CC51D',
    marginBottom: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  productWeight: {
    fontSize: 12,
    color: '#999',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  },
  removeButtonBackground: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CartItem;
