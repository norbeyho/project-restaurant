// CommentScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View,  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DataContext } from '../context/DataContext';
import { Text, TextInput, Button } from 'react-native-paper';
import styles from '../styles/styles';

const CommentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productName } = route.params;
  const { orders, currentTable, updateComment } = useContext(DataContext);
  const [comment, setComment] = useState('');

  useEffect(() =>{
    const tableOrder = orders[currentTable] || [];
    const product = tableOrder.find(item => item.productName === productName);
    if(product && product.comment) {
      setComment(product.comment)
    }
  },[orders, currentTable, productName])

  const handleSaveComment = () => {
    updateComment(productName, comment);
    navigation.goBack();
  };

  return (
    <View style={styles.containerComment}>
      <Text style={styles.textComment} variant='titleMedium'>Agregar Comentario para {productName}</Text>
      
      <TextInput
        style={{width:'80%',marginTop:100,textAlign:'center'}}
        placeholder="Escriba comentario aquí"
        mode='outlined'
        outlineColor='#530B24'
        activeOutlineColor='#530B24'    
        multiline
        value={comment}
        onChangeText={setComment}
      />
      <Button 
        title="Guardar" 
        mode='contained'        
        labelStyle={{fontSize:18,marginTop:15}}
        style={{width:'80%',marginTop:20,height:50,}}
        buttonColor='#530B24'
        onPress={handleSaveComment}>
        Guardar
      </Button>
           
    </View>
  );
};

export default CommentScreen;
