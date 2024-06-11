import React, { createContext, useCallback, useMemo, useState, useEffect } from "react";
import { io } from "socket.io-client";

const DataContext = createContext();

const socket = io('http://148.113.142.238:3000');

const DataProvider = ({ children }) => {
    const [currentTable, setCurrentTable] = useState(null);    
    const [orders, setOrders] = useState([]);
    const [tableColors, setTableColors] = useState({});
    const [progress, setProgress] = useState('');
    const [tableName, setTableName] = useState('');
    const [pendingOrders, setPendingOrders] = useState([]);
    const [username, setUserName] = useState('');
     
    useEffect(() => {

        socket.on('table_free', (table) => {
          setOrders((prevOrders) => prevOrders.filter(order => order.table !== table));
    
          setTableColors((prevColors) => ({
            ...prevColors,
            [table]: 'green',
          }));
        });

        socket.on('table_busy', ({ table, color }) => {
           setTableColors((prevColors) => ({
            ...prevColors,
            [table]: color,
          }));
        });

        socket.on('newOrder', (orderData) => {
            setPendingOrders((prevOrders) => [...prevOrders, orderData]);
            console.log('Orden context', orderData);
        });
        //Sincronizar los productos agregados a una mesa
        socket.on('update_order', ({ table, order}) => {
            setOrders((prevOrders) => {
              const existingOrderIndex = prevOrders.findIndex(o => o.table === table);
              if (existingOrderIndex !== -1) {
                const updatedOrders = [...prevOrders];
                updatedOrders[existingOrderIndex] = order;
                return updatedOrders;
              } else {
                return [...prevOrders, order];
              }
            });            
        });
        //Cancelar una orden
        socket.on('cancel_order', (tableName) => {
          setPendingOrders((prevOrders) => prevOrders.filter(order => order.table !== tableName));
          console.log('contextcancel', tableName)          
        })
        return () => {
            socket.off('newOrder'); // Desconectar el evento cuando el componente se desmonta
            socket.off('updateOrder');
            socket.off('table_free');
            socket.off('table_busy');
            socket.off('update_order');
            socket.off('cancel_order');
        };
    }, []);

    //función para agregar un producto a la orden
    const addProduct = useCallback((product) => {
        setOrders((prevOrders) => {
          const updatedOrder = prevOrders.map(order => {
            if (order.table === currentTable) {
              const existingProduct = order.items.find(item => item.productName === product.productName);
              if (existingProduct) {
                return {
                  ...order,
                  items: order.items.map(item =>
                    item.productName === product.productName
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  )
                };
              } else {
                return {
                  ...order,
                  items: [...order.items, { ...product, quantity: 1 }]
                };
              }
            }
            return order;
          });
          
          // Si la mesa no tiene órdenes aún, crear una nueva orden
          if (!updatedOrder.some(order => order.table === currentTable)) {
            updatedOrder.push({
              table: currentTable,
              items: [{ ...product, quantity: 1 }]
            });
          }
          socket.emit('update_order', { table: currentTable, order: updatedOrder.find(order => order.table === currentTable )})
          return updatedOrder;
        });

         setTableColors((prevColors) => {
          const newColors = {
            ...prevColors,
            [currentTable]: 'red',
      };

      // Emitir el evento a través de Socket.IO
      socket.emit('use_table', { table: currentTable, color: 'red' });

      return newColors;
    });
        
    }, [currentTable]);
      
    
    //Agregar un comentario a la orden
    const updateComment = (productName, comment) => {
        setOrders((prevOrders) => {
            return prevOrders.map(order => {
                if (order.table === currentTable) {
                    return {
                        ...order,
                        items: order.items.map(item =>
                            item.productName === productName ? { ...item, comment } : item
                        )
                    };
                }
                return order;
            });
        });
    };

    //Calcular el total del pedido
    const totalAmount = useMemo(() => {
        const currentOrder = orders.find(order => order.table === currentTable);
        return currentOrder ? currentOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
    }, [orders, currentTable]);

    const setTable = (tableId) => {
        setCurrentTable(tableId);
        setTableName(tableId);
    };  

    const clearTable = useCallback((table) => {
      setOrders((prevOrders) => prevOrders.filter(order => order.table !== table));
  
      setTableColors((prevColors) => ({
        ...prevColors,
        [table]: 'green',
      }));
      socket.emit('clear_table', table);
      console.log('mesa desocupada', table);
    }, []);

    // Cancelar una orden
    const cancelOrder = (tableName) => {
      setPendingOrders((prevOrders) => prevOrders.filter(order => order.table !== tableName));
      socket.emit('cancel_order', tableName);
      console.log('contextcancel',tableName)
    };
        
    return (
        <DataContext.Provider 
            value={{ 
                orders, addProduct, currentTable, progress, tableName, setOrders, totalAmount, 
                setTable, updateComment, setTableName, setPendingOrders, pendingOrders, username, 
                setUserName, tableColors, clearTable, cancelOrder }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
