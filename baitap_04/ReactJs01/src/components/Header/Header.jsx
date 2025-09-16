import React, { useContext, useState } from "react";
import { UsergroupAddOutlined, HomeOutlined, SettingOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [current, setCurrent] = useState("home");

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/products">Products</Link>,
      key: "products",
      icon: <AppstoreOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to="/user">Users</Link>,
            key: "user",
            icon: <UsergroupAddOutlined />,
          },
        ]
      : []),
    {
      label: `Welcome ${auth?.user?.email ?? ""}`,
      key: "submenu",
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      setAuth({
                        isAuthenticated: false,
                        user: { email: "", name: "" },
                      });
                      navigate("/");
                    }}
                  >
                    Logout
                  </span>
                ),
                key: "logout",
              },
            ]
          : [
              {
                label: <Link to="/login">Login</Link>,
                key: "login",
              },
              {
                label: <Link to="/register">Register</Link>,
                key: "register",
              },
            ]),
      ],
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
