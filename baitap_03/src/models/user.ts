import { Model, DataTypes, Sequelize, Optional } from "sequelize";

// 1. Định nghĩa kiểu dữ liệu cho User
interface UserAttributes {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: boolean;
    image: string;
    roleId: string;
    positionId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// 2. Cho phép id, createdAt, updatedAt optional khi tạo user mới
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

// 3. Định nghĩa Model User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public address!: string;
    public phoneNumber!: string;
    public gender!: boolean;
    public image!: string;
    public roleId!: string;
    public positionId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        // ví dụ: User.hasMany(models.Post);
    }
}

// 4. Hàm init model
const initUserModel = (sequelize: Sequelize) => {
    User.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            firstName: { type: DataTypes.STRING },
            lastName: { type: DataTypes.STRING },
            address: { type: DataTypes.STRING },
            phoneNumber: { type: DataTypes.STRING },
            gender: { type: DataTypes.BOOLEAN },
            image: { type: DataTypes.STRING },
            roleId: { type: DataTypes.STRING },
            positionId: { type: DataTypes.STRING },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
        }
    );
    return User;
};

// ✅ Export default để init
export default initUserModel;

// ✅ Export riêng để dùng type trong service/controller
export { User };
