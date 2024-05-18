import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import styles from '../styles/styles';

const Products = ({ route }) => {
  const [products, setProducts] = useState([]);
  const { categoryId } = route.params;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = `https://backend-restaurant-seven.vercel.app/api/products/${categoryId}`;
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.log("Error al cargar productos", error);
      }
    };

    getProducts();
  }, [categoryId]);

  return (
    <View style={styles.container_ask}>      
      <FlatList
        data={products}
        keyExtractor={(item) => item.productName}
        renderItem={({ item }) => (
          <View style={styles.view_ask}>
            <View>
            <Text style={styles.title_ask}>{item.productName}</Text>
            <Text style={styles.title_ask}>{item.price}</Text>
            </View>              
            <View>
            <TouchableOpacity onPress={()=>console.log('agregado')}>
            <Image source={require('../images/cart.png')} style={styles.img_ask}/>
            </TouchableOpacity>
            </View>                    
          </View>
        )}
      />
    </View>
  );
};

export default Products;

