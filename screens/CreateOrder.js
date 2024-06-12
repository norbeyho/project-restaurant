import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/styles";
import { View, Text, FlatList, TouchableOpacity, ScrollView,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import ListCategory from "../components/ListCategory";
import { DataContext } from "../context/DataContext";
import { Button, IconButton } from "react-native-paper";
import { io } from "socket.io-client";

const CreateOrder = () => {
  const socket = io('http://148.113.142.238:3000')
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { tableName } = route.params;  
  const { orders, addProduct, setTable, setUserName, username, setOrders, totalAmount, clearTable, pendingOrders, cancelOrder } = useContext(DataContext);

  useEffect(() => {
    setTable(tableName); //Establecer la mesa actual    
    setUserName(username);    
  }, [tableName,username, setTable,setUserName]);

  
  //Cargar la lista de categorías
  useEffect(() => {
    const getCategory = async () => {
      try {
        const url = `http://148.113.142.238:3000/api/categories`;
        const response = await axios.get(url);
        setCategory(response.data);
      } catch (error) {
        console.log("No se cargaron los datos", error);
      }
    };
    getCategory();
  }, []);

  //Pasar el Id de la categoría correspondiente
  const selectCategory = (categoryId) => {
    navigation.navigate("Products", { categoryId });
  };

  const currentOrder = orders.find(order => order.table === tableName);

  //Aumentar la cantidad de un producto
  const handleAddPress = (product) => {
    addProduct(product);
    //codigonuevo
    const updatedOrder = orders.find(order => order.table === tableName);
    socket.emit('updateOrder', updatedOrder);
  };

  //Disminuir la cantidad de un producto
  const handleDecPress = (product) => {
    if (currentOrder) {
      const productRepeat = currentOrder.items.find(
        (item) => item.productName === product.productName
      );

      if (productRepeat.quantity !== 1) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.table === tableName
              ? {
                  ...order,
                  items: order.items.map(item =>
                    item.productName === product.productName
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
                  )
                }
              : order
          )
        );
        //codigonuevo
        const updatedOrder = orders.find(order => order.table === tableName);
        socket.emit('updateOrder', updatedOrder);
      }
    }
  };

  //Eliminar un producto
  const handleDelPress = (product) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.table === tableName
          ? {
              ...order,
              items: order.items.filter(item => item.productName !== product.productName)
            }
          : order
      )
    );
    //codigonuevo
    
    //socket.emit('updateOrder', updatedOrder);
  };

  //Enviar la comanda
  const handleSend = () => {
    const orderData = {
      table: tableName,
      username: username,
      date: new Date(),
      items: currentOrder ? currentOrder.items.map((item) => ({
        product: item.productName,
        quantity: item.quantity,
        comment: item.comment || "",
        price: item.price,
      })) : [],
      progress: "Pendiente",
    };
  
    // Verifica si la orden ya existe y actualiza en lugar de crear una nueva
    if (currentOrder && currentOrder.id) {
      orderData.id = currentOrder.id; // Añadir el id de la orden existente
      socket.emit('updateOrder', orderData);
      console.log('Orden actualizada:', orderData);
    } else {
      socket.emit('newOrder', orderData);
      console.log('Orden nueva:', orderData);
    }
  };
  

  //Cancelar
  const handleCancel = () => {
    setOrders(prevOrders => prevOrders.map(order =>
      order.table === tableName ? { ...order, items: [] } : order
    ));
    clearTable(tableName);   

    const pendingOrder = pendingOrders.find(order => order.table === tableName);
    console.log('pending order', pendingOrder)
    if(pendingOrder)
    cancelOrder(tableName)
  console.log('cancel ordeN', tableName)
    socket.emit('cancel_order', tableName);    
  };

  //Guardar el pedido
  const handleOrderSubmit = async () => {
    const orderData = {
      tableName: tableName,
      username: username,
      date: new Date(),
      items: currentOrder ? currentOrder.items.map((item) => ({
        product: item.productName,
        quantity: item.quantity,
        comment: item.comment || "",
        price: item.price,
      })) : [],
      totalValue: totalAmount,
      progress: "Pendiente",
    };
    try {
      const response = await axios.post(
        'http://148.113.142.238:3000/api/orders',orderData );
      handleCancel();
      
      navigation.navigate("Mesas");
    } catch (error) {
      console.error("Error al guardar pedido:", error);      
    }
  };
  
  return (
    <View style={styles.container_crear_pedido}>
      <Text style={[styles.title, { marginTop: 15 }]}>{tableName}</Text>
      <View style={{ flex: 1, marginBottom: 0 }}>
        <FlatList
          data={category}
          keyExtractor={(item) => item.categoryId}
          numColumns={5}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ height: 100, marginTop: 10 }}
              onPress={() => selectCategory(item.categoryId)}
            >
              <ListCategory item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ flex: 3, marginBottom: 10, alignItems: "center" }}>
        <FlatList
          data={currentOrder ? currentOrder.items : []}
          keyExtractor={(item) => item.productName}
          renderItem={({ item }) => (
            <ScrollView style={{ paddingStart: 20 }}>
              <Text style={styles.title}>{item.productName}</Text>

              <View style={styles.horizontalContainer}>
                <Text style={styles.title}>$ {item.quantity * item.price}</Text>
                <View style={styles.buttonContainer}>
                  <IconButton
                    title="Comentario"
                    icon="comment"
                    iconColor={item.comment ? "#FFA500" : "#C1C1C1"}
                    onPress={() => {
                      navigation.navigate("Comentarios", {
                        productName: item.productName,
                      });
                    }}
                  />
                  <IconButton
                    icon={"delete"}
                    iconColor="#E10141"
                    onPress={() => handleDelPress(item)}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <IconButton
                    icon={"minus"}
                    iconColor="#E10141"
                    mode="contained"
                    background={"red"}
                    size={15}
                    onPress={() => handleDecPress(item)}
                  />
                  <Text style={styles.title}>{item.quantity}</Text>
                  <IconButton
                    icon={"plus"}
                    iconColor="#E10141"
                    mode="contained"
                    size={15}
                    onPress={() => handleAddPress(item)}
                  />
                </View>
              </View>
            </ScrollView>
          )}
        />
        {currentOrder && currentOrder.items.length > 0 && (
          <View style={styles.title}>
            <Text style={[styles.title]}>Total: $ {totalAmount}</Text>
          </View>
        )}
      </View>
      <View style={styles.vista_menu}>
        <Button
          style={styles.button_menu}
          icon={"receipt"}
          title="cuenta"
          buttonColor="#1c4c96"
          mode="contained"
          onPress={handleOrderSubmit}
        >
          Cuenta
        </Button>
        <Button
          style={styles.button_menu}
          icon={"cancel"}
          title="cancelar"
          buttonColor="#E10141"
          mode="contained"
          onPress={handleCancel}
        >
          Limpiar
        </Button>
        <Button
          style={styles.button_menu}
          icon={"send"}
          title="comanda"
          buttonColor="#038554"
          mode="contained"
          onPress={handleSend}
        >
          Comanda
        </Button>
      </View>
    </View>
  );
};

export default CreateOrder;
