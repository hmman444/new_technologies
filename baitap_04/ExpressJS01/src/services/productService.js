const Product = require("../models/Product");

class ProductService {
    static async getProducts({ 
        page = 1,
        limit = 10,
        category = "",
        search = "",
        filter = ""
    }) {
        let query = { isActive: true };
        let sortOption = { createdAt: -1 };

        // 1. Nếu có search thì chỉ tìm theo search, bỏ qua filter khác
        if (search) {
            query.name = { $regex: search, $options: "i" };

            const products = await Product.find(query)
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .sort(sortOption);

            const total = await Product.countDocuments(query);

            return { products, total, page: parseInt(page), limit: parseInt(limit) };
        }

        // 2. Nếu không search thì mới áp dụng filter + category
        if (category) {
            query.category = category;
        }

        switch (filter) {
            case "newest":
                sortOption = { createdAt: -1 };
                limit = 8;
                break;
            case "best":
                sortOption = { stock: -1 }; // (hoặc field sold nếu có)
                limit = 6;
                break;
            case "views":
                sortOption = { views: -1 };
                limit = 8;
                break;
            case "discount":
                query.salePrice = { $gt: 0 };
                limit = 4;
                break;
        }

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort(sortOption);

        const total = await Product.countDocuments(query);

        return { products, total, page: parseInt(page), limit: parseInt(limit) };
    }

    static async getProductDetail(id) {
        const product = await Product.findById(id);
        if (!product || !product.isActive) {
            throw new Error("Product not found");
        }

        product.views += 1;
        await product.save();

        return product;
    }

    static async getCategories() {
        return await Product.distinct("category", { isActive: true });
    }
}

module.exports = ProductService;