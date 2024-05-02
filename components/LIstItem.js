import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles/styles";


const ListItem = ({ item }) => {
        
    const { name, image, key } = item;

    return (        
            <View style={styles.item}>             
                <Text style={styles.title}>{name}</Text>               
                <Image source={image} style={styles.img}/>                                           
            </View>             
    );
}

export default ListItem;
