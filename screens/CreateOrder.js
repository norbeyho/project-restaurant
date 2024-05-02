
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/styles'
import { View, Text, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Icon } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import Roast from './Roast'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Fast_food from './Fast_food'

const CreateOrder = () => {

  const Tab = createMaterialTopTabNavigator();
  //const navigation = useNavigation();
  
const route = useRoute();
const tableKey = route.params.tableKey;
    
  return (
    <Tab.Navigator>
      <Tab.Screen name='Create_Order' component={Roast}/>
    </Tab.Navigator>
    
  )
}

export default CreateOrder
