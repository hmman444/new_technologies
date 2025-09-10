import { useState } from "react";

export type CartItem = {
    id: string;
    title: string;
    name: string;
    price: number;
    quantity: number;
};

type UpdatePayload = Partial<Omit<CartItem, "id" | "quantity">>;

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: CartItem) => {
        setItems((prev) => {
        const exists = prev.find((i) => i.id === item.id);
        if (exists) {
            return prev.map((i) =>
            i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
        }
        return [...prev, item];
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    // overload signatures
    function updateItem(id: string, quantity: number): void;
    function updateItem(id: string, quantity: number, updates: UpdatePayload): void;

    function updateItem(id: string, quantity: number, updates?: UpdatePayload) {
        setItems((prev) =>
        prev.map((i) =>
            i.id === id
            ? {
                ...i,
                quantity,
                ...(updates ?? {}),
                }
            : i
        )
        );
    }

    return { items, addItem, removeItem, updateItem };
}