import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { DrawerContent } from './navigation/DrawerNavigation';
import CreateOrder from './screens/CreateOrder';
import Products from './screens/Products';
import { DataProvider } from './context/DataContext';
import Comments from './screens/Comments';
import { LogBox } from 'react-native';
import Login from './screens/Login';
import Orders from './screens/Orders';
import PendingOrders from './screens/PendingOrders';


LogBox.ignoreLogs([
  '[Reanimated] Reduced motion setting is enabled on this device.',
]);

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <DataProvider>
    <NavigationContainer>           
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='HomeMesas' component={DrawerContent} options={{headerShown:false}} />        
        <Stack.Screen name='CreateOrder' component={CreateOrder} options={{title:'Crear pedido',headerStyle:{backgroundColor:'#62152d'},headerTintColor:'white',headerShadowVisible:true,headerTitleAlign:'center'}}/>
        <Stack.Screen name='Products' component={Products} options={{title:'Agregar Producto',headerStyle:{backgroundColor:'#62152d'},headerTintColor:'white',headerShadowVisible:true,headerTitleAlign:'center'}} />        
        <Stack.Screen name='Orders' component={Orders} options={{title:'Pedidos'}} />
        <Stack.Screen name='Comentarios' component={Comments} />
        <Stack.Screen name='PendingOrders' component={PendingOrders} options={{ title:'Cocina',
          headerStyle: {
            backgroundColor: '#8e0000'},// Cambia el color de fondo de la barra de navegación
            headerTintColor: '#fff', // Cambia el color del texto en la barra de navegación
            headerTitleStyle: {fontWeight: 'bold', fontSize: 30}, // Cambia el estilo del título en la barra de navegación
            headerTitleAlign: ''
        }}/>
      </Stack.Navigator>                 
    </NavigationContainer>
    </DataProvider>
  );
};
