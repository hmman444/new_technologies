import React from "react";

type InputProps = {
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = "text" }) => {
    return (
        <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginRight: "8px",
        }}
        />
    );
};