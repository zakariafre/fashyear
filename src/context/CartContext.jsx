import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();






export const CartProvider = ({ children }) => {


    
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, selectedSize) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.id === product.id && item.selectedSize === selectedSize
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, { ...product, selectedSize, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId, selectedSize) => {
        setCartItems(prevItems => 
            prevItems.filter(item => !(item.id === productId && item.selectedSize === selectedSize))
        );
    };

    const updateQuantity = (productId, selectedSize, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId, selectedSize);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId && item.selectedSize === selectedSize
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext; 