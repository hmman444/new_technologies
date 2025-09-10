import React from "react";
import { CartItem as Item } from "./useCart";

type Props = {
    item: Item;
    onRemove: (id: string) => void;
    onUpdate: (id: string, quantity: number) => void;
};

export const CartItem: React.FC<Props> = ({ item, onRemove, onUpdate }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #ddd" }}>
        <span>
            {item.name} - ${item.price}
        </span>
        <div>
            <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) => onUpdate(item.id, Number(e.target.value))}
            style={{ width: "50px", marginRight: "8px" }}
            />
            <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
        </div>
    );
};