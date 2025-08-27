const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

// tất cả route API sẽ đi qua middleware auth
routerAPI.all(/(.*)/, auth);

// test route
routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api");
});

// register
routerAPI.post("/register", createUser);

// login
routerAPI.post("/login", handleLogin);

// lấy thông tin user
routerAPI.get("/user", getUser);

// lấy account (thêm delay giả lập)
routerAPI.get("/account", delay, getAccount);

module.exports = routerAPI;