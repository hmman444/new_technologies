import bcrypt from "bcryptjs";
import db from "../models"; // sequelize index.ts export model
import { User } from "../models/user";

const salt = bcrypt.genSaltSync(10);

// 🔹 Hàm hash password
const hashUserPassword = async (password: string): Promise<string> => {
    try {
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
};

// 🔹 Tạo user mới
const createNewUser = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: string;   // vì lúc nhận từ form thường là "0"/"1"
    roleId: string;
}): Promise<string> => {
    try {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === "1" ? true : false,
            roleId: data.roleId,
        });
        return "✅ Create a new user successful";
    } catch (e) {
        throw e;
    }
};

// 🔹 Lấy tất cả user
const getAllUser = async (): Promise<User[]> => {
    try {
        const users = await db.User.findAll({
            raw: true,
        });
        return users;
    } catch (e) {
        throw e;
    }
};

// 🔹 Lấy user theo id
const getUserInfoById = async (userId: number): Promise<User | {}> => {
    try {
        const user = await db.User.findOne({
            where: { id: userId },
            raw: true,
        });
        if (user) {
            return user;
        } else {
            return {};
        }
    } catch (e) {
        throw e;
    }
};

// 🔹 Cập nhật user
const updateUser = async (data: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
}): Promise<string> => {
    try {
        const user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            return "✅ Update successful";
        } else {
            return "❌ User not found";
        }
    } catch (e) {
        throw e;
    }
};

// 🔹 Xoá user
const deleteUserById = async (userId: number): Promise<string> => {
    try {
        const user = await db.User.findOne({
            where: { id: userId },
        });
        if (user) {
            await user.destroy();
        }
        return "✅ Delete successful";
    } catch (e) {
        throw e;
    }
};

export default {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById
};

