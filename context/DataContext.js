import axios from "axios";
import React, { createContext, useCallback, useMemo, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [currentTable, setCurrentTable] = useState(null);
    const [orders, setOrders] = useState({});
    const [progress, setProgress] = useState('');
    const [tableName, setTableName] = useState('');
    
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

    const updateComment = (productName, comment) => {
        setOrders((prevOrders) => {
            const tableOrder = prevOrders[currentTable] || [];
            const updatedOrder = tableOrder.map(item =>
                item.productName === productName ? { ...item, comment } : item
            );
            return { ...prevOrders, [currentTable]: updatedOrder };
        });
    };

    const totalAmount = useMemo(() => {
        const tableOrder = orders[currentTable] || [];
        return tableOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [orders, currentTable]);

    const setTable = (tableId) => {
        setCurrentTable(tableId);
        setTableName(tableId);
    };
    
    const searchOrder = async () => {
        try {
            const response = await axios.get(`http://148.113.142.238:3000/api/find-order?tableName=${tableName}&progress=${progress}`);
            const ordersData = response.data;
            
            const showOrder = ordersData.reduce((acc, order) => {
                const showProducts = order.items.map(item => ({
                    productName: item.product,
                    quantity: item.quantity,
                    comment: item.comment,
                    price: item.price
                }));
                acc[order.tableName] = showProducts;
                return acc;
            }, {})
            setOrders(prevOrders =>({...prevOrders, ...showOrder }));
        } catch (error) {
            console.error("Error al buscar orden:", error);
        }
    };

    return (
        <DataContext.Provider value={{ orders, addProduct, currentTable, progress, tableName, setOrders, totalAmount, setTable, updateComment, searchOrder, setTableName }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };


