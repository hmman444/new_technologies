import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
    return (
        <button
        onClick={onClick}
        className={`px-4 py-2 rounded bg-black text-white ${className || ""}`}
        >
        {children}
        </button>
    );
};