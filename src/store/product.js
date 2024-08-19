import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomLoader from './utils/CustomLoader';

const ProductScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      let url = 'https://dummyjson.com/products/' + id;
      let response = await axios.get(url);
      setProduct(response?.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesome key={i} name="star" size={18} color="#FFD700" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesome key={i} name="star-half-o" size={18} color="#FFD700" />,
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={18} color="#ccc" />,
        );
      }
    }

    return stars;
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <ScrollView style={styles.main}>
      <View style={styles.productContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="long-arrow-left" size={18} color="#333" />
        </TouchableOpacity>

        <Image source={{uri: product?.images[0]}} style={styles.productImage} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product?.title}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product?.price.toFixed(2)}</Text>
            {product?.discountPercentage > 0 && (
              <Text style={styles.discount}>
                {product.discountPercentage}% OFF
              </Text>
            )}
          </View>

          <View style={styles.starsContainer}>
            {renderStars(product?.rating)}
            <Text style={styles.ratingText}>
              {product?.rating} ({product?.reviews.length} reviews)
            </Text>
          </View>

          <Text style={styles.description}>{product?.description}</Text>

          <View style={styles.infoDetailsContainer}>
            <Text style={styles.infoLabel}>
              Brand: <Text style={styles.infoValue}>{product?.brand}</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Category:{' '}
              <Text style={styles.infoValue}>{product?.category}</Text>
            </Text>
            <Text style={styles.infoLabel}>
              SKU: <Text style={styles.infoValue}>{product?.sku}</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Dimensions:{' '}
              <Text style={styles.infoValue}>
                {product?.dimensions?.width} x {product?.dimensions?.height} x{' '}
                {product?.dimensions?.depth} cm
              </Text>
            </Text>
            <Text style={styles.infoLabel}>
              Weight: <Text style={styles.infoValue}>{product?.weight} kg</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Availability:{' '}
              <Text
                style={[
                  styles.infoValue,
                  product?.availabilityStatus === 'Low Stock'
                    ? {color: 'red'}
                    : {color: 'green'},
                ]}>
                {product?.availabilityStatus}
              </Text>
            </Text>
            <Text style={styles.infoLabel}>
              Warranty:{' '}
              <Text style={styles.infoValue}>
                {product?.warrantyInformation}
              </Text>
            </Text>
            <Text style={styles.infoLabel}>
              Shipping:{' '}
              <Text style={styles.infoValue}>
                {product?.shippingInformation}
              </Text>
            </Text>
            <Text style={styles.infoLabel}>
              Return Policy:{' '}
              <Text style={styles.infoValue}>{product?.returnPolicy}</Text>
            </Text>
          </View>

          <Text style={styles.reviewHeader}>Customer Reviews:</Text>
          {product?.reviews?.map((review, index) => (
            <View key={index} style={styles.reviewContainer}>
              <Text style={styles.reviewText}>
                <FontAwesome name="user" size={16} color="#ff5722" />{' '}
                {review.reviewerName}
              </Text>
              <View style={styles.starsContainer}>
                {renderStars(review.rating)}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>
                Reviewed on {new Date(review.date).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  productContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 15,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'muli-bold',
    fontSize: 21,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontFamily: 'muli-bold',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  discount: {
    fontFamily: 'muli-bold',
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 12,
    backgroundColor: '#e8f5e9',
    padding: 4,
    borderRadius: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontFamily: 'muli-bold',
    marginLeft: 8,
    fontSize: 16,
    color: '#757575',
  },
  description: {
    fontFamily: 'muli-bold',
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    lineHeight: 24,
  },
  infoDetailsContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  infoLabel: {
    fontFamily: 'muli-bold',
    fontSize: 15,
    fontWeight: '500',
    color: 'blue',
    marginBottom: 5,
  },
  infoValue: {
    fontFamily: 'muli-bold',
    fontWeight: 'normal',
    color: 'black',
  },
  reviewHeader: {
    fontFamily: 'muli-bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 12,
  },
  reviewContainer: {
    backgroundColor: '#fff8e1',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  reviewText: {
    fontFamily: 'muli-bold',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  reviewComment: {
    fontFamily: 'muli-bold',
    fontSize: 15,
    color: '#616161',
    marginBottom: 8,
  },
  reviewDate: {
    fontFamily: 'muli-bold',
    fontSize: 13,
    color: '#9e9e9e',
  },
});

export default ProductScreen;
