import React from "react";
import Footer from "../components/Footer";
import { Result, Input, Select, Spin } from "antd";
import { CrownOutlined } from "@ant-design/icons";

const Home = () => {

    return (
        <main className="min-h-screen bg-gray-50">

        {/* Banner / Header */}
            <Result
            icon={<CrownOutlined />}
            title="JSON Web Token (React/Node.JS) - iotstar.vn"
            />

        <div className="max-w-6xl mx-auto px-6 py-4">

        </div>

        <Footer />
        </main>
    );
};

export default Home;
