import { Request, Response } from "express";
import db from "../models/index";
import CRUDService from "../services/CRUDService";

// Trang chủ
const getHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await db.User.findAll();
        console.log(data);
        res.render("crud.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

// Trang About
const getAboutPage = (req: Request, res: Response): void => {
    res.render("test/about.ejs");
};

// Form CRUD
const getCRUD = (req: Request, res: Response): void => {
    res.render("crud.ejs");
};

// Xem tất cả user
const getFindAllCrud = async (req: Request, res: Response): Promise<void> => {
    const data = await CRUDService.getAllUser();
    res.render("users/findAllUser.ejs", { datalist: data });
};

// Tạo user mới
const postCRUD = async (req: Request, res: Response): Promise<void> => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    res.send("Post crud to server");
};

// Lấy data để edit
const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.query.id);
    if (userId) {
        const userData = await CRUDService.getUserInfoById(userId);
        res.render("users/updateUser.ejs", { data: userData });
    } else {
        res.send("could not get id");
    }
};

const putCRUD = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const data1 = await CRUDService.updateUser(data);
    res.render("users/findAllUser.ejs", { datalist: data1 });
};

// Delete user
const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.query.id);
    if (id) {
        await CRUDService.deleteUserById(id);
        res.send("Deleted!!!!!!!!!!!!");
    } else {
        res.send("Not find user");
    }
};

export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};

