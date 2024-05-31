import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles/styles";


const ListItem = ({ item }) => {
        
    const image = require('../images/icon.png');
    const { tableName } = item;
    
    return (        
            <View style={styles.item}>             
                <Text style={styles.title}>{tableName}</Text>               
                <Image source={image} style={styles.img}/>
            </View>             
    );
}

export default ListItem;