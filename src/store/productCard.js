import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Star from './utils/star';

const ProductCard = ({item, navigation}) => {
  const renderStars = () => {
    const stars = [];
    const rating = item?.rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starColor = rating > 3 ? 'green' : 'red';

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} type="full" color={starColor} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} type="half" color={starColor} />);
      } else {
        stars.push(<Star key={i} type="full" color="gray" />);
      }
    }

    return stars;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Product',{id: item?.id})}>
      {item?.discountPercentage > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {item?.discountPercentage}% OFF
          </Text>
        </View>
      )}
      <View style={styles.imgContainer}>
        <Image source={{uri: item?.thumbnail}} style={styles.imgStyle} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.price}>₹{item?.price.toFixed(2)}</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <Text
          style={[
            styles.availability,
            {
              color:
                item?.availabilityStatus === 'Low Stock' ? 'red' : 'green',
            },
          ]}>
          {item?.availabilityStatus}
        </Text>
        <View style={styles.tagsContainer}>
          {item?.tags?.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    elevation: 6,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
  },
  imgContainer: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'purple',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  discountText: {
    fontFamily: 'muli-bold',
    color: 'white',
    fontWeight: '400',
    fontSize: 13,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    fontFamily: 'muli-bold',
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontFamily: 'muli-bold',
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  availability: {
    fontFamily: 'muli-bold',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  tag: {
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontFamily: 'muli-bold',
    fontSize: 12,
    color: '#555',
  },
});
