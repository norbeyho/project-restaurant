
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/styles'
import { View, Text, Image, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import ListCategory from '../components/ListCategory'


const CreateOrder = () => {

  const [ category, setCategory] = useState([])
  const navigation = useNavigation();
  const route = useRoute();
  const { tableName, producName, price} = route.params;
  

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
        <View>
          <Text style={[styles.title,{marginTop:15}]}>{producName}</Text>
        </View>
    </View>
    
  )
}

export default CreateOrder
 