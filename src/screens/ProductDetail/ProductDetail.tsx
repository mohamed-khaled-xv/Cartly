import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HomeStackNavigationProp, HomeStackParamList} from '../../navigation/types';
import type {RouteProp} from '@react-navigation/native';

type ProductDetailRouteProp = RouteProp<
  HomeStackParamList,
  'ProductDetailScreen'
>;

const ProductDetail = () => {
  const navigation =
    useNavigation<HomeStackNavigationProp<'ProductDetailScreen'>>();
  const route = useRoute<ProductDetailRouteProp>();
  const {productId} = route.params;

  // Mock product data - in real app, fetch from API using productId
  const product = {
    id: productId,
    name: 'Fresh Organic Apples',
    price: 4.99,
    originalPrice: 6.99,
    category: 'Fruits & Vegetables',
    brand: 'Organic Farm',
    weight: '1 kg',
    description:
      'Fresh, crispy organic apples sourced directly from local farms. Perfect for snacking, baking, or adding to your favorite recipes. Rich in vitamins and fiber.',
    image:
      'https://via.placeholder.com/300x200/6CC51D/FFFFFF?text=Organic+Apples',
    inStock: true,
    rating: 4.8,
    reviews: 127,
    nutritionFacts: [
      'Calories: 52 per 100g',
      'Fiber: 2.4g',
      'Vitamin C: 4.6mg',
      'Potassium: 107mg',
    ],
  };

  const handleAddToCart = () => {
    // TODO: Add to cart logic
    console.log(`Added ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // TODO: Buy now logic
    console.log(`Buy now: ${product.name}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>🍎</Text>
          <Text style={styles.imageLabel}>Product Image</Text>
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
          <Text style={styles.categoryText}>{product.id}</Text>
        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.brand}>by {product.brand}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.reviews}>({product.reviews} reviews)</Text>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )}
              % OFF
            </Text>
          </View>
        </View>

        <Text style={styles.weight}>Weight: {product.weight}</Text>

        {/* Stock Status */}
        <View style={styles.stockContainer}>
          <View
            style={[
              styles.stockDot,
              {backgroundColor: product.inStock ? '#6CC51D' : '#FF4444'},
            ]}
          />
          <Text
            style={[
              styles.stockText,
              {color: product.inStock ? '#6CC51D' : '#FF4444'},
            ]}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={!product.inStock}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buyNowButton,
            !product.inStock && styles.disabledButton,
          ]}
          onPress={handleBuyNow}
          disabled={!product.inStock}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6CC51D',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 300,
    height: 200,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  imageLabel: {
    fontSize: 14,
    color: '#666666',
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  categoryBadge: {
    backgroundColor: '#6CC51D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6CC51D',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  weight: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  nutritionFact: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6CC51D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#6CC51D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#6CC51D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProductDetail;
