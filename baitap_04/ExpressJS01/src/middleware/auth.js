require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = ["/", "/register", "/login"];

    // nếu route nằm trong white list → next
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        return next();
    } else {
        const token = req?.headers?.authorization?.split(' ')?.[1];

        if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
            email: decoded.email,
            name: decoded.name,
            createdBy: "hoidanit"
            };
            console.log(">>> check token: ", decoded);
            next();
        } catch (error) {
            return res.status(401).json({
            message: "Token expired/or invalid"
            });
        }
        } else {
        return res.status(401).json({
            message: "You have not passed an Access Token in the header/Or the token has expired"
        });
        }
    }
};

module.exports = auth;