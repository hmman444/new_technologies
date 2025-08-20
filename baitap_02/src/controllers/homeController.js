import db from '../models/index';
import CRUDService from '../services/CRUDService';

// Trang chủ
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('crud.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

// Trang About
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

// Form CRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

// Xem tất cả user
let getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', { datalist: data });
}

// Tạo user mới
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post crud to server');
}

// Lấy data để edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/updateUser.ejs', { data: userData });
    } else {
        return res.send('could not get id');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data);
    return res.render('users/findAllUser.ejs', { datalist: data1 });
}

// Delete user
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!');
    } else {
        return res.send('Not find user')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD:getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}
