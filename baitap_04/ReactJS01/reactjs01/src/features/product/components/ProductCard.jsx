import React from "react";
import { Link } from "react-router-dom";

const ProductCard = React.forwardRef(({ p }, ref) => {
    const img =
        p?.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image";

    return (
        <div
        ref={ref}
        className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-transform transform hover:scale-105 max-w-[200px] mx-auto"
        >
        <Link to={`/product/${p._id}`} className="flex flex-col h-full">
            {/* Ảnh - vuông cho đồng đều */}
            <div className="w-full aspect-square overflow-hidden">
            <img
                src={img}
                alt={p.name}
                className="w-full h-full object-cover"
            />
            </div>

            {/* Nội dung */}
            <div className="flex-1 flex flex-col p-2">
            <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1">
                {p.name}
            </h3>
            <p className="text-[11px] text-gray-500 truncate">
                {p.category || "Đặc sản"}
            </p>
            <div className="mt-auto flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-black">
                {p.price?.toLocaleString() || "--"} ₫
                </span>
                <span className="text-[11px] text-gray-500">{p.views ?? 0} 👁</span>
            </div>
            </div>
        </Link>
        </div>
    );
});

export default ProductCard;