import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";
import { AuthWrapper } from "./components/context/auth.context"; // 👈 import thêm

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthWrapper>
    </Provider>
  </StrictMode>
);