import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export const Orders = ({ route }) => {
    const [ order, setOrder ] = useState([]);
    //const { order, totalAmount, tableName } = route.params;
    useEffect(() => {
      const getOrders = async () => {
        try{
          const url = `http://148.113.142.238:3000/api/orders`
          const response = await axios.get(url);
          setOrder(response.data);
        }
        catch (error) {
          console.log('No se cargaron los datos')
        }
      }
      getOrders();
    },[])

    const renderItem = ({ item }) => (
      <ScrollView style={styles.orderContainer}>
      <View style={styles.productContainer}>
        <Text style={styles.title}>{item.tableName}</Text>
        <Text style={styles.title}>Usuario: {item.username}</Text>
        <Text style={styles.title}>Fecha: {new Date(item.date).toLocaleString()}</Text>
        <Text style={styles.title}>Estado: {item.progress}</Text>
        <FlatList
        
          data={item.items}
          keyExtractor={(product) => product.product}
          renderItem={({ item: product }) => (
            <View style={styles.textComment}>
              <Text style={styles.textComment}>{product.product}</Text>
              <Text style={styles.textComment}>Cantidad: {product.quantity}</Text>
              <Text style={styles.textComment}>Comentario: {product.comment}</Text>
              <Text style={styles.textComment}>Precio: ${product.price}</Text>
            </View>
          )}
        />
        <Text style={styles.textComment}>Total: ${item.totalValue}</Text>
      </View>
      </ScrollView>
    );
  
    return (
      <View style={styles.orderContainer}>
        <FlatList
          data={order}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    );
  };