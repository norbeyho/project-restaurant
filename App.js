import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { DrawerContent } from './navigation/DrawerNavigation';
import CreateOrder from './screens/CreateOrder';
import Products from './screens/Products';
import { DataProvider } from './context/DataContext';
import { Orders } from './screens/Orders';
import Comments from './screens/Comments';
import { LogBox } from 'react-native';
import Login from './screens/Login';

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
        <Stack.Screen name='HomeMesas' component={DrawerContent} options={{headerShown:false}}/>        
        <Stack.Screen name='CreateOrder' component={CreateOrder} options={{title:'Crear Pedido'}}/>
        <Stack.Screen name='Products' component={Products} options={{title:'Agregar Producto'}} />        
        <Stack.Screen name='Orders' component={Orders} options={{title:'Pedidos'}} />
        <Stack.Screen name='Comentarios' component={Comments} />
      </Stack.Navigator>                 
    </NavigationContainer>
    </DataProvider>
  );
};