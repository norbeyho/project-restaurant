import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tables from "../screens/Tables";
import Orders from "../screens/Orders";



const Drawer = createDrawerNavigator();

export function DrawerContent() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Mesas" component={Tables} />   
            <Drawer.Screen name="Pedidos" component={Orders} />
        </Drawer.Navigator>
    )
};