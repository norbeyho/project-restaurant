import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataContext } from '../context/DataContext';
import 'react-native-gesture-handler'
import styles from "../styles/styles";
import { Button } from 'react-native-paper';

const Orders = () => {
  const { pendingOrders } = useContext(DataContext);  
  console.log('pending',pendingOrders)
  return (
    <View style={styles.orderContainer}>

      <FlatList
        data={pendingOrders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>{item.table}</Text>
            <Text style={styles.orderText}>Usuario: {item.username}</Text>
            <Text style={styles.orderText}>Fecha: {new Date(item.date).toLocaleString()}</Text>
            {/* <Text style={styles.orderText}>Total: ${item.totalValue}</Text> */}
            <Text style={styles.orderText}>Progreso: {item.progress}</Text>
            <FlatList
              data={item.items}
              keyExtractor={(product, index) => index.toString()}
              renderItem={({ item: product }) => (
                <View style={styles.productItem}>
                  <Text style={styles.orderText}>Producto: {product.product}</Text>
                  <Text style={styles.orderText}>Cantidad: {product.quantity}</Text>
                  <Text style={styles.orderText}>Precio: ${product.price}</Text>
                  <Text style={styles.orderText}>Comentario: {product.comment}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Orders;
