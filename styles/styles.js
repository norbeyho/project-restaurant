import { StyleSheet } from "react-native";

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#16161C',
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'column'
    },
    item: {
        flex:1,
        backgroundColor: '#530B24',        
        padding: 20,
        width: 160,
        alignItems:'center',
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 8,
        borderWidth:0.5,        
        borderBlockEndColor:'#8f3d38',
        borderRightColor:'#8f3d38',
      },
      title: {
        fontSize: 16,
        color: '#c8c8c8',
        fontWeight:'bold'
      },
      img:{
        flex:1,
        flexGrow:1,
        height:50,
        width:50
      },

      //Vista Crear Pedido
      container_crear_pedido: {
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'column',
        backgroundColor:'#530B24',
        //alignItems:'flex-end'
      },

      container_crear_pedido2: {
        flex:1,
        justifyContent:'flex-end',
        flexDirection:'column',
        backgroundColor:'#530B24',
        alignItems:'flex-end',
        //alignItems:'center',
        //justifyContent:'space-between'
      },

      title_menu:{
        //flex:1,
        marginTop:20,
        alignItems:'center'
      },

      container_menu: {
        flex:5,
        flexDirection:'column',
        //marginStart:10,
        //justifyContent:'center',
        alignItems:'center',
        width:'15%',
        //height:'100%',
        //backgroundColor:'purple',
        //alignItems:'flex-end',
        marginTop:10,
        marginEnd:10
      },

      title_menu_item: {
        //flex:1,
        flexDirection:'column',
        //marginRight: 0, // Espacio entre el título y la imagen
        alignSelf: 'flex-start',
        color:'white',
        //marginTop:15
        //backgroundColor:'white'
      },

      img_menu: {
        //flex:1,
        height:40,
        width:40,
        marginTop:5,  
        resizeMode:'contain'      
        //shadowColor:'#f2f2f2',
        //shadowOffset:{width:0,height:2},
        //shadowRadius:5,
        
      },

      list_menu: {
        //flex:1,
        // flexDirection:'row',
        // width:'100%',
        // marginTop:20,
        //height:'100%',
        //gap:20,
        alignItems:'center',
        //justifyContent:'flex-start',
        marginBottom:20,
        //fontSize: 15,
        color: 'white',        
        //padding:15,
        //marginEnd:10,        
        //justifyContent: 'flex-end',
        //backgroundColor:'red'
      },

      vista_menu: {
        flex:1,
        flexDirection:'row',
        //justifyContent:'space-around',
        alignItems:'flex-end',
        gap:10,
        margin:10,
        //marginTop:0,
        marginBottom:20
      },

      button_menu: {
        flex:1,
        justifyContent:'center',        
        width:'auto',
        borderRadius:20,
        height:40
      },

      //Seccion Pedido
      container_ask: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor:'#16161C',        
      },

      title_ask: {
        fontSize:15,
        color:'#C2C2C2',
        marginLeft:10,
        //flex:1,        
      },
      img_ask: {
        marginRight:20,
        width:30,
        height:30,                
      },
      view_ask: {
        backgroundColor:'#530B24',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,   
        borderBottomColor:'#C2C2C2',
        borderWidth:0.2,            
      }
});

export default styles;