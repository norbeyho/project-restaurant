import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import ListItem from "../components/LIstItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CreateOrder from "./CreateOrder";


const Tables = () => {

    const [table] = useState([
      {name: "Mesa 1", key: '01',image: require('../images/icon.png')},
      {name: "Mesa 2", key: '02',image: require('../images/icon.png')},
      {name: "Mesa 3", key: '03',image: require('../images/icon.png')},
      {name: "Mesa 4", key: '04',image: require('../images/icon.png')},
      {name: "Mesa 5", key: '05',image: require('../images/icon.png')},
      {name: "Mesa 6", key: '06',image: require('../images/icon.png')},
      {name: "Mesa 7", key: '07',image: require('../images/icon.png')},
      {name: "Mesa 8", key: '08',image: require('../images/icon.png')},
      {name: "Mesa 9", key: '09',image: require('../images/icon.png')},
      {name: "Mesa 10", key:'10',image: require('../images/icon.png')}       
    ]);
    
    const navigation = useNavigation();

    const selectTable = (tableKey) =>{
      navigation.navigate('CreateOrder', { tableKey})
    }
    
    return (
      <SafeAreaView style={styles.container}>           
        <FlatList 
            style={styles.flatlist}
            contentContainerStyle={{flexGrow:1}}
            showsVerticalScrollIndicator={false}
            data={table}
            keyExtractor={ (item) => item.key } 
            numColumns={2}
            renderItem={ ({item}) => (
                <TouchableOpacity onPress={()=> selectTable(item.key)}>
                    <ListItem item={item} />
                </TouchableOpacity>
            )}               
        />                                  
      </SafeAreaView>
        
    );
}

export default Tables;
 
