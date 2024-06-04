import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/styles";
import { View, Text, FlatList } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native";
import { DataContext } from "../context/DataContext";
import { io } from "socket.io-client";

const Orders = () => {
  const { pendingOrders, setPendingOrders } = useContext(DataContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://148.113.142.238:3000');
    setSocket(newSocket);

    newSocket.on('newOrder', (order) =>{
      setPendingOrders((prevOrders) => [...prevOrders, order]);
    });

    return () => newSocket.close();
  }, [setPendingOrders]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Pendientes</Text>
      <FlatList
        data={pendingOrders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.title}>Mesa: {item.tableName}</Text>
            <Text style={styles.title}>Mesero: {item.username}</Text>
            <Text style={styles.title}>Total: $ {item.totalValue}</Text>
            <FlatList
              data={item.items}
              keyExtractor={(subItem, subIndex) => subIndex.toString()}
              renderItem={({ subItem }) => (
                <View style={styles.orderDetail}>
                  <Text style={styles.title}>{subItem.product}</Text>
                  <Text style={styles.title}>Cantidad: {subItem.quantity}</Text>
                  <Text style={styles.title}>Precio: $ {subItem.price}</Text>
                  {subItem.comment && <Text style={styles.title}>Comentario: {subItem.comment}</Text>}
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}

export default Orders;