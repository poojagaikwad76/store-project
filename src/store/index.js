import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ProductCard from './productCard';
import CustomLoader from './utils/CustomLoader';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true)
    try {
      let url = 'https://dummyjson.com/products';
      let response = await axios.get(url);
      setProducts(response?.data?.products);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  const renderItem = ({item}) => (
    <ProductCard item={item} navigation={navigation} />
  );

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
