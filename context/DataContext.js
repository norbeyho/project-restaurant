import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [ order, setOrder ] = useState([]);

    const addProduct = (product) => {
        setOrder((prevOrder) => {
          const existingProduct = prevOrder.find(item => item.productName === product.productName);
          if (existingProduct) {
            return prevOrder.map(item =>
              item.productName === product.productName
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevOrder, { ...product, quantity: 1 }];
        });
      };

      const removeProduct = (productName) => {
        setOrder((prevOrder) => prevOrder.filter(item => item.productName !== productName));
      };
    
    return <DataContext.Provider value={{ order, addProduct, removeProduct }} >{children}</DataContext.Provider>
}

export { DataContext, DataProvider};

