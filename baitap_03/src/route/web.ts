import express, { Request, Response, Application } from "express";
import homeController from "../controllers/homeController";

const router = express.Router(); // initialize Router

const initWebRoutes = (app: Application): Application => {
    // Cách 1: định nghĩa trực tiếp
    router.get("/", (req: Request, res: Response) => {
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

    app.use("/", router); // default url
    return app;
};

export default initWebRoutes;
