const express = require("express");
const productController = require("../controllers/productController");
const { toggleWishlist, getWishlist } = require("../controllers/productController");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /v1/api/products?page=1&limit=10&category=abc
router.get("/", productController.getProducts);

// GET /v1/api/products/:id
router.get("/:id", productController.getProductDetail);

router.get("/categories/all", productController.getCategories);

router.post("/wishlist/toggle", auth, toggleWishlist);
router.get("/wishlist", auth, getWishlist);

module.exports = router;
