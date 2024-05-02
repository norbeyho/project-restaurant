import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'



export default function Roast() {



  return (
    <ScrollView style={styles.container_ask}>      
      <Image source={require('../images/vaca.png')} style={{width:20,height:20,marginLeft:20,marginTop:20,marginBottom:10}}/>
      
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Producto</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=> console.log(addItem)}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Churrasco</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Lomo de res</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <Image source={require('../images/cerdo.png')} style={{width:20,height:20,marginLeft:20,marginTop:20,marginBottom:10}}/>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Cañon</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Chuleton</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Costillas</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <Image source={require('../images/pollo.png')} style={{width:20,height:20,marginLeft:20,marginTop:20,marginBottom:10}}/>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Filete de pechuga</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Chuzo de pollo</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Alitas x6</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
        <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
    </ScrollView>      
    
  )
}