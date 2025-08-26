import { Sequelize } from "sequelize";
import UserModel from "./user"; // import từng model, không dùng fs

import configJson from "../config/config.json";
const env = process.env.NODE_ENV || "development";
const config = (configJson as any)[env];

const db: any = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string | undefined,
    config
);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 🔹 Init model
db.User = UserModel(sequelize);

// 🔹 Init associations (nếu có)
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
