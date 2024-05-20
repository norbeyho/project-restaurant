
import React, { useContext, useEffect, useState } from 'react'
import styles from '../styles/styles'
import { View, Text, Image, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import ListCategory from '../components/ListCategory'
import { DataContext } from '../context/DataContext'

const CreateOrder = () => {

  const [ category, setCategory] = useState([])  
  const navigation = useNavigation();
  const route = useRoute();
  const { tableName } = route.params;
  const { order } = useContext(DataContext)

   useEffect(()=>{
     const getCategory = async () =>{
       try {
         const url = `https://backend-restaurant-seven.vercel.app/api/categories`;
         const response = await axios.get(url);
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

  return (
    <View style={styles.container_crear_pedido}>
      <Text style={[styles.title,{marginTop:15}]}>{tableName}</Text>
      <FlatList      
            //style={{}}       
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
        <View style={styles.container_ask}>
          <FlatList
          data={order}
          keyExtractor={(item) => item.productName }
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.title}>{item.productName}</Text>
              <Text style={styles.title}>{item.quantity}</Text>
              <Text style={styles.title}>{item.totalPrice}</Text>
            </View>
          )}
        />
        </View>    
    </View>    
  )
}

export default CreateOrder;
 