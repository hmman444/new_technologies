// src/features/product/pages/HomePage.jsx
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Result, Input, Select, Spin } from "antd";
import { useCallback, useRef, useState } from "react";
import ProductCard from "../../product/components/ProductCard";
import useProducts from "../../product/hooks/useProducts";
import useCategories from "../../product/hooks/useCategories";
import { CrownOutlined } from "@ant-design/icons";

const { Option } = Select;

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [filterCriteria, setFilterCriteria] = useState("");
    const [category, setCategory] = useState("");

    const { products, loading, hasMore, loadMore } = useProducts({
        search,
        filter: filterCriteria,
        category,
    });
    const { categories } = useCategories();

    // Infinite scroll observer
    const observer = useRef();
    const lastProductRef = useCallback(
        (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
            loadMore();
            }
        });
        if (node) observer.current.observe(node);
        },
        [loading, hasMore, loadMore]
    );

    return (
        <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Banner / Header */}
            <Result
            icon={<CrownOutlined />}
            title="JSON Web Token (React/Node.JS) - iotstar.vn"
            />

            {/* Search + Filter */}
            <div className="bg-white p-6 rounded-xl shadow mb-10 flex flex-col md:flex-row gap-4 md:items-center">
            <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="🔍 Tìm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
            />

            <Select
                size="large"
                value={filterCriteria}
                onChange={(val) => setFilterCriteria(val)}
                className="w-full md:w-48"
                suffixIcon={<FilterOutlined />}
            >
                <Option value="">Tất cả sản phẩm</Option>
                <Option value="newest">Sản phẩm mới</Option>
                <Option value="best">Bán chạy</Option>
                <Option value="views">Xem nhiều</Option>
                <Option value="discount">Khuyến mãi</Option>
            </Select>

            <Select
                size="large"
                value={category}
                onChange={(val) => setCategory(val)}
                className="w-full md:w-48"
            >
                <Option value="">Tất cả danh mục</Option>
                {categories.map((cat) => (
                <Option key={cat} value={cat}>
                    {cat}
                </Option>
                ))}
            </Select>
            </div>

            {/* List sản phẩm */}
            <div className="max-w-6xl mx-auto px-6 py-4">
                <section id="products" className="mt-12">
            <h3 className="text-xl font-bold mb-4">Sản phẩm nổi bật</h3>
            {loading ? (
                <p>Loading...</p>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.map((product, idx) => {
                    if (products.length === idx + 1) {
                    return (
                        <div ref={lastProductRef} key={product._id}>
                        <ProductCard product={product} />
                        </div>
                    );
                    } else {
                    return <ProductCard key={product._id} product={product} />;
                    }
                })}
                </div>
            ) : (
                <p className="text-gray-500">Không có sản phẩm nào</p>
            )}
            </section>

            {loading && (
            <div className="flex justify-center mt-6">
                <Spin />
                <span className="ml-2 text-gray-500">Đang tải sản phẩm...</span>
            </div>
            )}
            </div>
        </div>
        </main>
    );
};

export default HomePage;