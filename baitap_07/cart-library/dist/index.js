var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Card: () => Card,
  CartItem: () => CartItem,
  CartProvider: () => CartProvider,
  Input: () => Input,
  Modal: () => Modal,
  useCart: () => useCart
});
module.exports = __toCommonJS(index_exports);

// src/components/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({ children, onClick, className }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      onClick,
      className: `px-4 py-2 rounded bg-black text-white ${className || ""}`,
      children
    }
  );
};

// src/components/Card.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Card = ({ title, children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      style: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { style: { marginBottom: "8px" }, children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children })
      ]
    }
  );
};

// src/components/Input.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = ({ value, onChange, placeholder, type = "text" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_jsx_runtime4 = require("react/jsx-runtime");
var Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          style: {
            background: "white",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "300px"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { marginTop: "12px" }, children }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { onClick: onClose, style: { marginTop: "12px" }, children: "Close" })
          ]
        }
      )
    }
  );
};

// src/cart/useCart.ts
var import_react = require("react");
function useCart() {
  const [items, setItems] = (0, import_react.useState)([]);
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
var import_react2 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var CartContext = (0, import_react2.createContext)(null);
var CartProvider = ({ children }) => {
  const cart = useCart();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CartContext.Provider, { value: cart, children });
};

// src/cart/CartItem.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var CartItem = ({ item, onRemove, onUpdate }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #ddd" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
      item.name,
      " - $",
      item.price
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "input",
        {
          type: "number",
          value: item.quantity,
          min: 1,
          onChange: (e) => onUpdate(item.id, Number(e.target.value)),
          style: { width: "50px", marginRight: "8px" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { onClick: () => onRemove(item.id), children: "Remove" })
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card,
  CartItem,
  CartProvider,
  Input,
  Modal,
  useCart
});
