import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};
declare const Button: React.FC<ButtonProps>;

type CardProps = {
    title: string;
    children?: React.ReactNode;
};
declare const Card: React.FC<CardProps>;

type InputProps = {
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
};
declare const Input: React.FC<InputProps>;

type ModalProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};
declare const Modal: React.FC<ModalProps>;

type CartItem$1 = {
    id: string;
    title: string;
    name: string;
    price: number;
    quantity: number;
};
type UpdatePayload = Partial<Omit<CartItem$1, "id" | "quantity">>;
declare function useCart(): {
    items: CartItem$1[];
    addItem: (item: CartItem$1) => void;
    removeItem: (id: string) => void;
    updateItem: {
        (id: string, quantity: number): void;
        (id: string, quantity: number, updates: UpdatePayload): void;
    };
};

declare const CartProvider: React.FC<{
    children: React.ReactNode;
}>;

type Props = {
    item: CartItem$1;
    onRemove: (id: string) => void;
    onUpdate: (id: string, quantity: number) => void;
};
declare const CartItem: React.FC<Props>;

export { Button, Card, CartItem, type CartItem$1 as CartItemType, CartProvider, Input, Modal, useCart };
