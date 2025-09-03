const ProductService = require("../services/productService");

exports.getProducts = async (req, res) => {
    try {
        const data = await ProductService.getProducts(req.query);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getProductDetail = async (req, res) => {
    try {
        const product = await ProductService.getProductDetail(req.params.id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};