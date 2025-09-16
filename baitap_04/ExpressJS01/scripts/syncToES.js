const mongoose = require("mongoose");
const { esClient } = require("../src/config/elasticsearch");
const Product = require("../src/models/Product");

(async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/fullstack02");

        const products = await Product.find({});
        console.log(`Found ${products.length} products`);

        for (const product of products) {
            await esClient.index({
                index: "products",
                id: product._id.toString(),
                document: {
                name: product.name,
                description: product.description,
                price: product.price,
                salePrice: product.salePrice,
                stock: product.stock,
                category: product.category,
                images: product.images,
                views: product.views,
                isActive: product.isActive
                }
            });
        }

        await esClient.indices.refresh({ index: "products" });
        console.log("✅ Synced products to Elasticsearch");
        process.exit(0);
    } catch (err) {
        console.error("❌ Sync error:", err);
        process.exit(1);
    }
})();