const Product = require("../models/Product");

class ProductService {
    static async getProducts({ page = 1, limit = 10, category = "", search = "" }) {
        const query = {
            isActive: true,
            name: { $regex: search, $options: "i" }
        };

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

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
}

module.exports = ProductService;