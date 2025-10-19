import {FruitItem} from '@/types/fruit';
import CustomText from '@components/shared/CustomText';
import {Colors} from '@styles/theme';
import {FontFamily} from '@styles/typography';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const ProductInfo = React.memo(({price, name, weight}: Partial<FruitItem>) => {
  return (
    <View style={styles.infoContainer}>
      <CustomText style={styles.price}>${price}</CustomText>
      <CustomText style={styles.name}>{name}</CustomText>
      <CustomText style={styles.weight}>{weight} lbs</CustomText>
    </View>
  );
});

ProductInfo.displayName = 'ProductInfo';

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: '#333',
    textAlign: 'center',
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
