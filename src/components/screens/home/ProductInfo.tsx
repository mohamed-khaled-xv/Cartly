import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '@components/shared/CustomText'
import { Colors } from '@styles/theme';
import { FontFamily } from '@styles/typography';
import {FruitItem} from '@/types/fruit';

const ProductInfo = ({ price, name, weight }: Partial<FruitItem>) => {
  return (
    <View style={styles.infoContainer}>
      <CustomText style={styles.price}>${price}</CustomText>
      <CustomText style={styles.name}>{name}</CustomText>
      <CustomText style={styles.weight}>{weight} lbs</CustomText>
    </View>
  );
};


const styles = StyleSheet.create({
    infoContainer: {
        alignItems: 'center', marginTop: 8, marginBottom: 4},
      name: {
        fontSize: 15,
        fontFamily: FontFamily.semiBold,
        color: '#333',
        textAlign: 'center'
      },
      price: {
        fontSize: 12,
        color: Colors.success,
        fontFamily: FontFamily.medium,
      },
        weight: {
          fontSize: 12,
          color: Colors.textLight,
          marginBottom: 8,
        },
});
export default ProductInfo;
