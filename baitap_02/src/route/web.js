import express from "express";             // gọi Express
import homeController from "../controllers/homeController.js"; // gọi controller

let router = express.Router(); // initialize Router

let initWebRoutes = (app) => {
    // Cách 1: định nghĩa trực tiếp
    router.get("/", (req, res) => {
    return res.send("Huynh Minh Man");
    });

    // Cách 2: gọi function trong controller
    router.get("/home", homeController.getHomePage);      // url cho trang chủ
    router.get("/about", homeController.getAboutPage);    // url cho trang about
    router.get("/crud", homeController.getCRUD);          // url get crud

    router.post("/post-crud", homeController.postCRUD);   // url post crud
    router.get("/get-crud", homeController.getFindAllCrud); // url lấy findAll
    router.get("/edit-crud", homeController.getEditCRUD); // url get editcrud
    router.post("/put-crud", homeController.putCRUD);     // url put crud
    router.get("/delete-crud", homeController.deleteCRUD); // url get delete crud

    return app.use("/", router); // default url
};

export default initWebRoutes;
