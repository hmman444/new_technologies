var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/components/Button.tsx
import { jsx } from "react/jsx-runtime";
var Button = ({ children, onClick, className }) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: `px-4 py-2 rounded bg-black text-white ${className || ""}`,
      children
    }
  );
};

// src/components/Card.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Card = ({ title, children }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px"
      },
      children: [
        /* @__PURE__ */ jsx2("h3", { style: { marginBottom: "8px" }, children: title }),
        /* @__PURE__ */ jsx2("div", { children })
      ]
    }
  );
};

// src/components/Input.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var Input = ({ value, onChange, placeholder, type = "text" }) => {
  return /* @__PURE__ */ jsx3(
    "input",
    {
      type,
      value,
      placeholder,
      onChange: (e) => onChange(e.target.value),
      style: {
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        marginRight: "8px"
      }
    }
  );
};

// src/components/Modal.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx4(
    "div",
    {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px"
      },
      children: /* @__PURE__ */ jsxs2(
        "div",
        {
          style: {
            background: "white",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "300px"
          },
          children: [
            /* @__PURE__ */ jsx4("h2", { children: title }),
            /* @__PURE__ */ jsx4("div", { style: { marginTop: "12px" }, children }),
            /* @__PURE__ */ jsx4("button", { onClick: onClose, style: { marginTop: "12px" }, children: "Close" })
          ]
        }
      )
    }
  );
};

// src/cart/useCart.ts
import { useState } from "react";
function useCart() {
  const [items, setItems] = useState([]);
  const addItem = (item) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map(
          (i) => i.id === item.id ? __spreadProps(__spreadValues({}, i), { quantity: i.quantity + item.quantity }) : i
        );
      }
      return [...prev, item];
    });
  };
  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };
  function updateItem(id, quantity, updates) {
    setItems(
      (prev) => prev.map(
        (i) => i.id === id ? __spreadValues(__spreadProps(__spreadValues({}, i), {
          quantity
        }), updates != null ? updates : {}) : i
      )
    );
  }
  return { items, addItem, removeItem, updateItem };
}

// src/cart/CartProvider.tsx
import { createContext, useContext } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var CartContext = createContext(null);
var CartProvider = ({ children }) => {
  const cart = useCart();
  return /* @__PURE__ */ jsx5(CartContext.Provider, { value: cart, children });
};

// src/cart/CartItem.tsx
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var CartItem = ({ item, onRemove, onUpdate }) => {
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #ddd" }, children: [
    /* @__PURE__ */ jsxs3("span", { children: [
      item.name,
      " - $",
      item.price
    ] }),
    /* @__PURE__ */ jsxs3("div", { children: [
      /* @__PURE__ */ jsx6(
        "input",
        {
          type: "number",
          value: item.quantity,
          min: 1,
          onChange: (e) => onUpdate(item.id, Number(e.target.value)),
          style: { width: "50px", marginRight: "8px" }
        }
      ),
      /* @__PURE__ */ jsx6("button", { onClick: () => onRemove(item.id), children: "Remove" })
    ] })
  ] });
};
export {
  Button,
  Card,
  CartItem,
  CartProvider,
  Input,
  Modal,
  useCart
};
