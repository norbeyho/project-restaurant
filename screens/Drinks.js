import { View, Text, ScrollView, Image,TouchableOpacity } from 'react-native'
import styles from '../styles/styles'
import React from 'react'

export default function Drinks() {
  return (
    <ScrollView style={styles.container_ask}>            
      
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Copa de sangría vikinga</Text>   
          <Text style={styles.title_ask}>$15000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Jarra de sangría</Text>   
          <Text style={styles.title_ask}>$85000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Limonada natural</Text>   
          <Text style={styles.title_ask}>$9500</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Limonadas saborizadas</Text>   
          <Text style={styles.title_ask}>$10000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Sodas saborizadas</Text>   
          <Text style={styles.title_ask}>$10500</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Jugos en agua</Text>   
          <Text style={styles.title_ask}>$7000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Jugos en leche</Text>   
          <Text style={styles.title_ask}>$8000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Milo</Text>   
          <Text style={styles.title_ask}>$8500</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Gaseosas</Text>   
          <Text style={styles.title_ask}>$5000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
          <Image source={require('../images/cart.png')} style={styles.img_ask}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}