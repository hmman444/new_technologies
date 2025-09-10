import React, { createContext, useContext } from "react";
import { useCart } from "./useCart";

const CartContext = createContext<ReturnType<typeof useCart> | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cart = useCart();
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used inside CartProvider");
    }
    return context;
};