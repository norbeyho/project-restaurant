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
      },
      img:{
        flex:1,
        flexGrow:1,
        height:50,
        width:50
      },

      //Vista Crear Pedido
      category : {
        height:'100%',
        justifyContent:'flex-start',   
        alignItems:'center',    
        marginHorizontal: 5,
        margin:10,  
        marginBottom:5,
              
      },
      img_category:{
        flexDirection:'column',
        flexGrow:1,
        height:60,
        width:60,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'#c1c1c1',
        marginBottom:15
      },
      container_crear_pedido: {
        flex:1,
        flexDirection:'column',
        backgroundColor:'#16161C',
        alignItems:'center'
      },

      container_crear_pedido2: {
        flex:1,
        justifyContent:'space-between',
        flexDirection:'column',
        backgroundColor:'#530B24',
        alignItems:'center',
        height:'20%'
        
      },

      title_menu:{
        marginTop:20,
        alignItems:'center'
      },

      container_menu: {
        flex:5,
        flexDirection:'column',
        alignItems:'center',
        width:'15%',
        marginTop:10,
        marginEnd:10
      },

      title_menu_item: {
        flexDirection:'column',
        alignSelf: 'flex-start',
        color:'white',        
      },

      img_menu: {
        height:40,
        width:40,
        marginTop:5,  
        resizeMode:'contain'        
      },

      list_menu: {        
        alignItems:'center',
        marginBottom:20,
        color: 'white',         
      },

      vista_menu: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        gap:10,
        margin:10,
        paddingTop:0,
        paddingBottom:10,      
        marginBottom:10,        
      },

      button_menu: {
        alignItems:'center',
        justifyContent:'center',        
        width:'auto',
        borderRadius:20,
        height:40
      },

      //Seccion Pedido
      container_ask: {        
        width: '100%',
        height: '100%',         
        backgroundColor:'white'      
      },

      title_ask: {
        fontSize:15,
        color:'#C2C2C2',
        marginLeft:10,       
      },
      img_ask: {
        marginRight:20,
        width:30,
        height:30,                
      },
      container_product: {
        backgroundColor:'#530B24',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,   
        borderBottomColor:'#C2C2C2',
        borderWidth:0.2,            
      },
      view_ask: {
        flex:1,
        backgroundColor:'#16161C',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center', 
        borderBottomColor:'#C2C2C2',
        borderWidth:0.2,   
        paddingVertical:5,
        paddingHorizontal:10,
        
      },

      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',       
      },

      textInput: {
        backgroundColor:'white'
      },

      horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottomColor:'#C2C2C2',
        borderWidth:0.2,
        paddingEnd:10
      },
      containerComment:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#16161C'
      },
      textComment: {
        color: '#c8c8c8',
      },

      orderContainer: {
        flex:1,        
        backgroundColor:'#16161C',
        padding:10,        
        color:'white'
      },

      productContainer: {
        flex:1,
        alignItems:'center',
        padding:10,
        borderColor:'white',
        borderWidth:0.5,
        borderRadius:8,        
        color:'white',
        backgroundColor:'#530B24',        
      },

      img_background: {        
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',        
          gap:20,
          borderRadius: 10,      
          color: 'white',
          fontSize: 24,        
      },
      container_login: {
        flex: 1,
        color: 'white',    
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20, 
        width:'100%'
      },
      input: {
        backgroundColor: '#F2F2F2',
        color: 'black',
        borderRadius: 10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,        
        height:55,
      },
      button_login: {
        backgroundColor:'#530B24',        
      },

      orderContainer: {
        flex: 1,
        padding: 20,
        backgroundColor:'#16161C',
      },

      orderItem: {
        padding: 15,
        backgroundColor:'#C1C1C1',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
      },
      orderText: {
        fontSize: 18,
        marginBottom: 5,
        color:'black'
      },
      productItem: {
        //marginLeft: 20,
        marginTop: 10,
      },
      dot: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,        
    },
});

export default styles;