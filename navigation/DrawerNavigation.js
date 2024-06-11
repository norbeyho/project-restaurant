import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tables from "../screens/Tables";
import Orders from "../screens/Orders";
import { LinearGradient } from "expo-linear-gradient";

const Drawer = createDrawerNavigator();

export function DrawerContent({route}) {
    const {username} = route.params;
    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name="Mesas" 
                component={Tables} 
                initialParams={{username}} 
                options={{headerStyle:{backgroundColor:'#62152d'},headerTintColor:'white',headerShadowVisible:true,headerTitleAlign:'center'}} 
                />   
            <Drawer.Screen 
                name="Pedidos" 
                component={Orders} 
                initialParams={{username}} 
                options={{headerStyle:{backgroundColor:'#62152d'},headerTintColor:'white',headerShadowVisible:true,headerTitleAlign:'center'}} />
        </Drawer.Navigator>
    )
};
