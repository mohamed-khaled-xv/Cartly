import React, {useMemo} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View,Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Categories from '../../components/screens/home/Categories';
import Hero from '../../components/screens/home/Hero';
import Products from '../../components/screens/home/Products';
import SearchBar from '../../components/shared/SearchBar';
import {useGetProductsQuery} from '../../services/home/home-api';
import { Colors } from '@styles/theme';



const Home = () => {
  const {data, error, isLoading} = useGetProductsQuery();

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <SearchBar />
        <Hero />
        <Categories />
      </View>
    ),
    [],
  );
  if (isLoading) {
    return (
      <SafeAreaView style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={header}
        data={data?.products}
        numColumns={2}
        renderItem={({item}) => <Products {...item} />}
        columnWrapperStyle={styles.column}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,

  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  ProductsHeader: {
    marginTop: 10
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home;
