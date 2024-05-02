import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { DrawerContent } from './navigation/DrawerNavigation';
import CreateOrder from './screens/CreateOrder';
import ListItem from './components/LIstItem';
import Tables from './screens/Tables';
import Roast from './screens/Roast';
import Specials from './screens/Specials';
import Desserts from './screens/Desserts';
import Drinks from './screens/Drinks';
import Fast_food from './screens/Fast_food';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>           
      <Stack.Navigator>
        <Stack.Screen name='HomeMesas' component={DrawerContent} options={{headerShown:false}}/>
        <Stack.Screen name='CreateOrder' component={CreateOrder} options={{title:'Crear Pedido'}}/>
        <Stack.Screen name='Roast' component={Roast} options={{title:'Asados'}} />
        <Stack.Screen name='Specials' component={Specials} options={{title:'Platos especiales'}} />
        <Stack.Screen name='Desserts' component={Desserts} options={{title:'Postres'}} />
        <Stack.Screen name='Drinks' component={Drinks} options={{title:'Bebidas'}} />
        <Stack.Screen name='Fast_food' component={Fast_food} options={{title:'Comidas rápidas'}} />
      </Stack.Navigator>                 
    </NavigationContainer>
  );
};