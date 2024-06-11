import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, CheckBox, ScrollView } from "react-native";
import io from 'socket.io-client';
import { DataContext } from "../context/DataContext";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

   const { username, setUserName } = useContext(DataContext);

  useEffect(()=> {
    setUserName(username);
  },[username, setUserName]);

  useEffect(() => {
    const socket = io('http://148.113.142.238:3000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Escucha el evento 'new-order' para nuevos pedidos
    socket.on('new-order', (newOrder) => {
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setOrderStatus(prevStatus => [...prevStatus, "new"]);
    });

    // Desconectar el socket cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsAllChecked(checkboxStates.every(state => state === true));
  }, [checkboxStates]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://148.113.142.238:3000/api/orders');
      const data = await response.json();
      // Filtrar solo las órdenes pendientes
      const pendingOrders = data.filter(order => order.progress === "Pendiente");
      setOrders(pendingOrders);
      setOrderStatus(pendingOrders.map(() => "new"));
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderSelection = (order, index) => {
    setSelectedOrder(order);
    setModalVisible(true);
    setCheckboxStates(Array(order.items.length).fill(false));
    setOrderStatus(prevState => {
      const newState = [...prevState];
      newState[index] = "pending-cooking";
      return newState;
    });
  };

  const handleCheckBoxChange = (index) => {
    setCheckboxStates(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSend = async () => {
    setModalVisible(false);
    // Obtener el ID de la orden seleccionada
    const orderId = selectedOrder._id;
    // Actualizar el estado de la orden en el backend
    try {
      const response = await fetch(`http://148.113.142.238:3000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progress: 'Pendiente por Facturar' })
      });
      if (response.ok) {
        // Eliminar el pedido del estado después de enviarlo
        const index = orders.indexOf(selectedOrder);
        setOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
      } else {
        console.error('Error al actualizar el estado de la orden');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color:'white',margin:8}}>Usuario: {username}</Text>      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardsContainer}>
          {orders.map((order, index) => (
            <TouchableOpacity
              key={order._id}
              onPress={() => handleOrderSelection(order, index)}
              style={[styles.card, { backgroundColor: orderStatus[index] === "pending-cooking" ? "#ffd966" : orderStatus[index] === "new" ? "#45818e" : "#93c47d" }]}
            >
              <Text style={styles.headerText}>Mesa: {order.tableName}</Text>
              <View style={styles.content}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={order.items}
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text style={styles.itemText}>{item.product} x {item.quantity}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                />
              </View>
              <Text style={styles.footerText}>Atiende: {order.username}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <Text style={styles.modalHeaderText}>Mesa: {selectedOrder.tableName}</Text>
                <Text style={styles.modalHeaderText}>Atiende: {selectedOrder.username}</Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={selectedOrder.items}
                  renderItem={({ item, index }) => (
                    <View style={styles.item}>
                      <CheckBox
                        style={styles.CheckBox}
                        value={checkboxStates[index]}
                        onValueChange={() => handleCheckBoxChange(index)}
                      />
                      <View>
                        <Text style={styles.modalItemText}>{item.product} x {item.quantity}</Text>
                        <Text style={styles.modalCommentText}>Comentario: {item.comment}</Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.footerButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: isAllChecked ? '#93c47d' : '#cccccc' }]}
                    onPress={() => handleSend()}
                    disabled={!isAllChecked}
                  >
                    <Text style={styles.actionButtonText}>ENVIAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleCloseModal()}
                  >
                    <Text style={styles.actionButtonText}>CERRAR</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollViewContent: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 8,
    padding: 20,
    width: '100%',
    margin: 10,
    height: 300,
    overflow: 'hidden',
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  content: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 20,
    width: '70%',
    height: '70%',
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItemText: {
    fontSize: 18,
    marginLeft: 15,
  },
  CheckBox: {
    marginTop: 8,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#45818e',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footerText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: 'flex-end',
  },
  modalCommentText: {
    marginLeft: 15,
    fontSize: 16,
    marginTop: 8,
    color: '#777777',
  },
});

export default PendingOrders;
