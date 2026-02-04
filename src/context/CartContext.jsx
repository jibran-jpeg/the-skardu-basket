import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        // Persist cart in local storage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, totalItems, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
