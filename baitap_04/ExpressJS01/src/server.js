require('dotenv').config();

// import các thư viện
const express = require('express');
const cors = require('cors');

// import các file config & controller
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const apiRoutes = require('./routes/api');
const { getHomepage } = require('./controllers/homeController');
const productRoutes = require("./routes/product");

const app = express(); // khởi tạo app express

// cấu hình port (ưu tiên lấy từ .env, nếu không có thì dùng 8888)
const port = process.env.PORT || 8888;

// middleware
app.use(cors()); // bật cors
app.use(express.json()); // cho phép nhận req.body dạng json
app.use(express.urlencoded({ extended: true })); // cho phép nhận form data

// cấu hình template engine + static files
configViewEngine(app);

// route cho ejs view
const webAPI = express.Router();
webAPI.get("/", getHomepage);
app.use('/', webAPI);

// route cho API (RESTful)
app.use('/v1/api', apiRoutes);

// route cho product API (RESTful)
app.use("/v1/api/product", productRoutes);

// kết nối DB & start server
(async () => {
    try {
        await connection();
        app.listen(port, () => {
        console.log(`Backend Nodejs App listening on port ${port}`);
        });
    } catch (error) {
        console.log(">>> Error connect to DB: ", error);
    }
})();