
import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/styles'
import { View, Text, Image, FlatList, Pressable, } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import ListCategory from '../components/ListCategory'
import { DataContext } from '../context/DataContext'
import { Button } from 'react-native-paper'

const CreateOrder = () => {

  const [ category, setCategory] = useState([])  
  const navigation = useNavigation();
  const route = useRoute();
  const { tableName } = route.params;
  const { order, addProduct, setOrder } = useContext(DataContext)

   useEffect(()=>{
     const getCategory = async () =>{
       try {
         //const url = `https://backend-restaurant-seven.vercel.app/api/categories`;
         const response = await axios.get(`https://backend-restaurant-seven.vercel.app/api/categories`);
         setCategory(response.data);
       }
       catch(error){
         console.log("No se cargaron los datos",error)
       }
     }
     getCategory();
   },[]);  

  const selectCategory = (categoryId) =>{
    navigation.navigate('Products', {categoryId})
  }  

  //total
  const total = order.reduce((acc, el) => acc + el.quantity * el.price, 0)

  //incrementar
  const handleAddPress = (product) => {
    addProduct(product);
  };

  //decrementar
  const handleDecPress = (product) => {
    const productRepeat = order.find((item) => item.productName === product.productName);

    productRepeat.quantity !== 1 && setOrder(order.map((item) => 
      (item.productName === product.productName ? { ...product, quantity: productRepeat.quantity -1 } : item)))
  }

  //eliminar
  const handleDelPress = (product) => {
    setOrder(order.filter((item) => item.productName !== product.productName));
  };

  return (
    <View style={styles.container_crear_pedido}>
      <Text style={[styles.title,{marginTop:15}]}>{tableName}</Text>
      <FlatList     
            data={category}
            keyExtractor={ (item) => item.categoryId } 
            numColumns={5}
            renderItem={ ({item}) => (
                <TouchableOpacity 
                    style={{height:100,marginTop:10}}
                    onPress={()=> selectCategory(item.categoryId)} >                
                    <ListCategory item={item}/>
                </TouchableOpacity>
            )}               
        />    
        
          <FlatList
              data={order}
              keyExtractor={(item) => item.productName }
              renderItem={({ item }) => (
            <View style={styles.view_ask}>
              <Text style={styles.title}>{item.productName}</Text>
              
              
                <Button icon={'minus'} textColor='white' onPress={() => handleDecPress(item)}/>
                <Text style={styles.title}>{item.quantity}</Text>
                <Button icon={'plus'} textColor='white' onPress={() => handleAddPress(item)}/>
              
                
                  
                
              
              
              <Text style={styles.title}>
                Valor: $ {item.quantity * item.price}
              </Text>
              <Button icon={'delete'} onPress={() => handleDelPress(item)}/>
                  
              
              
            </View>
          )}
        />
            
        <View style={styles.vista_menu}>
          <Button style={styles.button_menu} icon={'receipt'} title='cuenta' buttonColor= '#1c4c96' mode='contained' onPress={()=>console.log('cuenta')}>Cuenta</Button>
          <Button style={styles.button_menu} icon={'cancel'} title='cancelar' buttonColor= '#E60041' mode='contained' onPress={()=>console.log('cancelar')}>Cancelar</Button>
          <Button style={styles.button_menu} icon={'send'} title='comanda' buttonColor= '#038554' mode='contained' onPress={()=>console.log('comanda')}>Comanda</Button>
        </View>          
    </View>    
  )
}

export default CreateOrder;
 