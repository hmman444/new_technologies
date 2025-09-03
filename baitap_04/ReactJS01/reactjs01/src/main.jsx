import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";

import RegisterPage from '../src/features/auth/pages/registerPage.jsx';
import UserPage from '../src/features/auth/pages/userPage.jsx';
import HomePage from '../src/features/auth/pages/homePage.jsx';
import LoginPage from '../src/features/auth/pages/loginPage.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "user", element: <UserPage /> },
        ],
    },
    { path: "register", element: <RegisterPage /> },
    { path: "login", element: <LoginPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthWrapper>
                <RouterProvider router={router} />
            </AuthWrapper>
        </Provider>
    </React.StrictMode>
);