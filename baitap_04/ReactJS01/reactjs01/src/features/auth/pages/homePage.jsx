// HomePage.jsx
import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useCallback, useRef, useState } from "react";
import ProductCard from "../../product/components/ProductCard";
import useProducts from "../../product/hooks/useProducts";
import useCategories from "../../product/hooks/useCategories";

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            {/* Result thông báo */}
            <Result
            icon={<CrownOutlined />}
            title="JSON Web Token (React/Node.JS) - iotstar.vn"
            />

            {/* Search + Filter + Category */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 mt-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Search */}
            <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border rounded px-4 py-2 shadow-sm focus:ring focus:ring-indigo-200"
            />

            {/* Filter */}
            <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="border rounded px-3 py-2"
            >
                <option value="">Tất cả sản phẩm</option>
                <option value="newest">Sản phẩm mới</option>
                <option value="best">Sản phẩm bán chạy</option>
                <option value="views">Xem nhiều</option>
                <option value="discount">Sản phẩm khuyến mãi</option>
            </select>

            {/* Category */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-3 py-2"
            >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
                ))}
            </select>
            </div>

            {/* Grid sản phẩm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((p, idx) => {
                if (products.length === idx + 1) {
                return <ProductCard key={p._id} p={p} ref={lastProductRef} />;
                }
                return <ProductCard key={p._id} p={p} />;
            })}
            </div>

            {loading && <p className="text-center mt-4">Đang tải...</p>}
        </div>
        </main>
    );
};

export default HomePage;