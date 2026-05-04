import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addItem = useCallback((product) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((id) => {
        setItems(prev => prev.filter(i => i.id !== id));
    }, []);

    const updateQty = useCallback((id, delta) => {
        setItems(prev => prev
            .map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
            .filter(i => i.qty > 0)
        );
    }, []);

    const totalCount = items.reduce((acc, i) => acc + i.qty, 0);
    const totalAmount = items.reduce((acc, i) => acc + i.precio * i.qty, 0);

    return (
        <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQty, totalCount, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be inside CartProvider');
    return ctx;
};
