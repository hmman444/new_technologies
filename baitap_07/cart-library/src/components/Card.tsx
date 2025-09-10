import React from "react";

type CardProps = {
    title: string;
    children?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div
        style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
        }}
        >
        <h3 style={{ marginBottom: "8px" }}>{title}</h3>
        <div>{children}</div>
        </div>
    );
};