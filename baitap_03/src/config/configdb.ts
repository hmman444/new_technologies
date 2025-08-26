import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node_fulltask", "root", "Dcmkok123", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

const connectDB = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connection has been established successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};

export default connectDB;
export { sequelize };
