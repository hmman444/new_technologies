require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Các route public mặc định
    const white_lists = ["/", "/register", "/login"];

    // Lấy path, bỏ /v1/api prefix, bỏ query string
    const path = req.path.replace(/^\/v1\/api/, ""); // chỉ /product, /order, etc.

    // Nếu route public hoặc route product → next
    if (white_lists.includes(path) || (path.startsWith("/product") && req.method === "GET")) {
        return next();
    }

    // Lấy token từ header
    const token = req?.headers?.authorization?.split(' ')?.[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                createdBy: "hoidanit"
            };
            console.log(">>> check token: ", decoded);
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token expired/or invalid" });
        }
    } else {
        return res.status(401).json({
            message: "You have not passed an Access Token in the header/Or the token has expired"
        });
    }
};

module.exports = auth;