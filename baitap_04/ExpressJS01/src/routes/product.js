const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// GET /v1/api/products?page=1&limit=10&category=abc
router.get("/", productController.getProducts);

// GET /v1/api/products/:id
router.get("/:id", productController.getProductDetail);

router.get("/categories/all", productController.getCategories);

module.exports = router;
