import express, { Express } from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/configdb";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
viewEngine(app);

// Routes
initWebRoutes(app);

// DB
connectDB();

// PORT
const port: number = Number(process.env.PORT) || 6969;

// Start server
app.listen(port, () => {
    console.log(`✅ Backend Nodejs is running on the port: ${port}`);
});
