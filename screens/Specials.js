import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import styles from '../styles/styles'
import React from 'react'

export default function Specials() {
  return (
    <ScrollView style={styles.container_ask}>      
            
      <View style={styles.view_ask}>  
        <View style={{flexDirection:'column',}}>
          <Text style={styles.title_ask}>Punta de anca</Text>   
          <Text style={styles.title_ask}>$45000</Text>
        </View>                      
        <TouchableOpacity onPress={()=>console.log('agregado')}>
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