import React, {useCallback, useMemo} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors} from '@styles/theme';
import Categories from '../../components/screens/home/Categories';
import Hero from '../../components/screens/home/Hero';
import Products from '../../components/screens/home/Products';
import SearchBar from '../../components/shared/SearchBar';
import type {Product} from '../../services/home/models/cart-types'
import {useGetProductsInfiniteQuery} from '../../services/home/home-api';

const Home = () => {
  const limit = 20;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetProductsInfiniteQuery({limit});

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

  // Flatten all products from all pages
  const products = useMemo(
    () => data?.pages.flatMap(page => page.products) ?? [],
    [data],
  );

  // Memoize the renderItem to prevent re-creating function on every render
  const renderItem = useCallback(
    ({item}: {item: Product}) => <Products {...item} />,
    [],
  );

  // Memoize the onEndReached handler
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        data={products}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={styles.column}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : null
        }
        ListFooterComponentStyle={{marginVertical: 16}}
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
    marginTop: 10,
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
