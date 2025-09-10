import React, { useState } from "react";
import { Button, Card, Input, Modal, useCart } from "cart-library-hmman444";
import type { CartItemType } from "cart-library-hmman444";

const CartDemo: React.FC = () => {
    const { items, addItem, removeItem, updateItem } = useCart();

    const [openModal, setOpenModal] = useState(false);
    const [editingItem, setEditingItem] = useState<CartItemType | null>(null);

    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAdd = () => {
        if (!name || !title) return;
        addItem({
        id: Date.now().toString(),
        name,
        title,
        price,
        quantity,
        });
        setName("");
        setTitle("");
        setPrice(0);
        setQuantity(1);
        setOpenModal(false);
    };

    /** renderForm signature: (values, onChange, onSubmit, submitText) */
    const renderForm = (
        values: {
        name: string;
        title: string;
        price: number;
        quantity: number;
        },
        onChange: (field: keyof typeof values, value: any) => void,
        onSubmit: () => void,
        submitText: string
    ) => (
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            minWidth: "400px",
        }}
        >
        {[
            { label: "Tên sản phẩm", field: "name", type: "text" },
            { label: "Tiêu đề", field: "title", type: "text" },
            { label: "Giá", field: "price", type: "number" },
            { label: "Số lượng", field: "quantity", type: "number" },
        ].map(({ label, field, type }) => (
            <div
            key={field}
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
            <span style={{ fontWeight: 500 }}>{label}</span>
            <Input
                type={type}
                value={values[field as keyof typeof values]}
                onChange={(val) =>
                onChange(
                    field as keyof typeof values,
                    type === "number" ? Number(val) : val
                )
                }
                placeholder={`Nhập ${label.toLowerCase()}`}
            />
            </div>
        ))}

        {/* Button dùng className thay vì style */}
        <Button
            onClick={onSubmit}
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
            {submitText}
        </Button>
        </div>
    );

    return (
        <div style={{ padding: 20 }}>
        <h1>🛒 Demo Cart Library</h1>

        {/* Nút mở modal thêm sản phẩm */}
        <Button onClick={() => setOpenModal(true)}>➕ Thêm sản phẩm mới</Button>

        {/* Modal thêm sản phẩm */}
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Thêm sản phẩm">
            {renderForm(
            { name, title, price, quantity },
            (field, value) => {
                if (field === "name") setName(value);
                if (field === "title") setTitle(value);
                if (field === "price") setPrice(value);
                if (field === "quantity") setQuantity(value);
            },
            handleAdd,
            "✅ Lưu sản phẩm"
            )}
        </Modal>

        {/* Modal sửa sản phẩm */}
        {editingItem && (
            <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)} title="Sửa sản phẩm">
            {renderForm(
                {
                name: editingItem.name,
                title: editingItem.title,
                price: editingItem.price,
                quantity: editingItem.quantity,
                },
                (field, value) =>
                setEditingItem((prev) => (prev ? ({ ...prev, [field]: value } as CartItemType) : prev)),
                () => {
                // cập nhật đầy đủ
                updateItem(editingItem.id, editingItem.quantity, {
                    name: editingItem.name,
                    title: editingItem.title,
                    price: editingItem.price,
                });
                setEditingItem(null);
                },
                "💾 Lưu thay đổi"
            )}
            </Modal>
        )}

        {/* Danh sách sản phẩm */}
        <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
            {items.length === 0 && <p>Chưa có sản phẩm nào</p>}

            {items.map((item: CartItemType) => (
            <Card key={item.id} title={item.name}>
                <h4>{item.title}</h4>
                <p>
                Giá: {item.price}₫ | SL: {item.quantity}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => updateItem(item.id, item.quantity + 1)}>+</Button>
                <Button onClick={() => updateItem(item.id, Math.max(item.quantity - 1, 1))}>-</Button>
                <Button onClick={() => setEditingItem(item)}>✏️ Sửa</Button>
                <Button onClick={() => removeItem(item.id)}>🗑 Xoá</Button>
                </div>
            </Card>
            ))}
        </div>
        </div>
    );
};

export default CartDemo;
