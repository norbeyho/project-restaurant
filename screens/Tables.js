import React, { useEffect, useState } from "react";
import { View, FlatList,TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ListItem from "../components/ListTable";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";




const Tables = () => {

  const [ table, setTable ] = useState([]);
    
  useEffect(()=>{
  const getTable = async () => {
    try {
      const url = `http://148.113.142.238:3000/api/tables`;
      const response = await axios.get(url);      
      setTable(response.data);
      //setIcon(response.data.icon);
    }
    catch (error) {
      console.log("No se cargaron los datos",error)
    }
  }
  getTable();
},[]);    
    
    const navigation = useNavigation();

    const selectTable = (tableName, tableId) =>{
      navigation.navigate('CreateOrder', { tableName, tableId })
    }
    
    return (
      <ImageBackground
      source={require('../images/bg.webp')} 
      style={[styles.container,styles.img_background]}>
      <LinearGradient style={{width:'100%',flex:1,alignItems:'center'}} colors={['rgba(99, 21, 21, 0.4)', 'transparent']}>           
        <FlatList 
            style={styles.FlatList}
            contentContainerStyle={{flexGrow:1}}
            showsVerticalScrollIndicator={false}
            data={table}
            keyExtractor={ (item) => item.tableId } 
            numColumns={2}            
            renderItem={ ({item}) => (
                <TouchableOpacity onPress={()=> selectTable(item.tableName)}>
                    <ListItem item={item} />
                </TouchableOpacity>
            )}               
        />     
        </LinearGradient>                             
      </ImageBackground>
        
    );
}

export default Tables;
 
