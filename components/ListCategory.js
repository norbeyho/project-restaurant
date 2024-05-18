
import { View, Text, Image } from "react-native";
import styles from "../styles/styles";


const ListCategory = ({item}) => {

    const {categoryName, icon} = item;

    return (
        <View style={[styles.category,{}]}>
            <Text style={[styles.title,{}]}>{categoryName}</Text>            
            <Image style={[styles.img_category,{}]} source={{uri:icon}}/>                                 
        </View>
    );
}

export default ListCategory;