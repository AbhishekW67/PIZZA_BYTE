"use client";
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(prevItem => prevItem.id === item.id);
            if (existingItem) {
                // Increase the quantity if the item already exists
                return prevItems.map(prevItem =>
                    prevItem.id === item.id
                        ? { ...prevItem, quantity: prevItem.quantity + 1 }
                        : prevItem
                );
            }
            // Add the new item with a quantity of 1
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeItemFromCart = (itemToRemove) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(prevItem => prevItem.id === itemToRemove.id);
            if (existingItem.quantity > 1) {
                // Decrease the quantity if more than 1
                return prevItems.map(prevItem =>
                    prevItem.id === itemToRemove.id
                        ? { ...prevItem, quantity: prevItem.quantity - 1 }
                        : prevItem
                );
            }
            // Remove the item if the quantity reaches 0
            return prevItems.filter(prevItem => prevItem.id !== itemToRemove.id);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
