import { notification, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserApi } from "../../../utils/api";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
        const res = await getUserApi();
        if (!res?.message) {
            setDataSource(res);
        } else {
            notification.error({
            message: "Unauthorized",
            description: res.message,
            });
        }
        };
        fetchUser();
    }, []);

    const columns = [
        { title: "Id", dataIndex: "_id" },
        { title: "Email", dataIndex: "email" },
        { title: "Name", dataIndex: "name" },
        { title: "Role", dataIndex: "role" },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
        {/* Header cố định */}
        <Header />

        {/* Nội dung chính */}
        <div className="max-w-6xl mx-auto px-6 py-20">
            <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            rowKey={"_id"}
            />
        </div>

        {/* Footer nếu muốn */}
        <Footer />
        </main>
    );
};

export default UserPage;