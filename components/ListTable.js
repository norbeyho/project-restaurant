import React, { useContext, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles/styles";
import { DataContext } from "../context/DataContext";


const ListItem = ({ item }) => {
        
    const image = require('../images/icon.png');
    const { tableColors} = useContext(DataContext);
    const { tableName } = item;

    const dotColor = tableColors[tableName] || 'green';
    
    return (        
            <View style={styles.item}>             
                <Text style={styles.title}>{tableName}</Text>               
                <Image source={image} style={styles.img}/>
                <View style={[styles.dot, { backgroundColor: dotColor }]}/>
            </View>             
    );
}

export default ListItem;