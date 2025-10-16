import {
  ArrowRightIcon,
  Beverages,
  EdibleOil,
  Fruits,
  Grocery,
  Household,
  Vegetables,
} from '@assets/index';
import CustomImage from '@components/shared/CustomImage';
import CustomText from '@components/shared/CustomText';
import HeaderText from '@components/shared/HeaderText';
import {Colors} from '@styles/theme';
import {FontFamily} from '@styles/typography';
import React from 'react';
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const CategoriesData = [
  {
    id: '1',
    name: 'Vegetables',
    backgroundColor: '#E6F2EA',
    icon: Vegetables,
  },
  {id: '2', name: 'Fruits', backgroundColor: '#FFE9E5', icon: Fruits},
  {
    id: '3',
    name: 'Beverages',
    backgroundColor: '#FFF6E3',
    icon: Beverages,
  },
  {id: '4', name: 'Grocery', backgroundColor: '#F3EFFA', icon: Grocery},
  {
    id: '5',
    name: 'Edible Oil',
    backgroundColor: '#DCF4F5',
    icon: EdibleOil,
  },
  {
    id: '6',
    name: 'Household',
    backgroundColor: '#E6F2EA',
    icon: Household,
  },
];

type IconSource = string | ImageSourcePropType;

type CategoryItemType = {
  id: string;
  name: string;
  backgroundColor: string;
  icon: IconSource;
};

const Categories = () => {
  const CategoryItem = ({item}: {item: CategoryItemType}) => (
    <TouchableOpacity style={[styles.itemContainer]}>
      <View
        style={[
          styles.viewIcon,
          {
            backgroundColor: item.backgroundColor,
            borderColor: item.backgroundColor,
          },
        ]}>
        <CustomImage
          source={item.icon}
          style={styles.itemIcon}
          resizeMode="contain"
        />
      </View>
      <CustomText style={styles.itemText}>{item.name}</CustomText>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <HeaderText InputText="Categories" />
        <ArrowRightIcon height={18} width={10} />
      </View>
      <FlatList
        data={CategoriesData}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={CategoryItem}
        contentContainerStyle={{gap: 20}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 20,
    flexDirection: 'column',
    backgroundColor: Colors.surface,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
  },
  itemContainer: {
    alignItems: 'center',
    gap: 6,
  },
  viewIcon: {
    borderWidth: 1,
    borderRadius: 9999,
    padding: 12,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  itemText: {
    color: Colors.text,
    textAlign: 'center',
  },
});

export default Categories;
