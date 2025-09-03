// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = React.forwardRef(({ p }, ref) => {
    const img = p?.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image";

    return (
        <div
        ref={ref}
        className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-150 hover:shadow-lg hover:scale-105"
        >
        <Link to={`/product/${p._id}`}>
            {/* ảnh fixed height để card gọn */}
            <img src={img} alt={p.name} className="w-full h-32 sm:h-36 object-cover" />
            <div className="p-2 sm:p-3">
            <h3 className="text-sm font-semibold text-black line-clamp-2">
                {p.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 truncate">{p.category || "Đặc sản"}</p>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-black">
                {p.price?.toLocaleString() || "--"} ₫
                </span>
                <span className="text-xs text-gray-500">{p.views ?? 0} 👁</span>
            </div>
            </div>
        </Link>
        </div>
    );
});

export default ProductCard;