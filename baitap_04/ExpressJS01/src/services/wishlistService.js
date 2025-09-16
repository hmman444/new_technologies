const Wishlist = require("../models/Wishlist");

class WishlistService {
    // Thêm hoặc gỡ sản phẩm khỏi wishlist
    static async toggleWishlist(userId, productId) {
        const exists = await Wishlist.findOne({ userId, productId });

        if (exists) {
        await Wishlist.deleteOne({ _id: exists._id });
        return { liked: false, message: "Removed from wishlist" };
        } else {
        await Wishlist.create({ userId, productId });
        return { liked: true, message: "Added to wishlist" };
        }
    }

    // Lấy danh sách wishlist của user
    static async getWishlist(userId) {
        return await Wishlist.find({ userId }).populate("productId");
    }

    // Kiểm tra 1 sản phẩm có nằm trong wishlist của user không
    static async isInWishlist(userId, productId) {
        const exists = await Wishlist.findOne({ userId, productId });
        return !!exists;
    }
}

module.exports = WishlistService;