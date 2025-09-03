// HomePage.jsx
import { CrownOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useCallback, useRef, useState } from "react";
import ProductCard from "../../product/components/ProductCard";
import useProducts from "../../product/hooks/useProducts";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [filterCriteria, setFilterCriteria] = useState("");
    const { products, loading, hasMore, loadMore } = useProducts({ search, filter: filterCriteria });

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
            <Result icon={<CrownOutlined />} title="JSON Web Token (React/Node.JS) - iotstar.vn" />

            {/* Search + Filter */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 mt-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border rounded px-4 py-2 shadow-sm focus:ring focus:ring-indigo-200"
            />
            <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="border rounded px-3 py-2"
            >
                <option value="">Tất cả sản phẩm</option>
                <option value="newest">8 sản phẩm mới nhất</option>
                <option value="best">6 sản phẩm bán chạy</option>
                <option value="views">8 sản phẩm xem nhiều</option>
                <option value="discount">4 sản phẩm khuyến mãi</option>
            </select>
            </div>

            {/* Grid sản phẩm */}
            {products.length === 0 && !loading ? (
            <p className="text-center mt-4">Không có sản phẩm nào</p>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((p, idx) => {
                if (products.length === idx + 1) {
                    return <ProductCard key={p._id} p={p} ref={lastProductRef} />;
                }
                return <ProductCard key={p._id} p={p} />;
                })}
            </div>
            )}

            {loading && <p className="text-center mt-4">Đang tải...</p>}
        </div>
        </main>
    );
};

export default HomePage;