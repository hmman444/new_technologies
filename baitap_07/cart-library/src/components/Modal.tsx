import React from "react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
        style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "40px"
        }}
        >
        <div
            style={{
            background: "white",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "300px"
            }}
        >
            <h2>{title}</h2>
            <div style={{ marginTop: "12px" }}>{children}</div>
            <button onClick={onClose} style={{ marginTop: "12px" }}>Close</button>
        </div>
        </div>
    );
};