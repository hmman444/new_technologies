const ProductService = require("../services/productService");
const WishlistService = require("../services/wishlistService");

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

exports.getCategories = async (req, res) => {
    try {
        const categories = await ProductService.getCategories();
        return res.status(200).json(categories);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id; // lấy từ JWT
        const { productId } = req.body;

        const result = await WishlistService.toggleWishlist(userId, productId);
        return res.status(200).json({ ...result, productId });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await WishlistService.getWishlist(userId);
        return res.status(200).json(wishlist);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};