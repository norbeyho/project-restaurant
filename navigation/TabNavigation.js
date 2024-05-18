import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateOrder from "../screens/CreateOrder";
import Desserts from "../screens/Desserts";
import Specials from "../screens/Specials";
import Roast from "../screens/Products";


const Tab = createMaterialTopTabNavigator();

export function TabContent() {
    
    <Tab.Navigator
        initialRouteName="CreateOrder"
        screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:'white',
                tabBarInactiveTintColor:'gray',
                tabBarActiveBackgroundColor:'blue',
                tabBarInactiveBackgroundColor:'white'
            }}>
        <Tab.Screen name="Create Order" component={CreateOrder} options={{
            title:'Crear Orden',
            tabBarIcon: ()=>(
                <MaterialIcons name="person" size={30} color={'red'} />
            )
        }} />
        <Tab.Screen name="Desserts" component={Desserts} />
        <Tab.Screen name="Specials" component={Specials} />
        <Tab.Screen name="Roast" component={Roast} />
    </Tab.Navigator>
}