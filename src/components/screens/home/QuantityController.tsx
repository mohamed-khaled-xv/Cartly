import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import {Colors} from '@styles/theme';
import {IncreaseIcon, DecreaseIcon} from '@assets/index';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '@/services/home/models/cart-types';
import {removeFromCartById, updateQuantityById} from '@/infrastructure/redux/slices/cartSlice';
import { UseSelector } from 'react-redux';
import { RootState } from '@infrastructure/redux/store';

const QuantityController = (Props: {ProductItem: Product}) => {

  const quantity = useSelector((state: RootState) => state.cart.Products.find(item => item.id === Props.ProductItem.id)?.quantity || 1);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantityById({id: Props.ProductItem.id, quantity: quantity + 1}));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(updateQuantityById({id: Props.ProductItem.id, quantity: quantity - 1}));
    } else {
      dispatch(removeFromCartById(Props.ProductItem.id));
    }
  };

  return (
    <View style={styles.ButtonContainer}>
      <View style={styles.ButtonContent}>
        <TouchableOpacity onPress={handleDecrease}>
          <DecreaseIcon height={16} width={16} />
        </TouchableOpacity>
        <Text style={styles.QuantityText}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrease}>
          <IncreaseIcon height={18} width={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    justifyContent: 'space-between',
  },
  QuantityText: {
    fontSize: 16,
    color: Colors.textLight,
    marginHorizontal: 20,
  },
});

export default QuantityController;
