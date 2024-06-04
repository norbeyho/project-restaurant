import axios from "axios";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { io } from "socket.io-client";

const DataContext = createContext();

const socket = io('http://148.113.142.238:3000')

const DataProvider = ({ children }) => {
    const [currentTable, setCurrentTable] = useState(null);
    const [orders, setOrders] = useState({});
    const [progress, setProgress] = useState('');
    const [tableName, setTableName] = useState('');
    const [pendingOrders, setPendingOrders] = useState([]);
    
    //función para agregar un producto a la orden
    const addProduct = useCallback((product) => {
        setOrders((prevOrders) => {
            const tableOrder = prevOrders[currentTable] || [];
            const existingProduct = tableOrder.find(item => item.productName === product.productName);
            let updatedOrder;

            if (existingProduct) {
                updatedOrder = tableOrder.map(item =>
                    item.productName === product.productName
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedOrder = [...tableOrder, { ...product, quantity: 1 }];
            }

            return { ...prevOrders, [currentTable]: updatedOrder };
        });
    }, [currentTable]);

    //Agregar un comentario a la orden
    const updateComment = (productName, comment) => {
        setOrders((prevOrders) => {
            const tableOrder = prevOrders[currentTable] || [];
            const updatedOrder = tableOrder.map(item =>
                item.productName === productName ? { ...item, comment } : item
            );
            return { ...prevOrders, [currentTable]: updatedOrder };
        });
    };

    //Calcular el total del pedido
    const totalAmount = useMemo(() => {
        const tableOrder = orders[currentTable] || [];
        return tableOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [orders, currentTable]);

    const setTable = (tableId) => {
        setCurrentTable(tableId);
        setTableName(tableId);
    };    

    const addPendingOrder = (order) => {
        setPendingOrders((prevOrders) => [...prevOrders, order]);
        socket.emit('newOrder', order);
    };

    return (
        <DataContext.Provider 
            value={{ 
                orders, 
                addProduct, 
                currentTable, 
                progress, 
                tableName, 
                setOrders, 
                totalAmount, 
                setTable, 
                updateComment, 
                setTableName, 
                addPendingOrder }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };


