import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/styles'
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import ListCategory from '../components/ListCategory'
import { DataContext } from '../context/DataContext'
import { Button, IconButton } from 'react-native-paper'
import { io } from 'socket.io-client'

//const socket = io('http://148.113.142.238:3000/')

const CreateOrder = () => {

  const [category, setCategory] = useState([])  
  const navigation = useNavigation();
  const route = useRoute();
  const { tableName } = route.params;
  const { orders, addProduct, setTable, setOrders, totalAmount, searchOrder } = useContext(DataContext)

  useEffect(() => {
    setTable(tableName); //Establecer la mesa actual
    searchOrder(tableName);//Buscar la orden actual
  }, [tableName, setTable]);

  //Cargar la lista de categorías
  useEffect(() => {
    const getCategory = async () => {
      try {
        const url = `https://backend-restaurant-seven.vercel.app/api/categories`;
        const response = await axios.get(url);
        setCategory(response.data);
      }
      catch (error) {
        console.log("No se cargaron los datos", error)
      }
    }
    getCategory();
  }, []);

  // useEffect(()=>{
  //   socket.on('orderUpdate',(statusUpdate) =>{
  //     console.log('Orden actualizada:', statusUpdate);
  //   });
  //   return () => {
  //     socket.off('orderUpdate');
  //   }
  // },[]);

  //Pasar el Id de la categoría correspondiente
  const selectCategory = (categoryId) => {
    navigation.navigate('Products', { categoryId })
  }
  //Aumentar la cantidad de un producto
  const handleAddPress = (product) => {
    addProduct(product);
  };
  //Disminuir la cantidad de un producto
  const handleDecPress = (product) => {
    const productRepeat = orders[tableName].find((item) => item.productName === product.productName);

    productRepeat.quantity !== 1 && setOrders({
      ...orders,
      [tableName]: orders[tableName].map((item) =>
        item.productName === product.productName ? { ...product, quantity: productRepeat.quantity - 1 } : item
      )
    });
  }
  //Eliminar un producto
  const handleDelPress = (product) => {
    setOrders({
      ...orders,
      [tableName]: orders[tableName].filter((item) => item.productName !== product.productName)
    });
  };
  //Guardar el pedido
  const handleOrderSubmit = async () => {
    
    const orderData = {
      tableName: tableName,
      username: "Mesero 01",
      date: new Date(),
      items: orders[tableName].map(item => ({
        product: item.productName,
        quantity: item.quantity,
        comment:item.comment || '',
        price: item.price
      })),
      totalValue: totalAmount,      
      progress: "Pendiente",      
    };
    try {
      const response = await axios.post('https://backend-restaurant-seven.vercel.app/api/orders', orderData);
      console.log('Orden enviada:', response.data);
      //socket.emit('newOrder', orderData);
      //Limpiar orden
      //setOrders({ ...orders, [tableName]: [] });
      
      navigation.navigate('Mesas'); //Regresar a la pantalla Mesas
    } catch (error) {
      console.error('Error al guardar pedido:', error);
      console.log(orderData)
    }
  };
  //Actualizar un pedido
  const handleOrderUpdate = async () => {
    const currentOrder = orders[tableName] || [];
    
    const orderData = {      
      username: "Mesero 01",
      date: new Date(),
      items: currentOrder.map(item => ({
        product: item.productName,
        quantity: item.quantity,
        comment:item.comment || '',
        price: item.price
      })),
      totalValue: totalAmount,      
      progress: "Pendiente",      
    };

    try {
      const response = await axios.put('https://backend-restaurant-seven.vercel.app/api/orders/${existingOrderId}', orderData);
      console.log('Orden enviada:', response.data);
      //socket.emit('newOrder', orderData);
            
      navigation.navigate('Mesas'); // Regresar a la pantalla Mesas
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      console.log(orderData)
    }
  };

  return (
    <View style={styles.container_crear_pedido}>
      <Text style={[styles.title, { marginTop: 15 }]}>{tableName}</Text>
      <View style={{flex:1,marginBottom:0,}}>
      <FlatList
        data={category}
        keyExtractor={(item) => item.categoryId}
        numColumns={5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ height: 100, marginTop: 10 }}
            onPress={() => selectCategory(item.categoryId)}>
            <ListCategory item={item} />
          </TouchableOpacity>
        )}
      />
      </View>
      <View style={{flex:3,marginBottom:10,alignItems:'center'}}>
      <FlatList
        data={orders[tableName] || []}
        keyExtractor={(item) => item.productName}
        renderItem={({ item }) => (
          <ScrollView style={{paddingStart:20,}}>
          <Text style={styles.title}>{item.productName}</Text>
                        
            <View style={styles.horizontalContainer}>   
                   
            <Text style={styles.title}>
              $ {item.quantity * item.price}
            </Text>
            <View style={styles.buttonContainer}>
            <IconButton
              title="Comentario"
              icon="comment"
              iconColor={item.comment ? '#FFA500' : '#C1C1C1'}
              onPress={() => { navigation.navigate("Comentarios", {productName: item.productName}) }}
            />
            <IconButton 
              icon={'delete'} 
              iconColor='#E10141' 
              onPress={() => handleDelPress(item)} />
            </View>  
            <View style={styles.buttonContainer}>
              <IconButton 
                icon={'minus'} 
                iconColor='#E10141' 
                mode='contained' 
                background={'red'} 
                size={15} 
                onPress={() => handleDecPress(item)} />
              <Text style={styles.title}>{item.quantity}</Text>
              <IconButton 
                icon={'plus'} 
                iconColor='#E10141'
                mode='contained' 
                size={15} 
                onPress={() => handleAddPress(item)} />
            </View>
            </View>
            
          </ScrollView>
        )}
      />
      {orders[tableName] && orders[tableName].length > 0 && (
        <View style={styles.title}>
          <Text style={[styles.title]}>Total: $ {totalAmount}</Text>
        </View>
      )}
      </View>
      <View style={styles.vista_menu}>
        <Button style={styles.button_menu} icon={'receipt'} title='cuenta' buttonColor='#1c4c96' mode='contained' onPress={() => console.log('cuenta')}>Cuenta</Button>
        <Button style={styles.button_menu} icon={'cancel'} title='cancelar' buttonColor='#FFA500' mode='contained' onPress={handleOrderUpdate}>Actualizar</Button>
        <Button style={styles.button_menu} icon={'send'} title='comanda' buttonColor='#038554' mode='contained' onPress={handleOrderSubmit}>Comanda</Button>
      </View>
    </View>
  )
}

export default CreateOrder;
