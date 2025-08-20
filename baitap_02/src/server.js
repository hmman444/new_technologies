import express from "express"; // nạp express
import bodyParser from "body-parser"; // nạp body-parser để lấy tham số từ client
import viewEngine from "./config/viewEngine.js"; // nạp viewEngine
import initWebRoutes from "./route/web.js"; // nạp file web từ Route
import connectDB from "./config/configdb.js"; // nạp kết nối DB
import dotenv from "dotenv"; // nạp dotenv để đọc file .env

dotenv.config(); // chạy dotenv để dùng biến môi trường (process.env.PORT)

let app = express();

// Cấu hình middleware cho app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine
viewEngine(app);

// Khởi tạo routes
initWebRoutes(app);

// Kết nối database
connectDB();

// Lấy port từ file .env, nếu không có thì mặc định = 6969
let port = process.env.PORT || 6969;

// Chạy server
app.listen(port, () => {
    console.log("✅ Backend Nodejs is running on the port: " + port);
});
